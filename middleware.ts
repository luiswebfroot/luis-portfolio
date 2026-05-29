import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const auth = req.headers.get('authorization')

  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const [user, pass] = atob(encoded).split(':')
      if (
        user === process.env.DOWNLOADS_USER &&
        pass === process.env.DOWNLOADS_PASS
      ) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Downloads"' },
  })
}

export const config = {
  matcher: '/downloads/:path*',
}
