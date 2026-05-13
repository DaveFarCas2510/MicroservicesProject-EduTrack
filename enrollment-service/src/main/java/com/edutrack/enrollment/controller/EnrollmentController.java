package com.edutrack.enrollment.controller;

import com.edutrack.enrollment.dto.*;
import com.edutrack.enrollment.service.EnrollmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
@Tag(name = "Enrollments", description = "Inscripciones y progreso")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    @Operation(summary = "Inscribirse a un curso")
    public ResponseEntity<EnrollmentResponse> enroll(
            @Valid @RequestBody EnrollmentRequest req,
            @RequestHeader("X-User-Email") String email,
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(enrollmentService.enroll(userId, req));
    }

    @GetMapping("/my")
    @Operation(summary = "Mis cursos inscritos")
    public ResponseEntity<List<EnrollmentResponse>> getMyEnrollments(
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(enrollmentService.getMyEnrollments(userId));
    }

    @PostMapping("/progress")
    @Operation(summary = "Marcar lección como completada")
    public ResponseEntity<ProgressResponse> markCompleted(
            @Valid @RequestBody ProgressRequest req,
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(enrollmentService.markLessonCompleted(userId, req));
    }

    @GetMapping("/progress/{courseId}")
    @Operation(summary = "Progreso en un curso")
    public ResponseEntity<CourseProgressResponse> getCourseProgress(
            @PathVariable Long courseId,
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(enrollmentService.getCourseProgress(userId, courseId));
    }

    @GetMapping("/course/{courseId}")
    @Operation(summary = "Estudiantes de un curso — solo ADMIN")
    public ResponseEntity<List<EnrollmentResponse>> getByCourse(
            @PathVariable Long courseId,
            @RequestHeader("X-User-Role") String role) {
        if (!"ROLE_ADMIN".equals(role)) {
            throw new SecurityException("Acceso denegado — se requiere ADMIN");
        }
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByCourse(courseId));
    }
}