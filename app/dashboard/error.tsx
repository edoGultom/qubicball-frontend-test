"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Dashboard Error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
            <h2 className="text-xl font-semibold text-red-600">Something went wrong 😢</h2>
            <p className="text-gray-500">{error.message || "Failed to load data."}</p>
            <Button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Try Again
            </Button>
        </div>
    );
}
