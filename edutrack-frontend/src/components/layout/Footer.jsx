import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.brand}>
        <Link to="/" className={styles.logo}>
          Edu<span>Track</span>
        </Link>
        <p className={styles.tagline}>
          Plataforma de aprendizaje online
        </p>
      </div>

      <div className={styles.col}>
        <p className={styles.colTitle}>Navegación</p>
        <Link to="/cursos" className={styles.link}>Catálogo</Link>
        <Link to="/register" className={styles.link}>Registrarse</Link>
        <Link to="/login" className={styles.link}>Ingresar</Link>
      </div>

      <div className={styles.col}>
        <p className={styles.colTitle}>Legal</p>
        <span className={styles.link}>Términos</span>
        <span className={styles.link}>Privacidad</span>
      </div>
    </div>

    <div className={styles.bottom}>
      <p>&copy; {new Date().getFullYear()} EduTrack. Todos los derechos reservados.</p>
    </div>
  </footer>
)

export default Footer
