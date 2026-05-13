package com.edutrack.auth.service;

import com.edutrack.auth.dto.AuthResponse;
import com.edutrack.auth.dto.LoginRequest;
import com.edutrack.auth.dto.RegisterRequest;
import com.edutrack.auth.dto.UserResponse;
import com.edutrack.auth.model.Role;
import com.edutrack.auth.model.User;
import com.edutrack.auth.repository.UserRepository;
import com.edutrack.auth.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtService jwtService;
    @Mock private AuthenticationManager authManager;

    private AuthService authService;

    private User testUser;

    @BeforeEach
    void setUp() {
        authService = new AuthService(userRepository, passwordEncoder, jwtService, authManager);
        testUser = User.builder()
                .id(1L)
                .name("Test User")
                .email("test@example.com")
                .password("encoded-password")
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    void register_createsUserAndReturnsToken() {
        RegisterRequest req = new RegisterRequest();
        req.setName("Test User");
        req.setEmail("test@example.com");
        req.setPassword("password123");

        when(userRepository.existsByEmail(req.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(req.getPassword())).thenReturn("encoded-password");
        when(userRepository.save(any())).thenReturn(testUser);
        when(jwtService.generateToken(any())).thenReturn("jwt-token");

        AuthResponse res = authService.register(req);

        assertThat(res.getToken()).isEqualTo("jwt-token");
        assertThat(res.getEmail()).isEqualTo("test@example.com");
        assertThat(res.getRole()).isEqualTo("USER");
        verify(userRepository).save(any());
    }

    @Test
    void register_throwsWhenEmailAlreadyExists() {
        RegisterRequest req = new RegisterRequest();
        req.setEmail("existing@example.com");

        when(userRepository.existsByEmail(req.getEmail())).thenReturn(true);

        assertThatThrownBy(() -> authService.register(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("email ya está registrado");
        verify(userRepository, never()).save(any());
    }

    @Test
    void login_authenticatesAndReturnsToken() {
        LoginRequest req = new LoginRequest();
        req.setEmail("test@example.com");
        req.setPassword("password123");

        when(userRepository.findByEmail(req.getEmail())).thenReturn(Optional.of(testUser));
        when(jwtService.generateToken(testUser)).thenReturn("jwt-token");

        AuthResponse res = authService.login(req);

        assertThat(res.getToken()).isEqualTo("jwt-token");
        verify(authManager).authenticate(any());
    }

    @Test
    void getMe_returnsUserByEmail() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        UserResponse res = authService.getMe("test@example.com");

        assertThat(res.getEmail()).isEqualTo("test@example.com");
        assertThat(res.getName()).isEqualTo("Test User");
    }

    @Test
    void getAllUsers_returnsAllUsers() {
        User user2 = User.builder().id(2L).name("User 2").email("user2@test.com")
                .role(Role.ADMIN).createdAt(LocalDateTime.now()).build();

        when(userRepository.findAll()).thenReturn(List.of(testUser, user2));

        List<UserResponse> users = authService.getAllUsers();

        assertThat(users).hasSize(2);
        assertThat(users).extracting(UserResponse::getEmail)
                .containsExactly("test@example.com", "user2@test.com");
    }
}
