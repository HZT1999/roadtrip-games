'use client';

import { ReactNode } from "react";
import clsx from 'clsx';


export default function PageWrapper({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <main
            className={clsx(
                "min-h-screen px-4 py-6 bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300",
                className
            )}
        >
            {children}
        </main>
    );
}