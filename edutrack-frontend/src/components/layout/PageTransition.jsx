import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PageTransition = ({ children }) => {
  const location = useLocation()
  const [display, setDisplay] = useState(children)
  const [phase, setPhase] = useState('enter')
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (location.pathname === prevPath.current) return
    prevPath.current = location.pathname

    setPhase('exit')
    const timer = setTimeout(() => {
      setDisplay(children)
      setPhase('enter')
    }, 150)

    return () => clearTimeout(timer)
  }, [location.pathname, children])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setDisplay(children); setPhase('enter') }, [children])

  const style = {
    transition: 'opacity 0.15s ease, transform 0.15s ease',
    opacity: phase === 'enter' ? 1 : 0,
    transform: phase === 'enter' ? 'translateY(0)' : 'translateY(8px)',
  }

  return <div style={style}>{display}</div>
}

export default PageTransition
