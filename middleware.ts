import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const isAuthPage = request.nextUrl.pathname === '/login';
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')

    if (isAuthPage) {
        if (token && (await verifyToken(token))) {
            console.log(verifyToken(token), 'token')
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    if (isProtectedRoute) {
        if (!token || !verifyToken(token)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/users/:path*', '/login'],
};
