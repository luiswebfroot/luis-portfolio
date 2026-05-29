'use client'

import { useState } from 'react'

const SKILLS = ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS']
const FORMSPREE_URL = 'https://formspree.io/f/maqkvaap'

const PARTICLES = [
  { left: '5%',  size: 3, duration: 6,   delay: 0,   dx: '8px'  },
  { left: '12%', size: 2, duration: 8,   delay: 1.5, dx: '-6px' },
  { left: '20%', size: 4, duration: 7,   delay: 0.5, dx: '12px' },
  { left: '28%', size: 2, duration: 9,   delay: 3,   dx: '-10px'},
  { left: '36%', size: 5, duration: 6.5, delay: 1,   dx: '6px'  },
  { left: '44%', size: 3, duration: 8.5, delay: 2,   dx: '-8px' },
  { left: '52%', size: 2, duration: 7.5, delay: 0.8, dx: '10px' },
  { left: '60%', size: 4, duration: 6,   delay: 2.5, dx: '-5px' },
  { left: '68%', size: 3, duration: 9,   delay: 0.3, dx: '8px'  },
  { left: '75%', size: 2, duration: 7,   delay: 1.8, dx: '-12px'},
  { left: '82%', size: 4, duration: 8,   delay: 0.7, dx: '6px'  },
  { left: '90%', size: 3, duration: 6.5, delay: 1.2, dx: '-8px' },
  { left: '95%', size: 2, duration: 7.5, delay: 3.5, dx: '10px' },
  { left: '15%', size: 5, duration: 9.5, delay: 4,   dx: '-6px' },
  { left: '55%', size: 2, duration: 5.5, delay: 2.2, dx: '14px' },
  { left: '40%', size: 3, duration: 8,   delay: 3.8, dx: '-9px' },
]

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function Page() {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setFormState(res.ok ? 'sent' : 'error')
    } catch {
      setFormState('error')
    }
  }

  function closeModal() {
    setOpen(false)
    setFormState('idle')
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-6 overflow-hidden">
      {/* Rising particles */}
      <div className="fixed inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--dx': p.dx,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="bg-white/[0.13] backdrop-blur-xl border border-white/25 rounded-3xl p-12 w-full max-w-lg shadow-2xl">

        <h1 className="text-5xl font-extrabold text-white tracking-tight leading-none mb-1">
          Luis Fu
        </h1>
        <p className="text-sm font-medium text-white/70 uppercase tracking-[0.2em] mb-1">
          Software Developer
        </p>
        <p className="text-sm text-white/50 mb-7">
          📍 Auckland, New Zealand
        </p>

        <div className="h-px bg-white/20 mb-6" aria-hidden="true" />

        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.15em] mb-2">
          About
        </p>
        <p className="text-[15px] text-white/85 leading-relaxed mb-7">
          I build robust web applications and APIs. Passionate about clean code,
          great developer experience, and shipping things that actually work.
        </p>

        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.15em] mb-3">
          Skills
        </p>
        <ul className="flex flex-wrap gap-2 mb-7" aria-label="Skills">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="bg-white/[0.18] border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium text-white"
            >
              {skill}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-white text-[#764ba2] text-sm font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
        >
          💬 Get in touch
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            {formState === 'sent' ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Message sent!</h2>
                <p className="text-gray-500 mb-6">Thanks for reaching out — I'll get back to you soon.</p>
                <button
                  onClick={closeModal}
                  className="bg-[#764ba2] text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Get in touch</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#764ba2]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#764ba2]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Phone <span className="text-gray-300">(optional)</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+64 21 123 456"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#764ba2]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="How can I help?"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#764ba2]/40 resize-none"
                    />
                  </div>

                  {formState === 'error' && (
                    <p className="text-red-500 text-sm">Something went wrong — please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {formState === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
