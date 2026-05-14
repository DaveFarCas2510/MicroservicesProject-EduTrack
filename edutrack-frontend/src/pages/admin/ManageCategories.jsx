import { useState, useEffect, useCallback } from 'react'
import { getCategories, createCategory, deleteCategory } from '@/api/categories'
import Sidebar from '@/components/layout/Sidebar'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import Modal from '@/components/ui/Modal'
import ConfirmModal from '@/components/ui/ConfirmModal'
import { useToast } from '@/hooks/useToast'
import styles from './Manage.module.css'

const ManageCategories = () => {
  const toast = useToast()
  const [categories, setCategories] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetchCategories = useCallback(async (pageNum = 0) => {
    try {
      const data = await getCategories({ page: pageNum, size: 12 })
      setCategories(data.content || [])
      setTotalPages(data.totalPages || 0)
      setTotalElements(data.totalElements || 0)
      setPage(data.number || 0)
    } catch (err) {
      toast.error(err.message || 'Error al cargar categorías')
    }
  }, [toast])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    getCategories({ page: 0, size: 12 }).then((data) => {
      setCategories(data.content || [])
      setTotalPages(data.totalPages || 0)
      setTotalElements(data.totalElements || 0)
      setPage(data.number || 0)
    }).catch((err) => {
      toast.error(err.message || 'Error al cargar categorías')
    }).finally(() => setLoading(false))
  }, [toast])

  const handleCreate = async () => {
    if (!categoryName.trim()) return
    setCreating(true)
    try {
      await createCategory(categoryName.trim())
      toast.success('Categoría creada')
      setModalOpen(false)
      setCategoryName('')
      fetchCategories(0)
    } catch (err) {
      toast.error(err.message || 'Error al crear categoría')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    setConfirmDelete(null)
    try {
      await deleteCategory(id)
      toast.success('Categoría eliminada')
      fetchCategories(page)
    } catch (err) {
      toast.error(err.message || 'Error al eliminar categoría')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.contentInner}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Categorías</h1>
            <p className={styles.subtitle}>{totalElements} categoría{totalElements !== 1 ? 's' : ''} en total</p>
          </div>
          <Button onClick={() => setModalOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Nueva categoría
          </Button>
        </div>

        {loading ? (
          <div className={styles.loading}><Spinner size={32} /></div>
        ) : categories.length === 0 ? (
          <div className={styles.empty}><p>No hay categorías aún.</p></div>
        ) : (
          <>
            <div className={styles.categoriesGrid}>
              {categories.map((cat) => (
                <div key={cat.id} className={styles.categoryCard}>
                  <div className={styles.categoryColor}>
                    {cat.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={styles.categoryName}>{cat.name}</span>
                  <button
                    className={[styles.actionBtn, styles.actionDanger].join(' ')}
                    onClick={() => setConfirmDelete(cat.id)}
                    disabled={deletingId === cat.id}
                    title="Eliminar categoría"
                  >
                    {deletingId === cat.id ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4M12 16h.01" />
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageBtn}
                  disabled={page === 0}
                  onClick={() => fetchCategories(page - 1)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Anterior
                </button>
                <span className={styles.pageInfo}>
                  Página {page + 1} de {totalPages}
                </span>
                <button
                  className={styles.pageBtn}
                  disabled={page >= totalPages - 1}
                  onClick={() => fetchCategories(page + 1)}
                >
                  Siguiente
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
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
        title="Eliminar categoría"
        message="¿Estás seguro de eliminar esta categoría? Esta acción no se puede deshacer."
        loading={deletingId === confirmDelete}
      />

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setCategoryName('') }} title="Nueva categoría">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className={styles.field}>
            <label className={styles.label}>Nombre de la categoría</label>
            <input
              className={styles.input}
              placeholder="Ej: Desarrollo Web"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => { setModalOpen(false); setCategoryName('') }}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} loading={creating} disabled={!categoryName.trim()}>
              Crear
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ManageCategories
