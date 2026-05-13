package com.edutrack.enrollment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseProgressResponse {
    private Long               courseId;
    private int                totalLessons;
    private long               completedLessons;
    private double             percentage;
    private List<ProgressResponse> lessons;
}