package com.edutrack.course.repository;

import com.edutrack.course.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourseRepository extends JpaRepository<Course, Long> {
    Page<Course> findByCategoryId(Long categoryId, Pageable pageable);

    @Query("SELECT c FROM Course c WHERE " +
           "LOWER(c.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Course> search(@Param("search") String search, Pageable pageable);

    @Query("SELECT c FROM Course c WHERE c.category.id = :categoryId AND (" +
           "LOWER(c.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Course> searchByCategory(@Param("categoryId") Long categoryId, @Param("search") String search, Pageable pageable);
}