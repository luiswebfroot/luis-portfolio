const SKILLS = ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS']

export default function Page() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-6">
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

        <a
          href="mailto:webfroot@hotmail.com"
          className="inline-flex items-center gap-2 bg-white text-[#764ba2] text-sm font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-150"
        >
          ✉ Get in touch
        </a>

      </div>
    </main>
  )
}
