import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/posts?userId=${params.id}`
        );

        // posts not found
        if (!res.ok) {
            return NextResponse.json(
                { message: "User Post not found" },
                { status: 404 }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
