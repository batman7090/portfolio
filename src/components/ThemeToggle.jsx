import { useTheme } from '../hooks/useTheme'

/** Light/dark switch. The knob slides; the icons cross-fade. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative h-8 w-[58px] rounded-full border border-line bg-elev transition-colors duration-500"
    >
      <span
        className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-accent transition-[left] duration-500 ease-smooth"
        style={{ left: dark ? '28px' : '4px' }}
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-[9px]">
        <SunIcon active={!dark} />
        <MoonIcon active={dark} />
      </span>
    </button>
  )
}

const iconStyle = (active) => ({
  opacity: active ? 0 : 0.55,
  transition: 'opacity 400ms cubic-bezier(0.22,1,0.36,1)',
})

const SunIcon = ({ active }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={iconStyle(active)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
  </svg>
)

const MoonIcon = ({ active }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle(active)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)
