package com.edutrack.enrollment.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProgressRequest {

    @NotNull(message = "El courseId es obligatorio")
    private Long courseId;

    @NotNull(message = "El lessonId es obligatorio")
    private Long lessonId;
}