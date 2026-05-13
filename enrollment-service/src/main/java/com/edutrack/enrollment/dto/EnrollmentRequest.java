package com.edutrack.enrollment.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EnrollmentRequest {

    @NotNull(message = "El courseId es obligatorio")
    private Long courseId;

    @NotNull(message = "El totalLessons es obligatorio")
    private Integer totalLessons;
}