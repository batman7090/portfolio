import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** New route, new page — start at the top, like a real site. */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}
