package com.edutrack.enrollment.service;

import com.edutrack.enrollment.dto.*;
import com.edutrack.enrollment.model.Enrollment;
import com.edutrack.enrollment.model.LessonProgress;
import com.edutrack.enrollment.repository.EnrollmentRepository;
import com.edutrack.enrollment.repository.LessonProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository     enrollmentRepository;
    private final LessonProgressRepository progressRepository;


    public EnrollmentResponse enroll(Long userId, EnrollmentRequest req) {
        if (enrollmentRepository.existsByUserIdAndCourseId(userId, req.getCourseId())) {
            throw new IllegalArgumentException("Ya estás inscrito en este curso");
        }
        Enrollment enrollment = Enrollment.builder()
                .userId(userId)
                .courseId(req.getCourseId())
                .totalLessons(req.getTotalLessons())
                .build();
        return toEnrollmentResponse(enrollmentRepository.save(enrollment));
    }

    public List<EnrollmentResponse> getMyEnrollments(Long userId) {
        return enrollmentRepository.findByUserId(userId)
                .stream()
                .map(this::toEnrollmentResponse)
                .toList();
    }

    public List<EnrollmentResponse> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId)
                .stream()
                .map(this::toEnrollmentResponse)
                .toList();
    }


    public ProgressResponse markLessonCompleted(Long userId, ProgressRequest req) {
        Enrollment enrollment = enrollmentRepository
                .findByUserIdAndCourseId(userId, req.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "No estás inscrito en este curso"));

        LessonProgress progress = progressRepository
                .findByEnrollmentIdAndLessonId(enrollment.getId(), req.getLessonId())
                .orElse(LessonProgress.builder()
                        .enrollment(enrollment)
                        .lessonId(req.getLessonId())
                        .completed(false)
                        .build());

        progress.setCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());

        return toProgressResponse(progressRepository.save(progress));
    }

    public CourseProgressResponse getCourseProgress(Long userId, Long courseId) {
        Enrollment enrollment = enrollmentRepository
                .findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "No estás inscrito en este curso"));

        List<LessonProgress> lessons = progressRepository
                .findByEnrollmentId(enrollment.getId());

        long completed = progressRepository
                .countByEnrollmentIdAndCompletedTrue(enrollment.getId());

        int total = enrollment.getTotalLessons();
        double percentage = total > 0 ? (completed * 100.0 / total) : 0.0;

        return CourseProgressResponse.builder()
                .courseId(courseId)
                .totalLessons(total)
                .completedLessons(completed)
                .percentage(Math.round(percentage * 10.0) / 10.0)
                .lessons(lessons.stream().map(this::toProgressResponse).toList())
                .build();
    }

    private EnrollmentResponse toEnrollmentResponse(Enrollment e) {
        return EnrollmentResponse.builder()
                .id(e.getId())
                .userId(e.getUserId())
                .courseId(e.getCourseId())
                .totalLessons(e.getTotalLessons())
                .enrolledAt(e.getEnrolledAt())
                .build();
    }

    private ProgressResponse toProgressResponse(LessonProgress p) {
        return ProgressResponse.builder()
                .lessonId(p.getLessonId())
                .completed(p.getCompleted())
                .completedAt(p.getCompletedAt())
                .build();
    }
}