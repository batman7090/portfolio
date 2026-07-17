import { useEffect, useRef } from 'react'
import { useTheme, useReducedMotion } from '../hooks/useTheme'

/**
 * THE SIGNATURE ELEMENT.
 *
 * An ambient projection of a vector space — points drifting in a latent
 * field, connecting to their nearest neighbours, leaning gently toward the
 * cursor. It is the one thing on this site that is loud, and it is loud about
 * the thing you actually do: embeddings and the geometry between them.
 *
 * Everything else on the page stays quiet so this can be the memorable part.
 * It reads its colours from the CSS variables, so it re-tints with the theme.
 * If the visitor asked for reduced motion, it renders one still frame.
 */
export default function EmbeddingField() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const styles = getComputedStyle(document.documentElement)
    const dot = styles.getPropertyValue('--field').trim()
    const accent = styles.getPropertyValue('--accent').trim()

    let width = 0
    let height = 0
    let raf = 0
    const pointer = { x: -9999, y: -9999 }

    // Phones get a lighter field: the link pass is O(n^2), so halving the
    // point count quarters the work. It still reads as the same object.
    const small = window.innerWidth < 768
    const COUNT = small ? 34 : 78
    const LINK_DIST = small ? 104 : 132
    const points = []

    const seed = () => {
      points.length = 0
      for (let i = 0; i < COUNT; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.6 + 0.9,
          // a handful of points are "anchors" — brighter, in the accent colour
          anchor: Math.random() > 0.86,
        })
      }
    }

    let resizeTimer = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // links first, so points sit on top of them
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            ctx.globalAlpha = (1 - d / LINK_DIST) * 0.16
            ctx.strokeStyle = points[i].anchor || points[j].anchor ? accent : dot
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of points) {
        ctx.globalAlpha = p.anchor ? 0.9 : 0.42
        ctx.fillStyle = p.anchor ? accent : dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.anchor ? p.r * 1.6 : p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const step = () => {
      for (const p of points) {
        p.x += p.vx
        p.y += p.vy

        // gentle attraction to the cursor — the field leans, it doesn't lunge
        const dx = pointer.x - p.x
        const dy = pointer.y - p.y
        const d = Math.hypot(dx, dy)
        if (d < 170 && d > 0.1) {
          const pull = ((170 - d) / 170) * 0.014
          p.x += dx * pull
          p.y += dy * pull
        }

        // wrap around the edges so the field feels infinite
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    // Touch devices have no hovering cursor — don't chase finger drags.
    const coarse = window.matchMedia('(pointer: coarse)').matches

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }

    resize()
    window.addEventListener('resize', onResize)
    if (!coarse) {
      window.addEventListener('pointermove', onPointer)
      window.addEventListener('pointerleave', onLeave)
    }

    if (reduced) draw()
    else raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerleave', onLeave)
      clearTimeout(resizeTimer)
    }
  }, [theme, reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        // fades out toward the bottom so the text below never fights it
        maskImage: 'radial-gradient(70% 70% at 60% 40%, #000 45%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(70% 70% at 60% 40%, #000 45%, transparent 100%)',
      }}
    />
  )
}
