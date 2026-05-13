package com.edutrack.course.repository;

import com.edutrack.course.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Page<Course> findByCategoryId(Long categoryId, Pageable pageable);
}