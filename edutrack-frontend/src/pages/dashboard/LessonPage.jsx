import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCourseById } from '@/api/courses'
import { getLesson } from '@/api/enrollments'
import { getCourseProgress, completeLesson } from '@/api/enrollments'
import { useToast } from '@/components/ui/Toast'
import LessonList from '@/components/course/LessonList'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import styles from './LessonPage.module.css'

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4 12 14.01l-3-3" />
  </svg>
)

const LessonPage = () => {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [course, setCourse] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [courseData, lessonData, progressData] = await Promise.all([
          getCourseById(courseId),
          getLesson(lessonId),
          getCourseProgress(courseId).catch(() => null),
        ])
        if (cancelled) return
        setCourse(courseData)
        setLesson(lessonData)
        setProgress(progressData)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Error al cargar la lección')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [courseId, lessonId])

  const lessons = course?.lessons || []
  const currentIndex = lessons.findIndex((l) => l.id === Number(lessonId))
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  const isCompleted = progress?.lessons?.some(
    (lp) => (lp.lessonId === Number(lessonId)) && lp.completed
  )

  const handleComplete = async () => {
    setCompleting(true)
    try {
      await completeLesson(courseId, lessonId)
      toast.success('Lección completada')
      const freshProgress = await getCourseProgress(courseId)
      setProgress(freshProgress)
    } catch (err) {
      toast.error(err.message || 'Error al marcar lección')
    } finally {
      setCompleting(false)
    }
  }

  const handleSelectLesson = (id) => {
    navigate(`/dashboard/curso/${courseId}/leccion/${id}`)
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size={36} />
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className={styles.error}>
        <h2>Lección no encontrada</h2>
        <p>{error || 'La lección que buscas no existe.'}</p>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Volver a mi aprendizaje
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
            <ArrowLeftIcon />
            Mi aprendizaje
          </button>
          <h3 className={styles.sidebarCourseTitle}>{course?.title}</h3>
          {progress && (
            <ProgressBar
              value={progress.completedLessons}
              max={progress.totalLessons}
              size="sm"
              variant="success"
            />
          )}
        </div>
        <div className={styles.sidebarLessons}>
          <LessonList
            lessons={lessons}
            progress={progress}
            courseId={courseId}
            onSelectLesson={handleSelectLesson}
            currentLessonId={Number(lessonId)}
          />
        </div>
      </div>

      <div className={styles.main}>
        {}
        {progress && (
          <div className={styles.mobileProgress}>
            <div className={styles.mobileProgressTop}>
              <span className={styles.lessonOrder}>
                Lección {lesson.orderIndex || currentIndex + 1} de {lessons.length}
              </span>
              <span className={styles.mobileProgressPct}>
                {Math.round((progress.completedLessons / progress.totalLessons) * 100)}%
              </span>
            </div>
            <ProgressBar
              value={progress.completedLessons}
              max={progress.totalLessons}
              size="sm"
              variant="success"
              showLabel={false}
            />
            <div className={styles.mobileLessonNav}>
              <select
                className={styles.mobileLessonSelect}
                value={lessonId}
                onChange={(e) => handleSelectLesson(e.target.value)}
              >
                {lessons.map((l, i) => (
                  <option key={l.id} value={l.id}>
                    {i + 1}. {l.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className={styles.lessonHeader}>
          <h1 className={styles.lessonTitle}>{lesson.title}</h1>
        </div>

        <div className={styles.lessonContent}>
          {lesson.content.split('\n').map((paragraph, i) => (
            paragraph.trim() ? <p key={i} className={styles.paragraph}>{paragraph}</p> : null
          ))}
        </div>

        <div className={styles.lessonFooter}>
          <div className={styles.navButtons}>
            {prevLesson ? (
              <Button
                variant="outline"
                leftIcon={<ArrowLeftIcon />}
                onClick={() => handleSelectLesson(prevLesson.id)}
              >
                Anterior
              </Button>
            ) : <div />}

            {nextLesson ? (
              <Button
                variant="outline"
                rightIcon={<ArrowRightIcon />}
                onClick={() => handleSelectLesson(nextLesson.id)}
              >
                Siguiente
              </Button>
            ) : <div />}
          </div>

          <div className={styles.completeSection}>
            {isCompleted ? (
              <span className={styles.completedBadge}>
                <CheckCircleIcon />
                Completada
              </span>
            ) : (
              <Button
                variant="primary"
                loading={completing}
                leftIcon={<CheckCircleIcon />}
                onClick={handleComplete}
              >
                Marcar como completada
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonPage
