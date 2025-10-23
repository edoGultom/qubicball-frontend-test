import { Post } from "@/types/user.type";

const baseUrl =
    typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        : "";

export async function getPosts(): Promise<Post[]> {
    const res = await fetch(`${baseUrl}/api/posts`, {
        next: { revalidate: 60 }, // cache 60 detik
    });

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }

    return res.json();
}