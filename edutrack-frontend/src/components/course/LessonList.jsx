import styles from './LessonList.module.css'

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const LessonList = ({ lessons, progress = {}, onSelectLesson, currentLessonId }) => {
  if (!lessons || lessons.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Este curso no tiene lecciones aún.</p>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {lessons.map((lesson, index) => {
        const lessonProgress = progress?.lessons?.find(
          (lp) => lp.lessonId === lesson.id || lp.lessonId === lesson.lessonId
        )
        const isCompleted = lessonProgress?.completed
        const isCurrent = currentLessonId === lesson.id
        const isFirst = index === 0

        return (
          <button
            key={lesson.id}
            className={[
              styles.lesson,
              isCompleted ? styles.completed : '',
              isCurrent ? styles.current : '',
            ].filter(Boolean).join(' ')}
            onClick={() => onSelectLesson(lesson.id)}
          >
            <span className={styles.icon}>
              {isCompleted ? <CheckIcon /> : isCurrent || isFirst ? <PlayIcon /> : <LockIcon />}
            </span>
            <div className={styles.info}>
              <span className={styles.order}>Lección {lesson.orderIndex || index + 1}</span>
              <span className={styles.title}>{lesson.title}</span>
            </div>
            {isCurrent && <span className={styles.currentBadge}>Actual</span>}
          </button>
        )
      })}
    </div>
  )
}

export default LessonList
