package com.edutrack.course.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private Long             id;
    private String           title;
    private String           description;
    private String           imageUrl;
    private CategoryResponse category;
    private List<LessonResponse> lessons;
    private LocalDateTime    createdAt;
}