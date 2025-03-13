import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const token = cookies().get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!payload || !payload.id) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
