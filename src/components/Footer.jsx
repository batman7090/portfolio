import { Link } from 'react-router-dom'
import { site, nav } from '../config/site'

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="container-page grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold tracking-tight">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-soft">{site.role} — building retrieval systems, fine-tuned models and the pipelines that keep them alive.</p>
          {site.available && (
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="meta">Available for work</span>
            </span>
          )}
        </div>

        <div>
          <p className="eyebrow mb-4">Pages</p>
          <ul className="space-y-2.5">
            {[{ label: 'Home', to: '/' }, ...nav].map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-sm text-soft transition-colors duration-300 hover:text-ink">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-2.5">
            {site.socials.map(({ label, url }) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noreferrer" className="text-sm text-soft transition-colors duration-300 hover:text-ink">
                  {label} ↗
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="text-sm text-soft transition-colors duration-300 hover:text-ink">
                Email ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col items-start justify-between gap-2 border-t border-line py-6 sm:flex-row sm:items-center">
        <p className="meta">© {new Date().getFullYear()} {site.name}</p>
        <p className="meta">Built with React, Tailwind and too much coffee.</p>
      </div>
    </footer>
  )
}
