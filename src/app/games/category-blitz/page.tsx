"use client";

import { useState, useEffect } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import clsx from "clsx";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const CATEGORIES = [
    "Animal",
    "Movie",
    "Food",
    "City",
    "Celebrity",
    "Brand",
    "Sport",
    "Book",
    "Vehicle",
    "Song",
    "TV Show",
    "Country",
    "Object",
];

function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default function CategoryBlitzPage() {
    const [letter, setLetter] = useState<string>("?");
    const [category, setCategory] = useState<string>("");
    const [timer, setTimer] = useState<number>(30);
    const [active, setActive] = useState<boolean>(false);

    const startRound = () => {
        setLetter(getRandom(LETTERS));
        setCategory(getRandom(CATEGORIES));
        setTimer(30);
        setActive(true);
    }

    useEffect(() => {
        if (!active || timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((t) => t - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [active, timer])

    return (
        <PageWrapper>
            <Heading title="⚡Category Blitz" />

            <p className="text-center text-sm text-text-muted mb-4">
                Name something that starts with the letter and fits the category - before the time runs out!
            </p>

            <div className="flex flex-col items-center gap-4 mt-6">
                <div className="text-6xl font-bold text-brand">{letter}</div>
                <div className="text-xl font-medium text-brand">{category}</div>

                <div className="w-full max-w-xs h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mt-4">
                    <div
                        className={clsx(
                            "h-full transition-all duration-300",
                            timer > 10 ? "bg-brand" : timer > 5 ? "bg-yellow-400" : "bg-red-500 animate-pulse"
                        )}
                        style={{ width: `${(timer / 30) * 100}%` }}
                    />
                </div>

                <div className="text-sm text-text-muted mt-2">
                    {active ? `⏱ ${timer}s remaining` : "Press Start to begin"}
                </div>

                <Button onClick={startRound} variant="primary" className="mt-4">
                    {active ? "Next Round" : "Start"}
                </Button>
            </div>
        </PageWrapper>
    )
}