package com.edutrack.enrollment.service;

import com.edutrack.enrollment.dto.*;
import com.edutrack.enrollment.model.Enrollment;
import com.edutrack.enrollment.model.LessonProgress;
import com.edutrack.enrollment.repository.EnrollmentRepository;
import com.edutrack.enrollment.repository.LessonProgressRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EnrollmentServiceTest {

    @Mock private EnrollmentRepository enrollmentRepository;
    @Mock private LessonProgressRepository progressRepository;

    private EnrollmentService enrollmentService;

    private Enrollment testEnrollment;
    private LessonProgress testProgress;

    @BeforeEach
    void setUp() {
        enrollmentService = new EnrollmentService(enrollmentRepository, progressRepository);
        testEnrollment = Enrollment.builder()
                .id(1L).userId(1L).courseId(10L).totalLessons(5)
                .enrolledAt(LocalDateTime.now()).build();
        testProgress = LessonProgress.builder()
                .id(1L).enrollment(testEnrollment).lessonId(100L)
                .completed(true).completedAt(LocalDateTime.now()).build();
    }

    @Test
    void enroll_createsEnrollment() {
        EnrollmentRequest req = new EnrollmentRequest();
        req.setCourseId(10L);
        req.setTotalLessons(5);

        when(enrollmentRepository.existsByUserIdAndCourseId(1L, 10L)).thenReturn(false);
        when(enrollmentRepository.save(any())).thenReturn(testEnrollment);

        EnrollmentResponse res = enrollmentService.enroll(1L, req);

        assertThat(res.getCourseId()).isEqualTo(10L);
        assertThat(res.getTotalLessons()).isEqualTo(5);
    }

    @Test
    void enroll_throwsIfAlreadyEnrolled() {
        EnrollmentRequest req = new EnrollmentRequest();
        req.setCourseId(10L);

        when(enrollmentRepository.existsByUserIdAndCourseId(1L, 10L)).thenReturn(true);

        assertThatThrownBy(() -> enrollmentService.enroll(1L, req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Ya estás inscrito");
    }

    @Test
    void getMyEnrollments_returnsUserEnrollments() {
        when(enrollmentRepository.findByUserId(1L)).thenReturn(List.of(testEnrollment));

        var enrollments = enrollmentService.getMyEnrollments(1L);

        assertThat(enrollments).hasSize(1);
        assertThat(enrollments.get(0).getTotalLessons()).isEqualTo(5);
    }

    @Test
    void markLessonCompleted_createsNewProgress() {
        ProgressRequest req = new ProgressRequest();
        req.setCourseId(10L);
        req.setLessonId(100L);

        when(enrollmentRepository.findByUserIdAndCourseId(1L, 10L))
                .thenReturn(Optional.of(testEnrollment));
        when(progressRepository.findByEnrollmentIdAndLessonId(1L, 100L))
                .thenReturn(Optional.empty());
        when(progressRepository.save(any())).thenReturn(testProgress);

        ProgressResponse res = enrollmentService.markLessonCompleted(1L, req);

        assertThat(res.getLessonId()).isEqualTo(100L);
        assertThat(res.getCompleted()).isTrue();
    }

    @Test
    void markLessonCompleted_throwsIfNotEnrolled() {
        ProgressRequest req = new ProgressRequest();
        req.setCourseId(99L);
        req.setLessonId(1L);

        when(enrollmentRepository.findByUserIdAndCourseId(1L, 99L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> enrollmentService.markLessonCompleted(1L, req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("No estás inscrito");
    }

    @Test
    void getCourseProgress_returnsProgressFromStoredTotal() {
        when(enrollmentRepository.findByUserIdAndCourseId(1L, 10L))
                .thenReturn(Optional.of(testEnrollment));
        when(progressRepository.findByEnrollmentId(1L))
                .thenReturn(List.of(testProgress));
        when(progressRepository.countByEnrollmentIdAndCompletedTrue(1L))
                .thenReturn(1L);

        CourseProgressResponse res = enrollmentService.getCourseProgress(1L, 10L);

        assertThat(res.getTotalLessons()).isEqualTo(5);
        assertThat(res.getCompletedLessons()).isEqualTo(1);
        assertThat(res.getPercentage()).isEqualTo(20.0);
    }

    @Test
    void getCourseProgress_returnsZeroWhenNoProgress() {
        when(enrollmentRepository.findByUserIdAndCourseId(1L, 10L))
                .thenReturn(Optional.of(testEnrollment));
        when(progressRepository.findByEnrollmentId(1L))
                .thenReturn(List.of());
        when(progressRepository.countByEnrollmentIdAndCompletedTrue(1L))
                .thenReturn(0L);

        CourseProgressResponse res = enrollmentService.getCourseProgress(1L, 10L);

        assertThat(res.getTotalLessons()).isEqualTo(5);
        assertThat(res.getCompletedLessons()).isEqualTo(0);
        assertThat(res.getPercentage()).isEqualTo(0.0);
    }

    @Test
    void getEnrollmentsByCourse_returnsEnrollments() {
        when(enrollmentRepository.findByCourseId(10L)).thenReturn(List.of(testEnrollment));

        var enrollments = enrollmentService.getEnrollmentsByCourse(10L);

        assertThat(enrollments).hasSize(1);
    }
}
