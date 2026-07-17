import { formatMonth } from '../content'

/** Add a platform here and its badge picks up a colour automatically. */
const PLATFORM = {
  Udemy: '#a435f0',
  Coursera: '#2a73cc',
  edX: '#c2410c',
  DeepLearningAI: '#0ea5e9',
}

export default function CourseCard({ course }) {
  const colour = PLATFORM[course.platform] || 'var(--accent)'

  return (
    <div className="card flex flex-col p-6">
      <div className="mb-5 flex items-center justify-between">
        <span
          className="chip"
          style={{
            color: colour,
            borderColor: `color-mix(in srgb, ${colour} 35%, transparent)`,
            background: `color-mix(in srgb, ${colour} 8%, transparent)`,
          }}
        >
          {course.platform}
        </span>
        <span className="meta">{formatMonth(course.completed)}</span>
      </div>

      <h3 className="text-base font-semibold leading-snug tracking-tight">{course.title}</h3>
      <p className="mt-1 text-[13px] text-soft">{course.instructor}</p>

      <div className="mt-5 flex flex-1 flex-wrap items-start gap-1.5">
        {course.skills.map((skill) => (
          <span key={skill} className="chip">{skill}</span>
        ))}
      </div>

      <a
        href={course.certificateUrl}
        target="_blank"
        rel="noreferrer"
        className="link mt-6 w-fit text-sm font-medium"
      >
        View certificate ↗
      </a>
    </div>
  )
}
