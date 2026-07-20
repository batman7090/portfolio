import { useState } from 'react'
import Reveal from '../components/Reveal'
import { site } from '../config/site'

// Read from .env (see .env.example). Never hard-code keys in a public repo.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Ada Lovelace' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'ada@example.com' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'A retrieval system that keeps hallucinating' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!configured) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
        }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="container-page pb-16 pt-32 md:pt-40">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-title font-semibold">Tell me where your idea is stuck.</h1>
      </Reveal>

      <div className="mt-14 grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
        {/* ---- left: the human bit ---- */}
        <Reveal>
          <p className="max-w-sm text-[15px] leading-relaxed text-soft">
            A role, a concept that needs proving out, a prototype that will not survive real users, or a
            research idea looking for a first build all welcome. I read everything and reply within a couple of days
          </p>

          <div className="mt-10 space-y-1">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center justify-between border-b border-line py-4"
            >
              <div>
                <p className="meta">Email</p>
                <p className="mt-1 text-sm">{site.email}</p>
              </div>
              <span className="text-soft transition-transform duration-500 ease-smooth group-hover:translate-x-1 group-hover:text-accent">
                ↗
              </span>
            </a>

            {site.socials.map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-line py-4"
              >
                <div>
                  <p className="meta">{label}</p>
                  <p className="mt-1 text-sm">{url.replace('https://', '')}</p>
                </div>
                <span className="text-soft transition-transform duration-500 ease-smooth group-hover:translate-x-1 group-hover:text-accent">
                  ↗
                </span>
              </a>
            ))}
          </div>

          {site.available && (
            <div className="card mt-10 p-6">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-sm font-medium">Available for work</span>
              </span>
              <p className="mt-2 text-[13px] leading-relaxed text-soft">{site.availableNote}</p>
            </div>
          )}
        </Reveal>

        {/* ---- right: the form ---- */}
        <Reveal delay={0.08}>
          <form onSubmit={submit} className="card p-7 md:p-9">
            <div className="grid gap-5">
              {FIELDS.map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label htmlFor={name} className="eyebrow mb-2 block">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={update}
                    placeholder={placeholder}
                    required
                    className="field"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="eyebrow mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={update}
                  placeholder="What are you working on, and where is it stuck?"
                  required
                  className="field resize-y"
                />
              </div>

              <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full justify-center">
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'sent' && (
                <p className="rounded-xl border border-line px-4 py-3 text-sm" style={{ color: 'var(--accent)' }}>
                  Message sent. I'll get back to you shortly.
                </p>
              )}

              {status === 'error' && (
                <p className="rounded-xl border border-line px-4 py-3 text-sm text-soft">
                  {configured ? (
                    <>
                      The message didn't send. Email me directly at{' '}
                      <a href={`mailto:${site.email}`} className="link">{site.email}</a>.
                    </>
                  ) : (
                    <>
                      The form isn't connected yet. Add your EmailJS keys to <code className="font-mono text-[12px]">.env</code> (see{' '}
                      <code className="font-mono text-[12px]">.env.example</code>), or email{' '}
                      <a href={`mailto:${site.email}`} className="link">{site.email}</a>.
                    </>
                  )}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
