import { Link } from 'react-router-dom'
import Image from './Image'
import { formatDate, isExternalOnly } from '../content'

/**
 * One card, two behaviours:
 *  - a post with a `body`   → links to the post page on this site
 *  - a post with only `external` (e.g. a Medium link) → links straight out
 * A post with BOTH gets the internal page, plus a "read it on Medium" button there.
 */
export default function PostCard({ post }) {
  const outbound = isExternalOnly(post)

  const inner = (
    <>
      <div className="overflow-hidden">
        <div className="h-full transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.05]">
          <Image src={post.cover} alt="" ratio="aspect-[16/10] md:h-full md:aspect-auto" className="h-full" />
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
          {post.external && (
            <span className="chip" style={{ color: 'var(--accent)', borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)' }}>
              {post.external.platform}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold leading-snug tracking-tight md:text-[26px]">
          {post.title}
        </h3>

        <p className="mt-3 text-[14px] leading-relaxed text-soft">{post.excerpt}</p>

        <div className="mt-5 flex items-center gap-3">
          <span className="meta">{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span className="meta">{post.readTime} read</span>
          <span className="ml-auto text-sm font-medium text-accent transition-transform duration-500 ease-smooth group-hover:translate-x-1">
            {outbound ? '↗' : '→'}
          </span>
        </div>
      </div>
    </>
  )

  const className = 'card group grid overflow-hidden md:grid-cols-[300px_1fr]'

  return outbound ? (
    <a href={post.external.url} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link to={`/blog/${post.slug}`} className={className}>
      {inner}
    </Link>
  )
}
