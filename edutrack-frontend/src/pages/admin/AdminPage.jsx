import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCourses, getCourseById } from '@/api/courses'
import { getUsers } from '@/api/auth'
import { getCategories } from '@/api/categories'
import Sidebar from '@/components/layout/Sidebar'
import styles from './AdminPage.module.css'

const useAnimatedNumber = (target, duration = 1200) => {
  const [current, setCurrent] = useState(0)
  const prevTarget = useRef(0)
  const frame = useRef(null)
  const currentRef = useRef(0)

  useEffect(() => {
    currentRef.current = current
  }, [current])

  useEffect(() => {
    if (target === currentRef.current) return
    const start = currentRef.current
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(start + (target - start) * eased))
      if (progress < 1) frame.current = requestAnimationFrame(animate)
    }

    frame.current = requestAnimationFrame(animate)
    prevTarget.current = target
    return () => cancelAnimationFrame(frame.current)
  }, [target, duration])

  return current
}

const StatCard = ({ label, value, icon, path, gradient, index }) => {
  const navigate = useNavigate()
  const animatedValue = useAnimatedNumber(value)

  return (
    <div
      className={styles.statCard}
      onClick={() => navigate(path)}
      style={{
        '--card-accent': gradient,
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className={styles.statGlow} style={{ background: gradient }} />
      <div className={styles.statIconWrap}>
        <span className={styles.statIcon}>{icon}</span>
      </div>
      <div className={styles.statInfo}>
        <span className={styles.statValue}>{animatedValue}</span>
        <span className={styles.statLabel}>{label}</span>
      </div>
      <svg className={styles.statArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  )
}

const SkeletonStats = () => (
  <div className={styles.statsGrid}>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className={styles.statCardSkeleton}>
        <div className="skeleton-pulse skeleton-avatar" style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)' }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton-pulse skeleton-title" style={{ width: '60%', height: 28, marginBottom: 8 }} />
          <div className="skeleton-pulse skeleton-text-sm" style={{ width: '40%' }} />
        </div>
      </div>
    ))}
  </div>
)

const AdminPage = () => {
  const [stats, setStats] = useState(null)
  const [recentUsers, setRecentUsers] = useState([])
  const [recentCourses, setRecentCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesData, usersData, categoriesData] = await Promise.all([
          getCourses({ size: 100 }),
          getUsers().catch(() => []),
          getCategories().catch(() => []),
        ])

        const courses = coursesData.content || []
        const categories = categoriesData?.content || []

        const courseDetails = await Promise.all(
          courses.map(c => getCourseById(c.id).catch(() => null))
        )
        const totalLessons = courseDetails.reduce(
          (sum, d) => sum + (d?.lessons?.length || 0), 0
        )

        setStats({
          totalCourses: coursesData.totalElements || courses.length,
          totalUsers: Array.isArray(usersData) ? usersData.length : 0,
          totalLessons,
          totalCategories: categoriesData?.totalElements || categories.length,
        })

        if (Array.isArray(usersData)) {
          setRecentUsers(usersData.slice(-5).reverse())
        }
        const validDetails = courseDetails.filter(Boolean)
        setRecentCourses(validDetails.slice(-5).reverse())
      } catch {
        setStats({ totalCourses: 0, totalUsers: 0, totalLessons: 0, totalCategories: 0 })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Panel de administración</h1>
            <p className={styles.subtitle}>Cargando estadísticas...</p>
          </div>
          <SkeletonStats />
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      label: 'Cursos',
      value: stats.totalCourses,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      path: '/admin/cursos',
      gradient: 'var(--accent)',
    },
    {
      label: 'Usuarios',
      value: stats.totalUsers,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      path: '/admin/usuarios',
      gradient: '#10B981',
    },
    {
      label: 'Lecciones',
      value: stats.totalLessons,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
      path: '/admin/lecciones',
      gradient: '#F59E0B',
    },
    {
      label: 'Categorías',
      value: stats.totalCategories,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4h6l2 2h8v12H4V4z" />
        </svg>
      ),
      path: '/admin/categorias',
      gradient: '#3B82F6',
    },
  ]

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Panel de administración</h1>
            <p className={styles.subtitle}>Gestiona tu plataforma EduTrack</p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.lastUpdate}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {quickActions.map((item, i) => (
            <StatCard key={item.label} {...item} index={i} />
          ))}
        </div>

        <div className={styles.recentSection}>
          <h2 className={styles.recentTitle}>Actividad reciente</h2>
          <div className={styles.recentGrid}>
            <div className={styles.recentCard}>
              <h3 className={styles.recentCardTitle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                Últimos usuarios
              </h3>
              {recentUsers.length > 0 ? (
                <ul className={styles.recentList}>
                  {recentUsers.map((u, i) => (
                    <li key={i} className={styles.recentItem}>
                      <div className={styles.recentItemAvatar}>
                        {u.name?.charAt(0)?.toUpperCase() || u.email?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className={styles.recentItemInfo}>
                        <span className={styles.recentItemName}>{u.name || u.email || 'Sin nombre'}</span>
                        <span className={styles.recentItemMeta}>{u.email || ''}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.recentEmpty}>Sin usuarios registrados</p>
              )}
            </div>

            <div className={styles.recentCard}>
              <h3 className={styles.recentCardTitle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                Últimos cursos
              </h3>
              {recentCourses.length > 0 ? (
                <ul className={styles.recentList}>
                  {recentCourses.map((c, i) => (
                    <li key={i} className={styles.recentItem}>
                      <div className={styles.recentItemAvatar} style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                        {c.title?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className={styles.recentItemInfo}>
                        <span className={styles.recentItemName}>{c.title || 'Sin título'}</span>
                        <span className={styles.recentItemMeta}>{c.lessons?.length || 0} lecciones</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.recentEmpty}>Sin cursos creados</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
