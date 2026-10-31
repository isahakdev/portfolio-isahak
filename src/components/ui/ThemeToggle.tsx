
"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => { };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const mounted = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="Loading theme"
                className="h-11 w-11 rounded-full border border-[var(--border)]"
            />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:-translate-y-1 hover:shadow-md"
        >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
    );
}
