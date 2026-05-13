import styles from './Badge.module.css'

const ProgressBar = ({
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

export default ProgressBar
