package com.edutrack.course.controller;

import com.edutrack.course.dto.*;
import com.edutrack.course.service.CourseService;
import com.edutrack.course.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@Tag(name = "Courses", description = "Gestión de cursos")
public class CourseController {

    private final CourseService courseService;
    private final S3Service s3Service;

    @GetMapping
    @Operation(summary = "Listar cursos paginados, filtros opcionales por categoría y búsqueda")
    public ResponseEntity<Page<CourseSummaryResponse>> getAll(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(courseService.getAllCourses(categoryId, search, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Detalle de curso con lecciones")
    public ResponseEntity<CourseResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PostMapping
    @Operation(summary = "Crear curso — solo ADMIN")
    public ResponseEntity<CourseResponse> create(
            @Valid @RequestBody CourseRequest req,
            @RequestHeader("X-User-Role") String role) {
        validateAdmin(role);
        return ResponseEntity.ok(courseService.createCourse(req));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar curso — solo ADMIN")
    public ResponseEntity<CourseResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequest req,
            @RequestHeader("X-User-Role") String role) {
        validateAdmin(role);
        return ResponseEntity.ok(courseService.updateCourse(id, req));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar curso — solo ADMIN")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {
        validateAdmin(role);
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/lessons")
    @Operation(summary = "Agregar lección a un curso — solo ADMIN")
    public ResponseEntity<LessonResponse> addLesson(
            @PathVariable Long id,
            @Valid @RequestBody LessonRequest req,
            @RequestHeader("X-User-Role") String role) {
        validateAdmin(role);
        return ResponseEntity.ok(courseService.addLesson(id, req));
    }

    private void validateAdmin(String role) {
        if (!"ROLE_ADMIN".equals(role)) {
            throw new SecurityException("Acceso denegado — se requiere ADMIN");
        }
    }

    @PostMapping("/{id}/image")
    @Operation(summary = "Subir portada del curso a S3 — solo ADMIN")
    public ResponseEntity<CourseResponse> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestHeader("X-User-Role") String role) {
        validateAdmin(role);
        String imageUrl = s3Service.uploadFile(file);
        return ResponseEntity.ok(courseService.updateImageUrl(id, imageUrl));
    }
}