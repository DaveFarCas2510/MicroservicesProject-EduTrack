package com.edutrack.course.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseSummaryResponse {
    private Long             id;
    private String           title;
    private String           description;
    private String           imageUrl;
    private CategoryResponse category;
    private LocalDateTime    createdAt;
}
