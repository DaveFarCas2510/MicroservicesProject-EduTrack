import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import styles from './Sidebar.module.css'

const links = [
  {
    to: '/admin',
    label: 'Panel',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    end: true,
  },
  {
    to: '/admin/cursos',
    label: 'Cursos',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    to: '/admin/categorias',
    label: 'Categorías',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 4h6l2 2h8v12H4V4z" />
      </svg>
    ),
  },
  {
    to: '/admin/lecciones',
    label: 'Lecciones',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    to: '/admin/usuarios',
    label: 'Usuarios',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

const Sidebar = ({ onNavigate }) => {
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="var(--accent)"/>
            <path d="M7 10C7 9.44772 7.44772 9 8 9H16C16.5523 9 17 9.44772 17 10V22C17 22.5523 16.5523 23 16 23H8C7.44772 23 7 22.5523 7 22V10Z" fill="white" fillOpacity="0.9"/>
            <path d="M17 11.5C17 11.5 19 10.5 24 11V23C19 22.5 17 23 17 23V11.5Z" fill="white" fillOpacity="0.6"/>
          </svg>
          <span className={styles.logoText}>Admin</span>
        </div>

        <nav className={styles.links} aria-label="Panel de administración">
          {links.map((link, i) => {
            const isActive = link.end
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to)
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={[styles.link, isActive ? styles.linkActive : ''].filter(Boolean).join(' ')}
                onClick={onNavigate}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className={styles.linkIcon}>{link.icon}</span>
                <span className={styles.linkLabel}>{link.label}</span>
                {isActive && <span className={styles.linkActiveDot} />}
              </NavLink>
            )
          })}
        </nav>

        <div className={styles.footer}>
          <button className={styles.themeBtn} onClick={toggleTheme} aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}>
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
            <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
          </button>
        </div>
      </aside>

      <nav className={styles.mobileNav} aria-label="Navegación admin móvil">
        {links.map((link) => {
          const isActive = link.end
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to)
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={[styles.mobileLink, isActive ? styles.mobileLinkActive : ''].filter(Boolean).join(' ')}
              onClick={onNavigate}
            >
              <span className={styles.mobileLinkIcon}>{link.icon}</span>
              <span className={styles.mobileLinkLabel}>{link.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}

export default Sidebar
