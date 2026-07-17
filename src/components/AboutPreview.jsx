import { Link } from 'react-router-dom'
import Image from './Image'
import Reveal from './Reveal'
import { site, about } from '../config/site'

/**
 * A short "who I am" strip for the home page. The full story lives at /about;
 * this is just enough to make a visitor want to click through.
 */
export default function AboutPreview() {
  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <div className="grid items-center gap-10 md:grid-cols-[260px_1fr] md:gap-14">
          <div className="mx-auto w-48 overflow-hidden rounded-full border border-line shadow-[var(--shadow-lift)] md:mx-0 md:w-56">
            <Image src={about.photo} alt={about.photoAlt} ratio="aspect-square" />
          </div>

          <div>
            <p className="eyebrow">Who I am</p>
            <h2 className="mt-3 text-title font-semibold">A bit about me.</h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-soft">
              {site.aboutTeaser}
            </p>
            <Link to="/about" className="link mt-6 inline-block text-sm font-medium">
              Read my story ↗
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
