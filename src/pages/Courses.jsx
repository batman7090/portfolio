import { useMemo } from 'react'
import Reveal from '../components/Reveal'
import CourseCard from '../components/CourseCard'
import { courses } from '../content'

export default function Courses() {
  const stats = useMemo(() => {
    const platforms = new Set(courses.map((c) => c.platform))
    const skills = new Set(courses.flatMap((c) => c.skills))
    return [
      { value: courses.length, label: 'Certificates earned' },
      { value: platforms.size, label: 'Platforms' },
      { value: skills.size, label: 'Distinct skills' },
    ]
  }, [])

  const sorted = useMemo(
    () => [...courses].sort((a, b) => b.completed.localeCompare(a.completed)),
    []
  )

  return (
    <div className="container-page pb-16 pt-32 md:pt-40">
      <Reveal>
        <p className="eyebrow">Learning</p>
        <h1 className="mt-3 text-title font-semibold">Still a student, on purpose.</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-soft">
          The field rewrites itself every six months, and shipping products means learning across the
          whole stack maths, models, and the infrastructure that carries them. Most recent first.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 grid gap-8 border-y border-line py-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-semibold tracking-tight text-accent">{s.value}</p>
              <p className="meta mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((course, i) => (
          <Reveal key={course.id} delay={(i % 3) * 0.06}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
