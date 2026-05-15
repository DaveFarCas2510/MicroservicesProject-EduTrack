import { useState, useEffect, useRef, useCallback } from 'react'
import { getCourses } from '@/api/courses'
import { getCategories } from '@/api/categories'
import CourseCard from '@/components/course/CourseCard'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import styles from './CatalogPage.module.css'

const CatalogPage = () => {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const loadingRef = useRef(false)

  const fetchCourses = useCallback(async (categoryId = null, pageNum = 0, search = '') => {
    if (loadingRef.current) return
    loadingRef.current = true
    setLoading(true)
    setError(null)
    try {
      const params = { page: pageNum, size: 9 }
      if (categoryId) params.categoryId = categoryId
      if (search.trim()) params.search = search.trim()
      const data = await getCourses(params)
      setCourses(data.content || [])
      setTotalPages(data.totalPages || 0)
      setTotalElements(data.totalElements || 0)
      setPage(data.number || 0)
    } catch (err) {
      setError(err.message || 'Error al cargar cursos')
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }, [])

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.content || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetchCourses(selectedCategory, 0, searchQuery)
  }, [selectedCategory, fetchCourses])

  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchCourses(selectedCategory, 0, '')
      return
    }
    const timer = setTimeout(() => {
      fetchCourses(selectedCategory, 0, searchQuery)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, fetchCourses])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
  }

  const handlePageChange = (newPage) => {
    if (newPage < 0 || newPage >= totalPages) return
    fetchCourses(selectedCategory, newPage, searchQuery)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Catálogo de cursos</h1>
          <p className={styles.subtitle}>
            {totalElements > 0
              ? `${totalElements} curso${totalElements !== 1 ? 's' : ''} disponible${totalElements !== 1 ? 's' : ''}`
              : 'Explora nuestro contenido'}
          </p>
        </div>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Explora cursos, temas o categorías..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery.trim() && (
            <>
              <button className={styles.searchClear} onClick={handleClearSearch} aria-label="Limpiar búsqueda">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <span className={styles.searchCount}>{totalElements} resultado{totalElements !== 1 ? 's' : ''}</span>
            </>
          )}
        </div>
      </div>

      {categories.length > 0 && (
        <div className={styles.filters}>
          <button
            className={[styles.filterBtn, selectedCategory === null ? styles.filterActive : ''].join(' ')}
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={[styles.filterBtn, selectedCategory === cat.id ? styles.filterActive : ''].join(' ')}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>
          <Spinner size={36} />
          <p className={styles.loadingText}>Cargando cursos...</p>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <p>{error}</p>
          <button className={styles.retryBtn} onClick={() => fetchCourses(selectedCategory, 0, searchQuery)}>
            Intentar de nuevo
          </button>
        </div>
      ) : courses.length === 0 ? (
        <div className={styles.empty}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <h3 className={styles.emptyTitle}>
            {searchQuery.trim() ? 'Sin resultados' : 'Sin cursos disponibles'}
          </h3>
          <p className={styles.emptyDesc}>
            {searchQuery.trim()
              ? `No se encontraron cursos para "${searchQuery}".`
              : selectedCategory
                ? 'No hay cursos en esta categoría todavía.'
                : 'No hay cursos disponibles por el momento.'}
          </p>
          {searchQuery.trim() && (
            <Button variant="outline" onClick={handleClearSearch}>
              Limpiar búsqueda
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                disabled={page === 0}
                onClick={() => handlePageChange(page - 1)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Anterior
              </button>
              <div className={styles.pageInfo}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={[styles.pageNum, i === page ? styles.pageNumActive : ''].join(' ')}
                    onClick={() => handlePageChange(i)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className={styles.pageBtn}
                disabled={page >= totalPages - 1}
                onClick={() => handlePageChange(page + 1)}
              >
                Siguiente
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CatalogPage