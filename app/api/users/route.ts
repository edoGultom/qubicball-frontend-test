import { NextResponse } from "next/server";

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

        const res = await fetch(`${baseUrl}/users`);
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { message: "Error fetching users" },
            { status: 500 }
        );
    }
}