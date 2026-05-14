



import styles from './Badge.module.css'


export const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => (
  <span className={[styles.badge, styles[variant], styles[size], className].filter(Boolean).join(' ')}>
    {children}
  </span>
)

