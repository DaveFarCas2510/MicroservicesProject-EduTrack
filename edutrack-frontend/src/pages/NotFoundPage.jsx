import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

const NotFoundPage = () => (
  <div className={styles.page}>
    <div className={styles.inner}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.desc}>
        La página que buscas no existe, fue movida o está temporalmente fuera de servicio.
      </p>
      <div className={styles.actions}>
        <Link to="/" className={styles.btnPrimary}>Volver al inicio</Link>
        <Link to="/cursos" className={styles.btnGhost}>Ver catálogo</Link>
      </div>
    </div>
    <div className={styles.shape1} />
    <div className={styles.shape2} />
    <div className={styles.shape3} />
  </div>
)

export default NotFoundPage
