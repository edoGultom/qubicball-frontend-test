"use client";

import { Post, User } from "@/types/user.type";
import { Suspense, useMemo, useState } from "react";
import PostTable from "../posts/PostsTable";
import UserTable from "../users/UserTable";
import SearchBar from "./SearchBar";

interface DashboardClientProps {
    users: User[];
    posts: Post[];
}

export default function DashboardClient({
    users,
    posts,
}: DashboardClientProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;
        const q = searchQuery.toLowerCase();
        return users.filter(
            (u) =>
                u.name.toLowerCase().includes(q) ||
                u.username.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q)
        );
    }, [searchQuery, users]);

    return (
        <div className="space-y-4">
            <Suspense fallback={<div>Loading table...</div>}>
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by name, email, or username..."
                />
                <UserTable users={filteredUsers} />
            </Suspense>
            <Suspense fallback={<div>Loading posts...</div>}>
                <PostTable posts={posts} />
            </Suspense>
        </div>
    );
}
