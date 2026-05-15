package com.edutrack.course.service;

import com.edutrack.course.dto.*;
import com.edutrack.course.model.Category;
import com.edutrack.course.model.Course;
import com.edutrack.course.model.Lesson;
import com.edutrack.course.repository.CategoryRepository;
import com.edutrack.course.repository.CourseRepository;
import com.edutrack.course.repository.LessonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseServiceTest {

    @Mock private CourseRepository courseRepository;
    @Mock private CategoryRepository categoryRepository;
    @Mock private LessonRepository lessonRepository;

    private CourseService courseService;

    private Category testCategory;
    private Course testCourse;
    private Lesson testLesson;

    @BeforeEach
    void setUp() {
        courseService = new CourseService(courseRepository, categoryRepository, lessonRepository);
        testCategory = Category.builder().id(1L).name("Programación").build();
        testLesson = Lesson.builder().id(1L).title("Intro").content("Contenido").orderIndex(1).build();
        testCourse = Course.builder()
                .id(1L).title("Java Basics").description("Learn Java")
                .category(testCategory).imageUrl("img.jpg")
                .lessons(List.of(testLesson))
                .createdAt(LocalDateTime.now()).build();
    }

    @Test
    void getAllCourses_returnsPaginatedCourses() {
        Pageable pageable = PageRequest.of(0, 10);
        when(courseRepository.findAll(pageable)).thenReturn(new PageImpl<>(List.of(testCourse)));

        Page<CourseSummaryResponse> result = courseService.getAllCourses(null, null, pageable);

        assertThat(result).hasSize(1);
        assertThat(result.getContent().get(0).getTitle()).isEqualTo("Java Basics");
    }

    @Test
    void getAllCourses_filtersByCategory() {
        Pageable pageable = PageRequest.of(0, 10);
        when(courseRepository.findByCategoryId(1L, pageable))
                .thenReturn(new PageImpl<>(List.of(testCourse)));

        Page<CourseSummaryResponse> result = courseService.getAllCourses(1L, null, pageable);

        assertThat(result).hasSize(1);
        verify(courseRepository).findByCategoryId(1L, pageable);
    }

    @Test
    void getCourseById_returnsCourse() {
        when(courseRepository.findById(1L)).thenReturn(Optional.of(testCourse));

        CourseResponse result = courseService.getCourseById(1L);

        assertThat(result.getTitle()).isEqualTo("Java Basics");
        assertThat(result.getLessons()).hasSize(1);
    }

    @Test
    void getCourseById_throwsIfNotFound() {
        when(courseRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> courseService.getCourseById(99L))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Curso no encontrado");
    }

    @Test
    void createCourse_createsAndReturnsCourse() {
        CourseRequest req = new CourseRequest();
        req.setTitle("New Course");
        req.setDescription("Description");
        req.setCategoryId(1L);

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(testCategory));
        when(courseRepository.save(any())).thenReturn(testCourse);

        CourseResponse result = courseService.createCourse(req);

        assertThat(result.getTitle()).isEqualTo("Java Basics");
        verify(courseRepository).save(any());
    }

    @Test
    void deleteCourse_deletesIfExists() {
        when(courseRepository.existsById(1L)).thenReturn(true);

        courseService.deleteCourse(1L);

        verify(courseRepository).deleteById(1L);
    }

    @Test
    void deleteCourse_throwsIfNotFound() {
        when(courseRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> courseService.deleteCourse(99L))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Curso no encontrado");
    }

    @Test
    void createCategory_createsAndReturns() {
        when(categoryRepository.existsByName("Nueva")).thenReturn(false);
        when(categoryRepository.save(any())).thenReturn(testCategory);

        CategoryResponse result = courseService.createCategory("Nueva");

        assertThat(result.getName()).isEqualTo("Programación");
    }

    @Test
    void createCategory_throwsIfDuplicate() {
        when(categoryRepository.existsByName("Nueva")).thenReturn(true);

        assertThatThrownBy(() -> courseService.createCategory("Nueva"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("categoría ya existe");
    }

    @Test
    void deleteCategory_deletesIfExists() {
        when(categoryRepository.existsById(1L)).thenReturn(true);

        courseService.deleteCategory(1L);

        verify(categoryRepository).deleteById(1L);
    }

    @Test
    void deleteCategory_throwsIfNotFound() {
        when(categoryRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> courseService.deleteCategory(99L))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Categoría no encontrada");
    }

    @Test
    void addLesson_createsAndReturns() {
        LessonRequest req = new LessonRequest();
        req.setTitle("New Lesson");
        req.setContent("Content");
        req.setOrderIndex(1);

        when(courseRepository.findById(1L)).thenReturn(Optional.of(testCourse));
        when(lessonRepository.save(any())).thenReturn(testLesson);

        LessonResponse result = courseService.addLesson(1L, req);

        assertThat(result.getTitle()).isEqualTo("Intro");
    }

    @Test
    void getLessonById_returnsLesson() {
        when(lessonRepository.findById(1L)).thenReturn(Optional.of(testLesson));

        LessonResponse result = courseService.getLessonById(1L);

        assertThat(result.getTitle()).isEqualTo("Intro");
    }

    @Test
    void updateImageUrl_updatesAndReturns() {
        when(courseRepository.findById(1L)).thenReturn(Optional.of(testCourse));
        when(courseRepository.save(any())).thenReturn(testCourse);

        CourseResponse result = courseService.updateImageUrl(1L, "new-img.jpg");

        assertThat(result.getImageUrl()).isEqualTo("new-img.jpg");
    }
}
