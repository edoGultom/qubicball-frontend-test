import { UserFormData } from "@/schemas/user.schema";
import { Post, User } from "@/types/user.type";

const baseUrl =
    typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        : "";
export async function getUsers(): Promise<User[]> {
    const res = await fetch(`${baseUrl}/api/users`, {
        next: { revalidate: 60 }, // cache 60 detik
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return res.json();
}

export async function getUserById(id: string): Promise<User | null> {
    try {
        const res = await fetch(`${baseUrl}/api/users/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

export async function getUserPost(userId: string): Promise<Post[]> {
    try {
        const res = await fetch(`${baseUrl}/api/users/${userId}/posts`, {
        next: { revalidate: 60 }, // cache 60 detik
        });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export async function updateUser(userId: number, userData: UserFormData): Promise<User | null> {
    try {
        const res = await fetch(`${baseUrl}/api/users/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!res.ok) throw new Error("Failed to update user");
        const result = await res.json();
        return result;
    } catch {
        return null;
    }
}
