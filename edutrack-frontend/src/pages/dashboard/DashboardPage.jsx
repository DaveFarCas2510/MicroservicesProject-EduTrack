import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyEnrollments, getCourseProgress } from '@/api/enrollments'
import { getCourseById } from '@/api/courses'
import Spinner from '@/components/ui/Spinner'
import ProgressBar from '@/components/ui/ProgressBar'
import styles from './DashboardPage.module.css'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const enrollments = await getMyEnrollments()
        const coursesWithDetails = await Promise.all(
          enrollments.map(async (enrollment) => {
            try {
              const [course, progress] = await Promise.all([
                getCourseById(enrollment.courseId),
                getCourseProgress(enrollment.courseId).catch(() => null),
              ])
              return { ...enrollment, course, progress }
            } catch {
              return { ...enrollment, course: null, progress: null }
            }
          })
        )
        setEnrolledCourses(coursesWithDetails.filter((e) => e.course))
      } catch (err) {
        setError(err.message || 'Error al cargar tus cursos')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalLessons = (course) => course.lessons?.length || 0

  const progressCounts = useMemo(() => {
    let completed = 0
    let total = 0
    enrolledCourses.forEach((enr) => {
      const p = enr.progress
      const lessonCount = totalLessons(enr.course)
      if (p) {
        const done = p.completedLessons ?? p.completed ?? 0
        const all = p.totalLessons ?? p.total ?? lessonCount
        completed += done
        total += all
      } else {
        total += lessonCount
      }
    })
    return { completed, total }
  }, [enrolledCourses])

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size={36} />
        <p className={styles.loadingText}>Cargando tu aprendizaje...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Mi aprendizaje</h1>
          <p className={styles.subtitle}>
            {enrolledCourses.length > 0
              ? `${enrolledCourses.length} curso${enrolledCourses.length !== 1 ? 's' : ''} inscrito${enrolledCourses.length !== 1 ? 's' : ''}`
              : 'Comienza inscribiéndote en un curso'}
          </p>
        </div>
      </div>

      {enrolledCourses.length > 0 && (
        <div className={styles.statsBanner}>
          <div className={styles.statsBannerItem}>
            <span className={styles.statsBannerValue}>{progressCounts.completed}</span>
            <span className={styles.statsBannerLabel}>Lecciones completadas</span>
          </div>
          <div className={styles.statsBannerDivider} />
          <div className={styles.statsBannerItem}>
            <span className={styles.statsBannerValue}>{progressCounts.total}</span>
            <span className={styles.statsBannerLabel}>Lecciones totales</span>
          </div>
          <div className={styles.statsBannerDivider} />
          <div className={styles.statsBannerItem}>
            <span className={styles.statsBannerValue}>
              {progressCounts.total > 0
                ? Math.round((progressCounts.completed / progressCounts.total) * 100)
                : 0}%
            </span>
            <span className={styles.statsBannerLabel}>Progreso global</span>
          </div>
        </div>
      )}

      {enrolledCourses.length === 0 ? (
        <div className={styles.empty}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <h3 className={styles.emptyTitle}>Aún no estás inscrito</h3>
          <p className={styles.emptyDesc}>Explora el catálogo y encuentra el curso perfecto para ti.</p>
          <button className={styles.exploreBtn} onClick={() => navigate('/cursos')}>
            Explorar cursos
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {enrolledCourses.map((enrollment, idx) => {
            const course = enrollment.course
            const lessonCount = totalLessons(course)
            const progress = enrollment.progress
            const completed = progress ? (progress.completedLessons ?? progress.completed ?? 0) : 0
            const total = progress ? (progress.totalLessons ?? progress.total ?? lessonCount) : lessonCount
            return (
              <div
                key={enrollment.id}
                className={styles.courseCard}
                style={{ animationDelay: `${idx * 80}ms` }}
                onClick={() => {
                  if (lessonCount > 0) {
                    navigate(`/dashboard/curso/${course.id}/leccion/${course.lessons[0].id}`)
                  }
                }}
              >
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt={course.title} className={styles.courseImage} />
                ) : (
                  <div className={styles.courseImagePlaceholder}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                )}
                <div className={styles.courseBody}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseDesc}>{course.description}</p>
                  <div className={styles.courseProgressWrap}>
                    <ProgressBar value={completed} max={total} showLabel={false} />
                    <span className={styles.courseProgressLabel}>{completed}/{total} lecciones</span>
                  </div>
                  <div className={styles.courseMeta}>
                    <span className={styles.lessonCount}>{lessonCount} lecciones</span>
                    <span className={styles.enrolledDate}>
                      Inscrito {new Date(enrollment.enrolledAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DashboardPage
