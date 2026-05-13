package com.edutrack.course.service;

import com.edutrack.course.dto.*;
import com.edutrack.course.model.Category;
import com.edutrack.course.model.Course;
import com.edutrack.course.model.Lesson;
import com.edutrack.course.repository.CategoryRepository;
import com.edutrack.course.repository.CourseRepository;
import com.edutrack.course.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository   courseRepository;
    private final CategoryRepository categoryRepository;
    private final LessonRepository   lessonRepository;

    // ── Cursos ───────────────────────────────────────────────────

    public Page<CourseSummaryResponse> getAllCourses(Long categoryId, Pageable pageable) {
        Page<Course> courses = categoryId != null
                ? courseRepository.findByCategoryId(categoryId, pageable)
                : courseRepository.findAll(pageable);
        return courses.map(this::toCourseSummary);
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado: " + id));
        return toCourseResponse(course);
    }

    public CourseResponse createCourse(CourseRequest req) {
        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada"));
        Course course = Course.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .category(category)
                .build();
        return toCourseResponse(courseRepository.save(course));
    }

    public CourseResponse updateCourse(Long id, CourseRequest req) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado: " + id));
        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada"));
        course.setTitle(req.getTitle());
        course.setDescription(req.getDescription());
        course.setCategory(category);
        return toCourseResponse(courseRepository.save(course));
    }

    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new IllegalArgumentException("Curso no encontrado: " + id);
        }
        courseRepository.deleteById(id);
    }

    public CourseResponse updateImageUrl(Long id, String imageUrl) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado: " + id));
        course.setImageUrl(imageUrl);
        return toCourseResponse(courseRepository.save(course));
    }

    // ── Lecciones ────────────────────────────────────────────────

    public LessonResponse getLessonById(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lección no encontrada: " + id));
        return toLessonResponse(lesson);
    }

    public LessonResponse addLesson(Long courseId, LessonRequest req) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado: " + courseId));
        Lesson lesson = Lesson.builder()
                .course(course)
                .title(req.getTitle())
                .content(req.getContent())
                .orderIndex(req.getOrderIndex())
                .build();
        return toLessonResponse(lessonRepository.save(lesson));
    }

    public CategoryResponse createCategory(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new IllegalArgumentException("La categoría ya existe");
        }
        Category category = categoryRepository.save(
                Category.builder().name(name).build()
        );
        return toCategoryResponse(category);
    }

    public Page<CategoryResponse> getAllCategories(Pageable pageable) {
        return categoryRepository.findAll(pageable).map(this::toCategoryResponse);
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalArgumentException("Categoría no encontrada: " + id);
        }
        categoryRepository.deleteById(id);
    }


    private CourseResponse toCourseResponse(Course c) {
        return CourseResponse.builder()
                .id(c.getId())
                .title(c.getTitle())
                .description(c.getDescription())
                .imageUrl(c.getImageUrl())
                .category(toCategoryResponse(c.getCategory()))
                .lessons(c.getLessons() != null
                        ? c.getLessons().stream().map(this::toLessonResponse).toList()
                        : null)
                .createdAt(c.getCreatedAt())
                .build();
    }

    private CourseSummaryResponse toCourseSummary(Course c) {
        return CourseSummaryResponse.builder()
                .id(c.getId())
                .title(c.getTitle())
                .description(c.getDescription())
                .imageUrl(c.getImageUrl())
                .category(toCategoryResponse(c.getCategory()))
                .createdAt(c.getCreatedAt())
                .build();
    }

    private LessonResponse toLessonResponse(Lesson l) {
        return LessonResponse.builder()
                .id(l.getId())
                .title(l.getTitle())
                .content(l.getContent())
                .orderIndex(l.getOrderIndex())
                .build();
    }

    private CategoryResponse toCategoryResponse(Category c) {
        return CategoryResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .build();
    }
}
