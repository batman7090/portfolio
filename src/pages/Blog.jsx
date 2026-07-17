import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import PostCard from '../components/PostCard'
import TagFilter from '../components/TagFilter'
import { sortedPosts, postTags } from '../content'

export default function Blog() {
  const [tag, setTag] = useState('All')
  const tags = useMemo(() => postTags(), [])
  const all = useMemo(() => sortedPosts(), [])
  const shown = useMemo(
    () => (tag === 'All' ? all : all.filter((p) => p.tags.includes(tag))),
    [tag, all]
  )

  return (
    <div className="container-page pb-16 pt-32 md:pt-40">
      <Reveal>
        <p className="eyebrow">Writing</p>
        <h1 className="mt-3 text-title font-semibold">Notes from the build.</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-soft">
          Long-form posts on retrieval, fine-tuning, agents and the unglamorous infrastructure
          underneath. Written for engineers, not for the algorithm.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10">
          <TagFilter tags={tags} active={tag} onChange={setTag} />
        </div>
      </Reveal>

      <motion.div layout className="mt-10 grid gap-6">
        <AnimatePresence mode="popLayout">
          {shown.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <div className="card mt-10 p-16 text-center">
          <p className="text-lg font-semibold tracking-tight">No posts tagged “{tag}” yet.</p>
          <button onClick={() => setTag('All')} className="btn btn-ghost mt-6">
            Show all posts
          </button>
        </div>
      )}
    </div>
  )
}
