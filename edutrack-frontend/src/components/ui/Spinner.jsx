const Spinner = ({ size = 24, className = '' }) => (
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

export default Spinner
