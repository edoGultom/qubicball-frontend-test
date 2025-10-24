"use client"
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };
  // gunakan resolvedTheme agar SSR & client sama
  const currentTheme = mounted ? resolvedTheme : "light";

  return (
    <header className="sticky top-0 z-30 h-16 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between px-4 lg:px-6">
      {/* Menu button for mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-slate-700 dark:text-slate-200"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 hidden lg:flex items-center gap-1">
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const name = segment.charAt(0).toUpperCase() + segment.slice(1);
          return (
            <React.Fragment key={index}>
              {index !== 0 && <span>/</span>}
              <span
                className={
                  isLast
                    ? "text-slate-800 dark:text-slate-100 font-semibold"
                    : "text-slate-500 dark:text-slate-400"
                }
              >
                {name}
              </span>
            </React.Fragment>
          );
        })}
      </h2>

      <div className="flex items-center gap-2 ml-auto">
        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {currentTheme === "dark" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logout */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
