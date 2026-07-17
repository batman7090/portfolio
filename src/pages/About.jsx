import { Link } from 'react-router-dom'
import Image from '../components/Image'
import Reveal from '../components/Reveal'
import { site, about } from '../config/site'

export default function About() {
  return (
    <div className="container-page pb-16 pt-32 md:pt-40">
      {/* ---------- Header: photo + lede, side by side ---------- */}
      <div className="grid items-center gap-12 md:grid-cols-[280px_1fr] md:gap-16">
        <Reveal>
          <div className="mx-auto w-56 overflow-hidden rounded-full border border-line shadow-[var(--shadow-lift)] md:mx-0 md:w-full">
            <Image src={about.photo} alt={about.photoAlt} ratio="aspect-square" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col justify-center">
            <p className="eyebrow">About</p>
            <h1 className="mt-3 text-title font-semibold">{site.name}</h1>
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-soft">{about.lede}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.resume} className="btn btn-primary">Résumé ↗</a>
              <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---------- Body: story + facts sidebar ---------- */}
      <div className="mt-20 grid gap-14 md:grid-cols-[1fr_260px] md:mt-28">
        <div>
          {about.story.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.05}>
              <section className="mb-12">
                <h2 className="text-lg font-semibold tracking-tight">{section.heading}</h2>
                <p className="mt-3 max-w-prose text-[16px] leading-relaxed text-soft">
                  {section.text}
                </p>
              </section>
            </Reveal>
          ))}

          {/* Interests */}
          <Reveal>
            <section className="mb-12">
              <h2 className="text-lg font-semibold tracking-tight">Outside the terminal</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {about.interests.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-soft">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Long-term goal — the closing note, given weight */}
          <Reveal>
            <section className="rounded-card border border-line bg-elev p-7 shadow-[var(--shadow)] md:p-9">
              <p className="eyebrow mb-3">Where I'm headed</p>
              <p className="max-w-prose font-serif text-[21px] italic leading-relaxed">
                {about.goal}
              </p>
            </section>
          </Reveal>
        </div>

        {/* Quick facts */}
        <aside className="md:sticky md:top-28 md:self-start">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-4">At a glance</p>
            <dl className="space-y-4">
              {about.facts.map((fact) => (
                <div key={fact.label} className="border-b border-line pb-4">
                  <dt className="meta">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="eyebrow mb-3 mt-8">Elsewhere</p>
            <ul className="space-y-2.5">
              {site.socials.map(({ label, url }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-soft transition-colors duration-300 hover:text-ink"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>
    </div>
  )
}
