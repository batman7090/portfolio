import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Image from '../components/Image'
import Reveal from '../components/Reveal'
import PostCard from '../components/PostCard'
import NotFound from './NotFound'
import { getPost, sortedPosts, formatDate } from '../content'
import { site } from '../config/site'

/** A hairline progress bar — the only chrome on the reading page. */
function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

/**
 * Renders one block of a post body.
 * Add a case here and that block type is instantly available in posts.js.
 */
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>

    case 'ul':
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    case 'code':
      return (
        <pre>
          <code>{block.code}</code>
        </pre>
      )

    case 'quote':
      return (
        <blockquote className="my-10 border-l-2 border-accent pl-6 font-serif text-[22px] italic leading-relaxed">
          {block.text}
        </blockquote>
      )

    case 'image':
      // `wide: true` lets the image break out past the text column on desktop.
      return (
        <figure className={block.wide ? 'wide' : undefined}>
          <img src={block.src} alt={block.alt || ''} loading="lazy" decoding="async" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      )

    default:
      return <p>{block.text}</p>
  }
}

export default function PostDetail() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <NotFound />

  const more = sortedPosts().filter((p) => p.slug !== slug).slice(0, 2)
  const hasBody = Boolean(post.body?.length)

  return (
    <>
      <ReadingProgress />

      <article className="pb-8 pt-32 md:pt-40">
        <div className="container-page">
          <Reveal>
            <Link to="/blog" className="meta transition-colors duration-300 hover:text-ink">
              ← All writing
            </Link>

            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>

            <h1 className="mt-5 max-w-3xl text-title font-semibold">{post.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="meta">{site.name}</span>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span className="meta">{formatDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span className="meta">{post.readTime} read</span>
            </div>

            {/* Also published elsewhere — say so, up front. */}
            {post.external?.url && (
              <a href={post.external.url} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6">
                Read it on {post.external.platform} ↗
              </a>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="container-page mt-12">
            <div className="overflow-hidden rounded-card border border-line shadow-[var(--shadow-lift)]">
              <Image src={post.cover} alt="" ratio="aspect-[16/7]" />
            </div>
          </div>
        </Reveal>

        <div className="container-page mt-16">
          <Reveal>
            <div className="prose-post mx-auto max-w-prose">
              {hasBody ? (
                post.body.map((block, i) => <Block key={i} block={block} />)
              ) : (
                <>
                  <p>{post.excerpt}</p>
                  <div className="card p-6">
                    <p className="text-sm font-medium">This one is still being written.</p>
                    <p className="mt-1.5 text-sm text-soft">
                      Add a <code className="font-mono text-[12px]">body</code> array to this post in{' '}
                      <code className="font-mono text-[12px]">src/content/posts.js</code> to publish it here — or add an{' '}
                      <code className="font-mono text-[12px]">external</code> link and the card will send readers
                      straight to Medium instead.
                    </p>
                  </div>
                </>
              )}
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-16 max-w-prose border-t border-line pt-8">
              {post.external?.url ? (
                <p className="text-sm text-soft">
                  This post is also on{' '}
                  <a href={post.external.url} target="_blank" rel="noreferrer" className="link">
                    {post.external.platform}
                  </a>
                  . If it helped — or if I got something wrong —{' '}
                  <Link to="/contact" className="link">tell me</Link>.
                </p>
              ) : (
                <p className="text-sm text-soft">
                  Written by <span className="font-medium text-ink">{site.name}</span>. If this was useful — or wrong —{' '}
                  <Link to="/contact" className="link">tell me</Link>.
                </p>
              )}
            </div>
          </Reveal>
        </div>

        {more.length > 0 && (
          <section className="container-page mt-28">
            <Reveal>
              <p className="eyebrow mb-8">Keep reading</p>
            </Reveal>
            <div className="grid gap-6">
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
