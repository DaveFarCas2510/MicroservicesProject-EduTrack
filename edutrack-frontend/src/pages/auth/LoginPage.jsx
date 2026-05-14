import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import styles from './Auth.module.css'

const LoginPage = () => {
  const { login, isAuthenticated, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/cursos'

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState(null)

  if (isAuthenticated) {
    navigate(from, { replace: true })
    return null
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setLocalError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setLocalError('Todos los campos son obligatorios')
      return
    }
    setLoading(true)
    setLocalError(null)
    try {
      await login(form)
      navigate(from, { replace: true })
    } catch (err) {
      setLocalError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Bienvenido de vuelta</h1>
          <p className={styles.subtitle}>Ingresa a tu cuenta de EduTrack</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {(localError || error) && (
            <div className={styles.errorBox}>
              {localError || error}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="tu@correo.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              className={styles.input}
              placeholder="••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" fullWidth loading={loading} size="lg">
            Iniciar sesión
          </Button>
        </form>

        <p className={styles.footer}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" className={styles.link}>Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
