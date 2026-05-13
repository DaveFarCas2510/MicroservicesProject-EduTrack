import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyEnrollments } from '@/api/enrollments'
import { getCourseById } from '@/api/courses'
import Spinner from '@/components/ui/Spinner'
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
              const course = await getCourseById(enrollment.courseId)
              return { ...enrollment, course }
            } catch {
              return { ...enrollment, course: null }
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
          {enrolledCourses.map((enrollment) => {
            const course = enrollment.course
            const lessonCount = totalLessons(course)
            return (
              <div
                key={enrollment.id}
                className={styles.courseCard}
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
