package com.edutrack.auth.service;

import com.edutrack.auth.dto.*;
import com.edutrack.auth.model.Role;
import com.edutrack.auth.model.User;
import com.edutrack.auth.repository.UserRepository;
import com.edutrack.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository     userRepository;
    private final PasswordEncoder    passwordEncoder;
    private final JwtService         jwtService;
    private final AuthenticationManager authManager;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        var user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        return buildAuthResponse(user, jwtService.generateToken(user));
    }

    public AuthResponse login(LoginRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        var user = userRepository.findByEmail(req.getEmail()).orElseThrow();
        return buildAuthResponse(user, jwtService.generateToken(user));
    }

    public UserResponse getMe(String email) {
        return toUserResponse(userRepository.findByEmail(email).orElseThrow());
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(this::toUserResponse).toList();
    }

    private AuthResponse buildAuthResponse(User user, String token) {
        return AuthResponse.builder()
                .token(token).type("Bearer")
                .id(user.getId()).name(user.getName())
                .email(user.getEmail()).role(user.getRole().name())
                .build();
    }

    private UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId()).name(user.getName())
                .email(user.getEmail()).role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .build();
    }
}