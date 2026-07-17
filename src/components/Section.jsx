import Reveal from './Reveal'

/** Section header: an eyebrow that says what this is, a title, an optional lede. */
export default function Section({ eyebrow, title, lede, action, children, className = '' }) {
  return (
    <section className={`container-page py-20 md:py-28 ${className}`}>
      <Reveal>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h2 className="text-title font-semibold">{title}</h2>
            {lede && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-soft">{lede}</p>}
          </div>
          {action}
        </div>
      </Reveal>
      {children}
    </section>
  )
}
