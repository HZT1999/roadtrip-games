'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
    { label: "Home", href: "/", icon: "🏡" },
    { label: "Car Cricket", href: "/games/car-cricket", icon: "🏏" },
    { label: "Trivia", href: "/games/trivia", icon: "🧠" },
    { label: "Alphabet Hunt", href: "/games/alphabet-hunt", icon: "🔡" },
    { label: "Settings", href: "/settings", icon: "⚙️" },
];


export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-border  dark:border-gray-700 shadow-md flex justify-around py-2 z-50">
            {navItems.map((item) => {
                const isActive = pathname == item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                            "flex flex-col items-center text-sm transition-all duration-200 ease-out",
                            isActive ? "text-brand font-semibold scale-105" : "text-text-muted hover:text-brand/80"
                        )}
                    >
                        <span className={clsx("text-xl transition-transform duration-200", isActive ? "scale-110" : "scale-100")}>
                            {item.icon}
                        </span>
                        <span className="mt-0.5 dark:text-gray-300">{item.label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}