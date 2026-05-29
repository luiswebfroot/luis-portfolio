interface LoginPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-white text-2xl font-semibold tracking-tight mb-1">Downloads</h1>
          <p className="text-white/40 text-sm">Sign in to access files</p>
        </div>

        <form method="POST" action="/api/downloads/login" className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white/60 text-xs font-medium uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">
              Incorrect username or password.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold text-sm rounded-lg py-3 mt-2 hover:bg-white/90 transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-white/20 text-xs text-center mt-6">
          Session expires after 1 hour
        </p>
      </div>
    </main>
  )
}
