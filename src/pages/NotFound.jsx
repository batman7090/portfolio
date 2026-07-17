import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-title font-semibold">This page isn't in the index.</h1>
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-soft">
        The link is broken or the page moved. The work, the writing and the contact form are all
        still where you left them.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn btn-primary">Back home</Link>
        <Link to="/projects" className="btn btn-ghost">Browse the work</Link>
      </div>
    </div>
  )
}
