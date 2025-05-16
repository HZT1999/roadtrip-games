"use client";

import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useLocalState } from "@/hooks/useLocalState";

const THINGS = [
    "Dogs in cars",
    "Motorcycles",
    "Yellow cars",
    "Utes",
    "Police cars",
    "Caravans",
    "Trucks",
    "People on bikes",
    "Tractors",
    "Convertible cars",
    "Dual cabs",
    "Cows",
    "Windmills",
    "Rest stops",
    "Bridges crossed",
];

export default function CountThatThing() {
    const [counts, setCounts] = useLocalState<Record<string, number>>(
        "count-that-thing",
        Object.fromEntries(THINGS.map((t) => [t, 0]))
    );

    const increment = (thing: string) => {
        setCounts((prev) => ({ ...prev, [thing]: prev[thing] + 1 }));
    };

    const decrement = (thing: string) => {
        setCounts((prev) => ({ ...prev, [thing]: Math.max(0, prev[thing] - 1) }));
    };

    const reset = () => {
        const cleared = Object.fromEntries(THINGS.map((t) => [t, 0]));
        setCounts(cleared);
    };

    return (
        <PageWrapper>
            <Heading title="🔢 Count That Thing" />
            <p className="text-center text-sm text-text-muted mb-4">
                Tap + when you spot the item. Compete or collaborate to count as many as you can!
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {THINGS.map((thing) => (
                    <div key={thing} className="bg-white dark:bg-gray-800 rounded-lg p-2 border border-gray-300 dark:border-gray-600">
                        <div className="text-sm font-medium text-text-base dark:text-white mb-2">{thing}</div>
                        <div className="flex items-center justify-between gap-2 mt-2">
                            <Button onClick={() => decrement(thing)} variant="secondary" className="py-1 px-2">-</Button>
                            <span className="text-base font-semibold w-6 text-center">{counts[thing] ?? 0}</span>
                            <Button onClick={() => increment(thing)} variant="primary" className="py-1 px-2">+</Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-6">
                <Button onClick={reset} variant="primary">
                    Reset All
                </Button>
            </div>
        </PageWrapper>
    );
}
