import { NextRequest, NextResponse } from 'next/server'

async function createSessionToken(secret: string, minutes: number): Promise<string> {
  const expiry = Date.now() + minutes * 60 * 1000

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(String(expiry)))
  const sigHex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return `${expiry}:${sigHex}`
}

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const username = data.get('username') as string
  const password = data.get('password') as string

  const validUser = process.env.DOWNLOADS_USER ?? ''
  const validPass = process.env.DOWNLOADS_PASS ?? ''
  const sessionMinutes = parseInt(process.env.DOWNLOADS_SESSION_MINUTES ?? '15', 10)

  if (username === validUser && password === validPass) {
    const token = await createSessionToken(validPass, sessionMinutes)
    const res = NextResponse.redirect(new URL('/downloads', req.url))
    res.cookies.set('downloads_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: sessionMinutes * 60,
      path: '/downloads',
    })
    return res
  }

  return NextResponse.redirect(new URL('/downloads/login?error=1', req.url))
}
