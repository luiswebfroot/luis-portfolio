import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE = 'downloads_session'
const LOGIN_PATH = '/downloads/login'

async function isValidSession(value: string, secret: string): Promise<boolean> {
  const parts = value.split(':')
  if (parts.length !== 2) return false

  const [expiryStr, sigHex] = parts
  const expiry = parseInt(expiryStr, 10)
  if (isNaN(expiry) || Date.now() > expiry) return false

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  const sigBytes = new Uint8Array(sigHex.match(/.{2}/g)!.map((b) => parseInt(b, 16)))
  return crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(expiryStr))
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === LOGIN_PATH) return NextResponse.next()

  const cookie = req.cookies.get(SESSION_COOKIE)?.value
  const secret = process.env.DOWNLOADS_PASS ?? ''

  if (cookie && (await isValidSession(cookie, secret))) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(LOGIN_PATH, req.url))
}

export const config = {
  matcher: '/downloads/:path*',
}
