import { useState, useEffect, useCallback, useMemo } from 'react'
import { getCourses, getCourseById, deleteCourse } from '@/api/courses'
import { getCategories } from '@/api/categories'
import Sidebar from '@/components/layout/Sidebar'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import ConfirmModal from '@/components/ui/ConfirmModal'
import Spinner from '@/components/ui/Spinner'
import { useToast } from '@/hooks/useToast'
import CourseForm from '@/components/admin/CourseForm'
import styles from './Manage.module.css'

const ManageCourses = () => {
  const toast = useToast()
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const filteredCourses = useMemo(() => {
    if (!search.trim()) return courses
    const query = search.toLowerCase().trim()
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        (course.category?.name?.toLowerCase().includes(query) ?? false)
    )
  }, [courses, search])

  const fetchCourses = useCallback(async (pageNum = 0) => {
    setLoading(true)
    try {
      const data = await getCourses({ page: pageNum, size: 10 })
      const coursesList = data.content || []

      const withCounts = await Promise.all(
        coursesList.map(async (c) => {
          try {
            const detail = await getCourseById(c.id)
            return { ...c, lessonCount: detail.lessons?.length || 0 }
          } catch {
            return { ...c, lessonCount: '—' }
          }
        })
      )

      setCourses(withCounts)
      setTotalPages(data.totalPages || 0)
      setPage(data.number || 0)
    } catch (err) {
      toast.error(err.message || 'Error al cargar cursos')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
  let cancelled = false
  const loadData = async () => {
    setLoading(true)
    try {
      await fetchCourses()
      const categoriesData = await getCategories()
      if (!cancelled) {
        setCategories(categoriesData.content || [])
      }
    } catch (err) {
      if (!cancelled) {
        toast.error(err.message || 'Error al cargar datos')
      }
    } finally {
      if (!cancelled) setLoading(false)
    }
  }
  loadData()
  return () => { cancelled = true }
}, [fetchCourses, toast])

  const handleEdit = (course) => {
    setEditingCourse(course)
    setModalOpen(true)
  }

  const handleCreate = () => {
    setEditingCourse(null)
    setModalOpen(true)
  }

  const handleDelete = async (courseId) => {
    setDeleting(true)
    setConfirmDelete(null)
    try {
      await deleteCourse(courseId)
      toast.success('Curso eliminado')
      fetchCourses(page)
    } catch (err) {
      toast.error(err.message || 'Error al eliminar')
    } finally {
      setDeleting(false)
    }
  }

  const handleSave = () => {
    setModalOpen(false)
    setEditingCourse(null)
    fetchCourses(0)
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.contentInner}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Cursos</h1>
            <p className={styles.subtitle}>{search.trim() ? `${filteredCourses.length} resultado${filteredCourses.length !== 1 ? 's' : ''}` : `${courses.length} curso${courses.length !== 1 ? 's' : ''} en total`}</p>
          </div>
          <Button onClick={handleCreate}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Nuevo curso
          </Button>
        </div>

        {loading ? (
          <div className={styles.loading}><Spinner size={32} /></div>
        ) : (
          <>
            <div className={styles.searchBar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por título, categoría..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              {search && (
                <button className={styles.searchClear} onClick={() => setSearch('')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {courses.length === 0 ? (
              <div className={styles.empty} style={{ marginTop: 0 }}>
                <p>No hay cursos aún. Crea tu primer curso.</p>
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <div className={styles.table}>
                  <div className={styles.tableHeader}>
                    <span className={styles.colTitle}>Curso</span>
                    <span className={styles.colCategory}>Categoría</span>
                    <span className={styles.colLessons}>Lecciones</span>
                    <span className={styles.colDate}>Creado</span>
                    <span className={styles.colActions}>Acciones</span>
                  </div>
                  {filteredCourses.map((course) => (
                    <div key={course.id} className={styles.tableRow}>
                      <span className={styles.colTitle}>
                        <span className={styles.rowTitle}>{course.title}</span>
                        <span className={styles.rowDesc}>{course.description}</span>
                      </span>
                      <span className={styles.colCategory}>
                        <span className={styles.categoryBadge}>{course.category?.name || 'General'}</span>
                      </span>
                      <span className={styles.colLessons}>{course.lessonCount}</span>
                      <span className={styles.colDate}>{new Date(course.createdAt).toLocaleDateString('es-ES')}</span>
                      <span className={styles.colActions}>
                        <button className={styles.actionBtn} onClick={() => handleEdit(course)} title="Editar">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className={[styles.actionBtn, styles.actionDanger].join(' ')} onClick={() => setConfirmDelete(course.id)} title="Eliminar">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button className={styles.pageBtn} disabled={page === 0} onClick={() => fetchCourses(page - 1)}>Anterior</button>
                <span className={styles.pageInfo}>Página {page + 1} de {totalPages}</span>
                <button className={styles.pageBtn} disabled={page >= totalPages - 1} onClick={() => fetchCourses(page + 1)}>Siguiente</button>
              </div>
            )}
          </>
        )}
        </div>
      </div>

      <ConfirmModal
        open={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => handleDelete(confirmDelete)}
        title="Eliminar curso"
        message="¿Estás seguro de eliminar este curso? Esta acción no se puede deshacer."
        loading={deleting}
      />

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditingCourse(null) }} title={editingCourse ? 'Editar curso' : 'Crear curso'} size="lg">
        <CourseForm
          course={editingCourse}
          categories={categories}
          onSave={handleSave}
          onCancel={() => { setModalOpen(false); setEditingCourse(null) }}
        />
      </Modal>
    </div>
  )
}

export default ManageCourses
