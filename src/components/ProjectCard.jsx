import { Link } from 'react-router-dom'
import Image from './Image'
import StatusBadge from './StatusBadge'

/**
 * Project card. `large` gives it a taller cover for the featured row.
 * The whole card is one link — the tags are decoration, not targets.
 */
export default function ProjectCard({ project, large = false }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="card group block overflow-hidden focus-visible:outline-none"
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04]">
          <Image src={project.cover} alt="" ratio={large ? 'aspect-[16/10]' : 'aspect-[16/9]'} />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="meta ml-auto">{project.year}</span>
        </div>

        <h3 className={`font-semibold tracking-tight ${large ? 'text-2xl' : 'text-lg'}`}>
          {project.title}
        </h3>

        <p className="mt-2 text-[14px] leading-relaxed text-soft">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Read the case study
          <span className="transition-transform duration-500 ease-smooth group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}
