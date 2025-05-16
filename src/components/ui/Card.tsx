import { ReactNode } from "react";
import clsx from "clsx";

export default function Card({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={clsx("bg-white rounded-xl p-4 shadow", className)}>
            {children}
        </div>
    )
}