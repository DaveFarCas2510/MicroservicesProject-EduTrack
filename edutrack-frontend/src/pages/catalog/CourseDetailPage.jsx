import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCourseById } from '@/api/courses'
import { enrollCourse, getMyEnrollments, getCourseProgress } from '@/api/enrollments'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import LessonList from '@/components/course/LessonList'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import styles from './CourseDetailPage.module.css'

const BookOpenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)

const CourseDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, isAdmin } = useAuth()
  const toast = useToast()

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [enrolling, setEnrolling] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      try {
        const data = await getCourseById(id)
        setCourse(data)
      } catch (err) {
        setError(err.message || 'Error al cargar el curso')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])

  useEffect(() => {
    if (!isAuthenticated || isAdmin) return
    const checkEnrollment = async () => {
      try {
        const enrollments = await getMyEnrollments()
        const enrolled = enrollments.some((e) => e.courseId === Number(id))
        setIsEnrolled(enrolled)
        if (enrolled) {
          try {
            const prog = await getCourseProgress(id)
            setProgress(prog)
          } catch (err) {
            console.warn('Error fetching course progress:', err)
          }
        }
      } catch (err) {
        console.warn('Error checking enrollment:', err)
      }
    }
    checkEnrollment()
  }, [id, isAuthenticated, isAdmin])

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/cursos/${id}` } } })
      return
    }
    setEnrolling(true)
    try {
      const lessonCount = course?.lessons?.length || 0
      await enrollCourse(id, lessonCount)
      setIsEnrolled(true)
      toast.success('¡Inscripción exitosa!')
      try {
        const prog = await getCourseProgress(id)
        setProgress(prog)
      } catch (err) {
        console.warn('Error getting course progress:', err)
      }
    } catch (err) {
      if (err.status === 400) {
        setIsEnrolled(true)
        toast.info('Ya estás inscrito en este curso')
      } else {
        toast.error(err.message || 'Error al inscribirse')
      }
    } finally {
      setEnrolling(false)
    }
  }

  const handleSelectLesson = (lessonId) => {
    if (!isAuthenticated || !isEnrolled) return
    navigate(`/dashboard/curso/${id}/leccion/${lessonId}`)
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size={36} />
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className={styles.error}>
        <h2>Curso no encontrado</h2>
        <p>{error || 'El curso que buscas no existe.'}</p>
        <Button variant="outline" onClick={() => navigate('/cursos')}>
          Volver al catálogo
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.category}>{course.category?.name || 'General'}</span>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.description}>{course.description}</p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <BookOpenIcon />
              {course.lessons?.length || 0} lecciones
            </span>
            <span className={styles.metaItem}>
              <ClockIcon />
              {new Date(course.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
              })}
            </span>
          </div>

          {isEnrolled && progress && (
            <div className={styles.progressSection}>
              <ProgressBar
                value={progress.completedLessons}
                max={progress.totalLessons}
                size="sm"
                variant="success"
              />
            </div>
          )}

          <div className={styles.heroActions}>
            {isAuthenticated && !isEnrolled && !isAdmin && (
              <Button size="lg" loading={enrolling} onClick={handleEnroll}>
                Inscribirme ahora
              </Button>
            )}
            {!isAuthenticated && (
              <Button size="lg" onClick={handleEnroll}>
                Inscribirme ahora
              </Button>
            )}
            {isEnrolled && (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  const firstLesson = course.lessons?.[0]
                  if (firstLesson) navigate(`/dashboard/curso/${id}/leccion/${firstLesson.id}`)
                }}
              >
                {progress?.completedLessons > 0 ? 'Continuar aprendiendo' : 'Comenzar curso'}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.lessonsSection}>
          <h2 className={styles.sectionTitle}>Contenido del curso</h2>
          <p className={styles.sectionDesc}>
            {course.lessons?.length || 0} lecciones organizadas para tu aprendizaje
          </p>
          <LessonList
            lessons={course.lessons || []}
            progress={progress}
            courseId={course.id}
            onSelectLesson={handleSelectLesson}
          />
        </section>
      </div>
    </div>
  )
}

export default CourseDetailPage
