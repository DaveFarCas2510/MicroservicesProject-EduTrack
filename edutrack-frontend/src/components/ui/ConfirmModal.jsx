import Modal from './Modal'
import Button from './Button'

const ConfirmModal = ({ open, onClose, onConfirm, title, message, confirmText = 'Eliminar', loading = false, variant = 'danger' }) => (
  <Modal open={open} onClose={onClose} title={title} size="sm">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
        {message}
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant={variant === 'danger' ? 'primary' : variant}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  </Modal>
)

export default ConfirmModal
