/** One badge, three states. Colour carries meaning, nothing else. */
const TONE = {
  Shipped:       { dot: 'var(--accent)',   label: 'Shipped' },
  'In progress': { dot: '#f0a92e',         label: 'In progress' },
  Research:      { dot: '#3aa6a0',         label: 'Research' },
}

export default function StatusBadge({ status }) {
  const tone = TONE[status] || TONE.Shipped
  return (
    <span className="chip gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.dot }} />
      {tone.label}
    </span>
  )
}
