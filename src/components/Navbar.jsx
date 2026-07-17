import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { site, nav } from '../config/site'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  // Don't let the page scroll behind the open mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth"
        style={{
          background: scrolled ? 'var(--nav)' : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        }}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-mono text-[11px] font-medium text-accent-ink transition-transform duration-500 ease-smooth group-hover:scale-105">
              {site.initials}
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300 hover:text-ink ${
                    isActive ? 'text-ink' : 'text-soft'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{ background: 'color-mix(in srgb, var(--ink) 6%, transparent)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href={site.resume} className="btn btn-ghost hidden h-9 px-4 text-[13px] md:inline-flex">
              Résumé
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-line md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className="absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-400 ease-smooth"
                  style={{ top: open ? '5.5px' : '1px', transform: open ? 'rotate(45deg)' : 'none' }}
                />
                <span
                  className="absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-400 ease-smooth"
                  style={{ top: open ? '5.5px' : '10px', transform: open ? 'rotate(-45deg)' : 'none' }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: 'var(--nav)',
              backdropFilter: 'saturate(180%) blur(24px)',
              WebkitBackdropFilter: 'saturate(180%) blur(24px)',
            }}
          >
            <nav className="container-page flex h-full flex-col justify-center gap-2">
              {[{ label: 'Home', to: '/' }, ...nav].map(({ label, to }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block border-b border-line py-5 text-3xl font-semibold tracking-tight ${
                        isActive ? 'text-accent' : 'text-ink'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <a href={site.resume} className="btn btn-primary mt-8 w-fit">
                Download résumé
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
