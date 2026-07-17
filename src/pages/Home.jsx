import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import EmbeddingField from '../components/EmbeddingField'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import PostCard from '../components/PostCard'
import AboutPreview from '../components/AboutPreview'
import { site } from '../config/site'
import { featuredProjects, sortedPosts, skillGroups } from '../content'

/** Rotating role, typed one character at a time. */
function useTypedRole(roles) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const word = roles[index]
    if (typing) {
      if (text.length < word.length) {
        const t = setTimeout(() => setText(word.slice(0, text.length + 1)), 65)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setTyping(false), 2000)
      return () => clearTimeout(t)
    }
    if (text.length > 0) {
      const t = setTimeout(() => setText(word.slice(0, text.length - 1)), 30)
      return () => clearTimeout(t)
    }
    setIndex((i) => (i + 1) % roles.length)
    setTyping(true)
  }, [text, typing, index, roles])

  return text
}

export default function Home() {
  const typed = useTypedRole(site.roles)
  const featured = featuredProjects()
  const latest = sortedPosts().slice(0, 2)

  const rise = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[92vh] min-h-[92dvh] items-center overflow-hidden">
        <EmbeddingField />

        <div className="container-page relative z-10 pt-24">
          <motion.p {...rise(0.05)} className="eyebrow">
            {site.role} · Available for work
          </motion.p>

          <motion.h1 {...rise(0.12)} className="mt-6 text-display font-semibold">
            Models are easy.
            <br />
            <span className="text-soft">Systems are the job.</span>
          </motion.h1>

          <motion.p {...rise(0.22)} className="mt-8 max-w-xl text-[17px] leading-relaxed text-soft">
            {site.intro}
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-6 flex h-6 items-center gap-2">
            <span className="meta">currently:</span>
            <span className="font-mono text-[13px] text-accent">
              {typed}
              <span className="ml-0.5 inline-block animate-pulse">▍</span>
            </span>
          </motion.div>

          <motion.div {...rise(0.38)} className="mt-10 flex flex-wrap gap-3">
            <Link to="/projects" className="btn btn-primary">
              See the work
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Start a conversation
            </Link>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute inset-x-0 bottom-8 flex justify-center"
        >
          <span className="meta flex items-center gap-2">
            <span className="h-8 w-px bg-line" />
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ---------------- About preview ---------------- */}
      <AboutPreview />

      {/* ---------------- Featured work ---------------- */}
      <Section
        eyebrow="Selected work"
        title="Three systems, end to end."
        lede="Each one shipped with evaluation, monitoring, and a story about what broke first."
        action={
          <Link to="/projects" className="link text-sm font-medium">
            All projects ↗
          </Link>
        }
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 3).map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Skills ---------------- */}
      <Section
        eyebrow="Toolkit"
        title="What I reach for."
        lede="Grouped by the job it does, not by the logo on the box."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06}>
              <div className="card h-full p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
                  <span className="meta">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-1.5 text-[13px] text-soft">{group.note}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Writing ---------------- */}
      <Section
        eyebrow="Writing"
        title="Notes from the build."
        lede="What I learned the expensive way, written down so you don't have to."
        action={
          <Link to="/blog" className="link text-sm font-medium">
            All posts ↗
          </Link>
        }
      >
        <div className="grid gap-6">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="container-page pb-8">
        <Reveal>
          <div className="card overflow-hidden p-10 text-center md:p-20">
            <p className="eyebrow">Next</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-title font-semibold">
              Got a model that works in a notebook and nowhere else?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-soft">
              That is usually where I come in. Tell me what you are building.
            </p>
            <Link to="/contact" className="btn btn-primary mt-8">
              Get in touch
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
