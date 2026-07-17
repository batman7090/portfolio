import { projects } from './projects'
import { posts } from './posts'
import { courses } from './courses'
import { skillGroups } from './skills'

export { projects, posts, courses, skillGroups }

/* ---------- helpers: content stays dumb, logic lives here ---------- */

export const sortedPosts = () => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

export const featuredProjects = () => {
  const picked = projects.filter((p) => p.featured)
  return picked.length ? picked : projects.slice(0, 3)
}

export const getProject = (slug) => projects.find((p) => p.slug === slug)
export const getPost = (slug) => posts.find((p) => p.slug === slug)

/** Unique tags, most used first — the filter bar orders itself. */
export const projectTags = () => {
  const counts = new Map()
  projects.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)))
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag)
}

export const postTags = () => [...new Set(posts.flatMap((p) => p.tags))]

/** '2025-01-28' -> '28 January 2025' */
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

/** '2024-02' -> 'February 2024' */
export const formatMonth = (iso) =>
  new Date(`${iso}-01`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

/**
 * A post that lives only on Medium (no `body` here) should link straight out
 * rather than open an empty page on this site.
 */
export const isExternalOnly = (post) => Boolean(post.external?.url) && !post.body?.length
