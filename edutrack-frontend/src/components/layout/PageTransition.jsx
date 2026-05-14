import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PageTransition = ({ children }) => {
  const location = useLocation()
  const [display, setDisplay] = useState(children)
  const [phase, setPhase] = useState('enter')
  const prevPath = useRef(location.pathname + location.search)

  useEffect(() => {
    const path = location.pathname + location.search
    if (path === prevPath.current) {
      setDisplay(children)
      return
    }
    prevPath.current = path

    setPhase('exit')
    const timer = setTimeout(() => {
      setDisplay(children)
      setPhase('enter')
    }, 150)

    return () => clearTimeout(timer)
  }, [location.pathname, location.search, children])

  const style = {
    transition: 'opacity 0.15s ease, transform 0.15s ease',
    opacity: phase === 'enter' ? 1 : 0,
    transform: phase === 'enter' ? 'translateY(0)' : 'translateY(8px)',
  }

  return <div style={style}>{display}</div>
}

export default PageTransition
