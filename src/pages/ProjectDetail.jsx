import { Link, useParams } from 'react-router-dom'
import Image from '../components/Image'
import Reveal from '../components/Reveal'
import StatusBadge from '../components/StatusBadge'
import ProjectCard from '../components/ProjectCard'
import NotFound from './NotFound'
import { getProject, projects } from '../content'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <NotFound />

  const others = projects.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <article className="pb-8 pt-32 md:pt-40">
      <div className="container-page">
        <Reveal>
          <Link to="/projects" className="meta transition-colors duration-300 hover:text-ink">
            ← All projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="chip">{project.year}</span>
          </div>

          <h1 className="mt-5 max-w-3xl text-title font-semibold">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-soft">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.demo && project.demo !== '#' && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                Open live demo ↗
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                View source ↗
              </a>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <div className="container-page mt-14">
          <div className="overflow-hidden rounded-card border border-line shadow-[var(--shadow-lift)]">
            <Image src={project.cover} alt={project.title} ratio="aspect-[16/8]" />
          </div>
        </div>
      </Reveal>

      <div className="container-page mt-16 grid gap-14 md:grid-cols-[1fr_260px]">
        <div>
          {project.metrics?.length > 0 && (
            <Reveal>
              <div className="mb-12 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-3xl font-semibold tracking-tight text-accent">{m.value}</p>
                    <p className="meta mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <div className="prose-post max-w-prose">
              {project.body?.length ? (
                project.body.map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>
                  A full write-up of this project is on the way. In the meantime the source is on
                  GitHub, and I am always happy to walk through the architecture.
                </p>
              )}
            </div>
          </Reveal>
        </div>

        <aside className="md:sticky md:top-28 md:self-start">
          <Reveal delay={0.1}>
            <p className="eyebrow mb-4">Stack</p>
            <ul className="space-y-2.5">
              {(project.stack || project.tags).map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-soft">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="container-page mt-28">
          <Reveal>
            <p className="eyebrow mb-8">Next up</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
