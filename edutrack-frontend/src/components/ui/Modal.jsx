



import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'


const Modal = ({ open, onClose, title, children, size = 'md', hideClose = false }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={dialogRef}
        className={[styles.dialog, styles[size]].join(' ')}
      >
        {}
        {(title || !hideClose) && (
          <div className={styles.header}>
            {title && (
              <h3 id="modal-title" className={styles.title}>{title}</h3>
            )}
            {!hideClose && (
              <button
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Cerrar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {}
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal