



import styles from './Badge.module.css'


export const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => (
  <span className={[styles.badge, styles[variant], styles[size], className].filter(Boolean).join(' ')}>
    {children}
  </span>
)





export const Spinner = ({ size = 24, className = '' }) => (
  <svg
    className={['animate-spin', className].filter(Boolean).join(' ')}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Cargando..."
    role="status"
  >
    <circle
      cx="12" cy="12" r="10"
      stroke="var(--border-strong)"
      strokeWidth="3"
    />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke="var(--accent)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
)





export const ProgressBar = ({
  value = 0,
  max = 100,
  showLabel = true,
  size = 'md',
  variant = 'accent',
  className = '',
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={[styles.progressWrapper, className].filter(Boolean).join(' ')}>
      {showLabel && (
        <div className={styles.progressMeta}>
          <span className={styles.progressLabel}>Progreso</span>
          <span className={styles.progressValue}>{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className={[styles.track, styles[`track-${size}`]].join(' ')}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={[styles.fill, styles[`fill-${variant}`]].join(' ')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}