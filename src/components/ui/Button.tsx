import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
};

export default function Button({ children, className, variant = "primary", ...props }: Props) {
    return (
        <button
            className={clsx(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-colors w-full",
                "font-sans focus:outline-none focus:ring-2 focus:ring-offset-2",
                {
                    "bg-brand text-white hover:bg-brand-dark focus:ring-brand-light dark:bg-brand-light dark:hover:bg-brand": variant === "primary",
                    "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600": variant === "secondary",
                    "bg-transparent text-brand hover:bg-brand-light/10 focus:ring-brand dark:text-brand-light": variant === "ghost",
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
