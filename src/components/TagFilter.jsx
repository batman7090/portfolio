/** Pill filter bar. Controlled — the page owns the state. */
export default function TagFilter({ tags, active, onChange, allLabel = 'All' }) {
  const options = [allLabel, ...tags]

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
      {options.map((tag) => {
        const selected = active === tag
        return (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            aria-pressed={selected}
            className="rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-300 ease-smooth"
            style={{
              background: selected ? 'var(--accent)' : 'transparent',
              color: selected ? 'var(--accent-ink)' : 'var(--ink-soft)',
              borderColor: selected ? 'var(--accent)' : 'var(--line)',
            }}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
