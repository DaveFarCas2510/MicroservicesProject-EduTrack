package com.edutrack.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns(
                        "https://microservices-project-edu-track.vercel.app",
                        "https://*.vercel.app",
                        "https://microservicesproject-edutrack-2.onrender.com",
                        "https://*.onrender.com",
                        "http://localhost:3000",
                        "http://localhost:5173"
                )
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
