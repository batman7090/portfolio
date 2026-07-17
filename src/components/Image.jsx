import { useState } from 'react'

/**
 * Lazy image with a fade-in and a graceful fallback.
 * If a cover URL 404s, the card still looks intentional instead of broken.
 */
export default function Image({ src, alt, className = '', ratio = 'aspect-[16/10]' }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-elev ${ratio} ${className}`}>
      {/* placeholder: a quiet gradient, not a grey box */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: loaded ? 0 : 1,
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, var(--bg-elev)), var(--bg-elev))',
        }}
      />
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-smooth will-change-transform"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'scale(1)' : 'scale(1.04)' }}
        />
      )}
    </div>
  )
}
