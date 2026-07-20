import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import TagFilter from '../components/TagFilter'
import { projects, projectTags } from '../content'

export default function Projects() {
  const [tag, setTag] = useState('All')
  const tags = useMemo(() => projectTags(), [])
  const shown = useMemo(
    () => (tag === 'All' ? projects : projects.filter((p) => p.tags.includes(tag))),
    [tag]
  )

  return (
    <div className="container-page pb-16 pt-32 md:pt-40">
      <Reveal>
        <p className="eyebrow">Work</p>
        <h1 className="mt-3 text-title font-semibold">Ideas I carried all the way.</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-soft">
          Retrieval systems, agent workflows and the pipelines around them each taken from concept
          through proof of concept to something running. Open one for the architecture and what it cost to get right.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <TagFilter tags={tags.slice(0, 8)} active={tag} onChange={setTag} />
          <span className="meta">
            {shown.length} {shown.length === 1 ? 'project' : 'projects'}
          </span>
        </div>
      </Reveal>

      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <div className="card mt-10 p-16 text-center">
          <p className="text-lg font-semibold tracking-tight">Nothing tagged “{tag}” yet.</p>
          <p className="mt-2 text-sm text-soft">Try another tag, or view everything.</p>
          <button onClick={() => setTag('All')} className="btn btn-ghost mt-6">
            Show all projects
          </button>
        </div>
      )}
    </div>
  )
}
