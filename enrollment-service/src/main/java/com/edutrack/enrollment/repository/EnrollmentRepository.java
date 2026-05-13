package com.edutrack.enrollment.repository;

import com.edutrack.enrollment.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId);
    List<Enrollment> findByCourseId(Long courseId);
    boolean existsByUserIdAndCourseId(Long userId, Long courseId);
}