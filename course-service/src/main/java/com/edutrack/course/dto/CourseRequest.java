package com.edutrack.course.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CourseRequest {

    @NotBlank(message = "El título es obligatorio")
    private String title;

    private String description;

    @NotNull(message = "La categoría es obligatoria")
    private Long categoryId;
}