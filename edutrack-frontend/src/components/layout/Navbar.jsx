



import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import styles from './Navbar.module.css'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
)

const Logo = () => (
  <Link to="/" className={styles.logo}>
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="var(--accent)"/>
      <path d="M7 10C7 9.44772 7.44772 9 8 9H16C16.5523 9 17 9.44772 17 10V22C17 22.5523 16.5523 23 16 23H8C7.44772 23 7 22.5523 7 22V10Z" fill="white" fillOpacity="0.9"/>
      <path d="M17 11.5C17 11.5 19 10.5 24 11V23C19 22.5 17 23 17 23V11.5Z" fill="white" fillOpacity="0.6"/>
      <path d="M9 13H15M9 15.5H15M9 18H13" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
    <span className={styles.logoText}>
      Edu<span className={styles.logoAccent}>Track</span>
    </span>
  </Link>
)

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
    setUserMenuOpen(false)
  }

  const navLinks = [
    { to: '/cursos', label: 'Catálogo' },
    ...(isAuthenticated && !isAdmin
      ? [{ to: '/dashboard', label: 'Mi aprendizaje' }]
      : []),
    ...(isAdmin
      ? [{ to: '/admin', label: 'Panel admin' }]
      : []),
  ]

  return (
    <header className={[styles.navbar, scrolled ? styles.scrolled : ''].join(' ')}>
      <div className={styles.inner}>
        <Logo />

        {}
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {}
        <div className={styles.actions}>
          {}
          <button
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <button
                className={styles.avatar}
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
                aria-label="Menú de usuario"
              >
                <span className={styles.avatarInitial}>
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className={styles.menuBackdrop}
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className={styles.dropdown}>
                    <div className={styles.dropdownHeader}>
                      <p className={styles.dropdownName}>{user?.name}</p>
                      <p className={styles.dropdownEmail}>{user?.email}</p>
                    </div>
                    <div className={styles.dropdownDivider} />
                    {!isAdmin && (
                      <Link
                        to="/dashboard"
                        className={styles.dropdownItem}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Mi aprendizaje
                      </Link>
                    )}
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className={styles.dropdownItem}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Panel admin
                      </Link>
                    )}
                    <div className={styles.dropdownDivider} />
                    <button
                      className={[styles.dropdownItem, styles.dropdownItemDanger].join(' ')}
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/login" className={styles.loginLink}>
                Ingresar
              </Link>
              <Link to="/register" className={styles.registerBtn}>
                Registrarse
              </Link>
            </div>
          )}

          {!isAuthenticated && (
            <div className={styles.mobileAuth}>
              <Link to="/login" className={styles.mobileLoginBtn}>
                Ingresar
              </Link>
              <Link to="/register" className={styles.mobileRegisterBtn}>
                Registrarse
              </Link>
            </div>
          )}

          {}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {}
      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Navegación móvil">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [styles.mobileLink, isActive ? styles.mobileLinkActive : ''].join(' ')
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className={styles.mobileDivider} />
          {isAuthenticated ? (
            <button className={styles.mobileLogout} onClick={handleLogout}>
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link to="/login" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                Ingresar
              </Link>
              <Link to="/register" className={[styles.mobileLink, styles.mobileLinkAccent].join(' ')} onClick={() => setMenuOpen(false)}>
                Registrarse
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  )
}

export default Navbar