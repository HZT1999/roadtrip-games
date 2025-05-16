"use client";

import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import clsx from "clsx";
import { useLocalState } from "@/hooks/useLocalState";

const SIGNS = [
    "Stop",
    "Speed Limit",
    "No Entry",
    "Give Way",
    "Roundabout",
    "Pedestrian Crossing",
    "School Zone",
    "Road Work Ahead",
    "Merge Right",
    "One Way",
    "Slippery When Wet",
    "Railway Crossing",
    "No U-Turn",
    "Keep Left",
    "Traffic Lights Ahead",
    "Animal Crossing",
];

export default function RoadSignHunt() {
    const [seen, setSeen] = useLocalState<Record<string, boolean>>(
        "road-sign-hunt-seen",
        Object.fromEntries(SIGNS.map((sign) => [sign, false]))
    );

    const toggleSeen = (sign: string) => {
        setSeen((prev) => ({ ...prev, [sign]: !prev[sign] }));
    };

    const reset = () => {
        const cleared: Record<string, boolean> = {};
        SIGNS.forEach(sign => (cleared[sign] = false));
        setSeen(cleared);
    };

    const foundCount = Object.values(seen).filter(Boolean).length;

    return (
        <PageWrapper>
            <Heading title="🚧 Road Sign Hunt" />
            <p className="text-center text-sm text-text-muted mb-4">
                Tap each road sign when you spot it out the window. Can you find them all?
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {SIGNS.map((sign) => (
                    <button
                        key={sign}
                        onClick={() => toggleSeen(sign)}
                        className={clsx(
                            "rounded-lg p-3 text-sm font-medium text-left border",
                            seen[sign]
                                ? "bg-brand text-white border-brand"
                                : "bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
                        )}
                    >
                        {sign}
                    </button>
                ))}
            </div>

            <div className="text-center mt-6 text-sm text-text-muted">
                Found {foundCount} / {SIGNS.length} signs
            </div>

            <div className="text-center mt-4">
                <Button onClick={reset} variant="ghost">
                    Reset Hunt
                </Button>
            </div>
        </PageWrapper>
    );
}