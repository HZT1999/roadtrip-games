"use client";

import { useEffect, useState, ReactNode } from "react";

export default function HydrationProvider({ children }: { children: ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return <>{children}</>
}