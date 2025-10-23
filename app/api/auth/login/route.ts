import { signToken } from "@/lib/jwt";
import { AuthCredentials, AuthResponse } from "@/types/auth.type";
import { NextRequest, NextResponse } from "next/server";

const MOCK_CREDENTIALS = {
    username: 'testuser',
    password: 'testpass',
};
export async function POST(request: NextRequest) {
    try {
        const body: AuthCredentials = await request.json();
        const { username, password } = body;
        if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
            // set token
            const token = await signToken({ username });
            const response: AuthResponse = {
                success: true,
                token,
            };
            const res = NextResponse.json(response);
            // store token cookies
            res.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 86400,
                path: '/',
            });
            return res;
        }
        // Invalid
        return NextResponse.json(
            { success: false, message: 'Invalid credentials' } as AuthResponse,
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, message: 'Internal server error' } as AuthResponse,
            { status: 500 }
        );
    }
}