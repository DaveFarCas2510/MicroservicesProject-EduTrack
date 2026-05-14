




import { useCallback, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { ToastContext } from '@/context/ToastContext'
import styles from './Toast.module.css'


const ICONS = {
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
}


let nextId = 0

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload]
    case 'REMOVE':
      return state.filter((t) => t.id !== action.payload)
    default:
      return state
  }
}


export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, [])

  const toast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++nextId
    dispatch({ type: 'ADD', payload: { id, message, type } })
    setTimeout(() => dispatch({ type: 'REMOVE', payload: id }), duration)
    return id
  }, [])

  const dismiss = useCallback((id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }, [])

  const success = useCallback((msg, dur) => toast(msg, 'success', dur), [toast])
  const error   = useCallback((msg, dur) => toast(msg, 'error', dur), [toast])
  const warning = useCallback((msg, dur) => toast(msg, 'warning', dur), [toast])
  const info    = useCallback((msg, dur) => toast(msg, 'info', dur), [toast])

  return (
    <ToastContext.Provider value={{ toast, dismiss, success, error, warning, info }}>
      {children}
      {createPortal(
        <div className={styles.container} aria-live="polite" aria-atomic="false">
          {toasts.map((t) => (
            <div key={t.id} className={[styles.toast, styles[t.type]].join(' ')}>
              <span className={styles.toastIcon}>{ICONS[t.type]}</span>
              <span className={styles.toastMessage}>{t.message}</span>
              <button
                className={styles.toastClose}
                onClick={() => dismiss(t.id)}
                aria-label="Cerrar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}