import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import styles from './Auth.module.css'

const RegisterPage = () => {
  const { register, isAuthenticated, error } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState(null)

  if (isAuthenticated) {
    navigate('/cursos', { replace: true })
    return null
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setLocalError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setLocalError('Todos los campos son obligatorios')
      return
    }
    if (form.password.length < 6) {
      setLocalError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (form.password !== form.confirmPassword) {
      setLocalError('Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    setLocalError(null)
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      navigate('/cursos', { replace: true })
    } catch (err) {
      setLocalError(err.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Crear cuenta</h1>
          <p className={styles.subtitle}>Únete a EduTrack y comienza a aprender</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {(localError || error) && (
            <div className={styles.errorBox}>
              {localError || error}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>Nombre completo</label>
            <input
              id="name"
              name="name"
              type="text"
              className={styles.input}
              placeholder="David Farfán"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirmar contraseña</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={styles.input}
              placeholder="Repite tu contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <Button type="submit" fullWidth loading={loading} size="lg">
            Crear cuenta
          </Button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className={styles.link}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
