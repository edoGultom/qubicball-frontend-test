import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      <span className="ml-2 text-slate-500">Loading dashboard...</span>
    </div>
  );
}
