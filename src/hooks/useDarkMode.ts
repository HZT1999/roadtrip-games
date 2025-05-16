import { useEffect, useState } from "react";

export function useDarkMode() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const active = saved === "dark" || (!saved && prefersDark);

        document.documentElement.classList.toggle("dark", active);

        setIsDark(active);
    }, []);

    const toggle = () => {
        const newDark = !isDark;
        document.documentElement.classList.toggle("dark", newDark);
        localStorage.setItem("theme", newDark ? "dark" : "light");
        setIsDark(newDark);
    }

    return { isDark, toggle };
}