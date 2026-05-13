import { useState, useEffect, useCallback } from 'react'
import { getCourses, getCourseLessons, addLesson } from '@/api/courses'
import Sidebar from '@/components/layout/Sidebar'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Spinner from '@/components/ui/Spinner'
import { useToast } from '@/components/ui/Toast'
import styles from './Manage.module.css'

const ManageLessons = () => {
  const toast = useToast()
  const [courses, setCourses] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [lessons, setLessons] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [loadingLessons, setLoadingLessons] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getCourses({ size: 100 })
      .then((data) => setCourses(data.content || []))
      .catch(() => toast.error('Error al cargar cursos'))
      .finally(() => setLoadingCourses(false))
  }, [toast])

  const fetchLessons = useCallback(async (courseId) => {
    if (!courseId) { setLessons([]); return }
    setLoadingLessons(true)
    try {
      setLessons(await getCourseLessons(courseId))
    } catch (err) {
      toast.error(err.message || 'Error al cargar lecciones')
    } finally {
      setLoadingLessons(false)
    }
  }, [toast])

  useEffect(() => { fetchLessons(selectedCourseId) }, [selectedCourseId, fetchLessons])

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value)
  }

  const openCreate = () => {
    setTitle('')
    setContent('')
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!title.trim()) return
    const nextIndex = lessons.length > 0
      ? Math.max(...lessons.map((l) => l.orderIndex)) + 1
      : 1
    setSaving(true)
    try {
      await addLesson(selectedCourseId, { title: title.trim(), content, orderIndex: nextIndex })
      toast.success('Lección creada')
      setModalOpen(false)
      fetchLessons(selectedCourseId)
    } catch (err) {
      toast.error(err.message || 'Error al crear lección')
    } finally {
      setSaving(false)
    }
  }

  const selectedCourse = courses.find((c) => c.id === Number(selectedCourseId))

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Lecciones</h1>
            <p className={styles.subtitle}>
              {loadingCourses
                ? 'Cargando cursos...'
                : `${courses.length} curso${courses.length !== 1 ? 's' : ''} disponible${courses.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          {selectedCourseId && (
            <Button onClick={openCreate}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Nueva lección
            </Button>
          )}
        </div>

        <div className={styles.field} style={{ marginBottom: 'var(--space-6)' }}>
          <label className={styles.label}>Seleccionar curso</label>
          <select
            className={`${styles.input} native-select`}
            value={selectedCourseId}
            onChange={handleCourseChange}
          >
            <option value="">-- Selecciona un curso --</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        {!selectedCourseId ? (
          <div className={styles.empty}>
            <p>Selecciona un curso para ver sus lecciones.</p>
          </div>
        ) : loadingLessons ? (
          <div className={styles.loading}><Spinner size={32} /></div>
        ) : lessons.length === 0 ? (
          <div className={styles.empty}>
            <p>Este curso no tiene lecciones aún. Crea la primera.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <div className={styles.table}>
              <div className={[styles.tableHeader, styles.tableHeaderLessons].join(' ')}>
                <span className={styles.colTitle}>Lección</span>
                <span className={styles.colContent}>Contenido</span>
                <span className={styles.colOrder}>Orden</span>
              </div>
              {lessons.map((lesson) => (
                <div key={lesson.id} className={[styles.tableRow, styles.tableRowLessons].join(' ')}>
                  <span className={styles.colTitle}>
                    <span className={styles.rowTitle}>{lesson.title}</span>
                  </span>
                  <span className={styles.colContent}>
                    {lesson.content ? lesson.content.substring(0, 60) + (lesson.content.length > 60 ? '...' : '') : '—'}
                  </span>
                  <span className={styles.colOrder}>
                    #{lesson.orderIndex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nueva lección"
        size="lg"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className={styles.field}>
            <label className={styles.label}>Curso</label>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500 }}>
              {selectedCourse?.title}
            </p>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Título de la lección</label>
            <input
              className={styles.input}
              placeholder="Ej: Introducción a Variables"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Contenido</label>
            <textarea
              className={styles.input}
              style={{ minHeight: 160, resize: 'vertical' }}
              placeholder="Escribe el contenido de la lección..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} loading={saving} disabled={!title.trim()}>
              Crear lección
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ManageLessons