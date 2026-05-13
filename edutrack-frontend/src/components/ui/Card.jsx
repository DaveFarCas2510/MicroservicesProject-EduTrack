import styles from './Card.module.css'

const Card = ({
  children,
  className = '',
  onClick,
  ...props
}) => {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      className={[
        styles.card,
        onClick ? styles.clickable : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      {...(onClick ? { type: 'button' } : {})}
      {...props}
    >
      {children}
    </Tag>
  )
}

export const CardImage = ({ src, alt = '', icon }) => {
  if (src) {
    return (
      <div className={styles.imageWrapper}>
        <img src={src} alt={alt} className={styles.image} loading="lazy" />
      </div>
    )
  }

  return (
    <div className={styles.imageWrapper}>
      <div className={styles.imagePlaceholder}>
        {icon || (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        )}
      </div>
    </div>
  )
}

export const CardBody = ({ children, className = '' }) => (
  <div className={[styles.body, className].filter(Boolean).join(' ')}>
    {children}
  </div>
)

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={[styles.title, className].filter(Boolean).join(' ')}>
    {children}
  </h3>
)

export const CardDescription = ({ children, className = '' }) => (
  <p className={[styles.description, className].filter(Boolean).join(' ')}>
    {children}
  </p>
)

export const CardFooter = ({ children, className = '' }) => (
  <div className={[styles.footer, className].filter(Boolean).join(' ')}>
    {children}
  </div>
)

export default Card
