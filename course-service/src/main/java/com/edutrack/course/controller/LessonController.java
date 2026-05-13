package com.edutrack.course.controller;

import com.edutrack.course.dto.LessonResponse;
import com.edutrack.course.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
@Tag(name = "Lessons", description = "Gestión de lecciones")
public class LessonController {

    private final CourseService courseService;

    @GetMapping("/{id}")
    @Operation(summary = "Detalle de lección")
    public ResponseEntity<LessonResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getLessonById(id));
    }
}
