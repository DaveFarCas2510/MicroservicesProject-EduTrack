package com.edutrack.enrollment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentResponse {
    private Long          id;
    private Long          userId;
    private Long          courseId;
    private int           totalLessons;
    private LocalDateTime enrolledAt;
}