package com.edutrack.course.controller;

import com.edutrack.course.dto.CategoryResponse;
import com.edutrack.course.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Categories", description = "Gestión de categorías")
public class CategoryController {

    private final CourseService courseService;

    @GetMapping
    @Operation(summary = "Listar categorías")
    public ResponseEntity<Page<CategoryResponse>> getAll(Pageable pageable) {
        return ResponseEntity.ok(courseService.getAllCategories(pageable));
    }

    @PostMapping
    @Operation(summary = "Crear categoría — solo ADMIN")
    public ResponseEntity<CategoryResponse> create(
            @RequestParam String name,
            @RequestHeader("X-User-Role") String role) {
        if (!"ROLE_ADMIN".equals(role)) {
            throw new SecurityException("Acceso denegado — se requiere ADMIN");
        }
        return ResponseEntity.ok(courseService.createCategory(name));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar categoría — solo ADMIN")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @RequestHeader("X-User-Role") String role) {
        if (!"ROLE_ADMIN".equals(role)) {
            throw new SecurityException("Acceso denegado — se requiere ADMIN");
        }
        courseService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}