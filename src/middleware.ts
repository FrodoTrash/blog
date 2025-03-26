import { NextResponse } from 'next/server';

export async function middleware(request: Request) {
  const user = false;
  if (!user) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
