package com.edutrack.gateway.filter;

import com.edutrack.gateway.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthFilter implements GlobalFilter, Ordered {

    private final JwtService jwtService;

    // Rutas que no requieren token obligatorio
    private static final List<String> PUBLIC_PATHS = List.of(
            "/api/auth/register",
            "/api/auth/login",
            "/api/courses",
            "/api/categories",
            "/api/lessons"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path       = exchange.getRequest().getURI().getPath();
        String method     = exchange.getRequest().getMethod().name();
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        boolean isPreFlight = "OPTIONS".equalsIgnoreCase(method);
        boolean isPublic    = isPublicPath(path);
        boolean hasToken    = authHeader != null && authHeader.startsWith("Bearer ");

        // CORS preflight → dejar pasar sin validar
        if (isPreFlight) {
            return chain.filter(exchange);
        }

        // Si no es pública y no tiene token → rechazar
        if (!isPublic && !hasToken) {
            log.warn("Request sin token en ruta protegida: {}", path);
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // Si tiene token → validar y propagar headers
        if (hasToken) {
            String token = authHeader.substring(7);

            if (!jwtService.isTokenValid(token)) {
                log.warn("Token inválido para: {}", path);
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String username = jwtService.extractUsername(token);
            String role     = jwtService.extractRole(token);
            String userId   = jwtService.extractUserId(token);

            ServerWebExchange mutatedExchange = exchange.mutate()
                    .request(exchange.getRequest().mutate()
                            .header("X-User-Email", username != null ? username : "")
                            .header("X-User-Role",  role     != null ? role     : "")
                            .header("X-User-Id",    userId   != null ? userId   : "")
                            .build())
                    .build();

            return chain.filter(mutatedExchange);
        }

        // Ruta pública sin token → dejar pasar sin headers
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() { return -1; }

    private boolean isPublicPath(String path) {
        return PUBLIC_PATHS.stream().anyMatch(path::startsWith);
    }
}