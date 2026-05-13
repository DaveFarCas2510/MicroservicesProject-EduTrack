package com.edutrack.course.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LessonRequest {

    @NotBlank(message = "El título es obligatorio")
    private String title;

    private String content;

    @NotNull(message = "El orden es obligatorio")
    private Integer orderIndex;
}