"use client";

import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from "@/components/layout/PageWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useLocalState } from "@/hooks/useLocalState";

const ALPHABET = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const MAX_SKIPS = 3;

export default function AlphabetHuntPage() {
    const [progress, setProgress] = useLocalState<{
        index: number;
        found: { [letter: string]: string };
        skips: number;
    }>("alphabet-hunt", {
        index: 0,
        found: {},
        skips: 0
    });
    const [error, setError] = useState<string | null>(null);
    const [shake, setShake] = useState(false);

    const currentLetter = ALPHABET[progress.index];
    const totalLetters = ALPHABET.length;

    const handleFound = (word: string) => {
        const nextIndex = progress.index + 1;
        const newProgress = {
            ...progress,
            index: nextIndex,
            found: {
                ...progress.found,
                [currentLetter]: word,
            },
        };

        setProgress(newProgress);

        if (nextIndex === ALPHABET.length) {
            confetti({
                particleCount: 200,
                spread: 90,
                origin: { y: 0.6 },
            })
        }
    }

    const handleSkip = () => {
        if (progress.skips >= MAX_SKIPS || progress.index >= totalLetters - 1) return;
        setProgress({
            ...progress,
            index: progress.index + 1,
            skips: progress.skips + 1,
        });
    };

    const handleReset = () => {
        setProgress({ index: 0, found: {}, skips: 0 });
        setShake(false);
        setError(null);
    }

    return (
        <PageWrapper>
            <Heading title="🔡 Alphabet Hunt" />

            <p className="text-center text-sm text-text-muted mb-2">
                Find words starting with each letter of the alphabet - in order!
            </p>

            <div className="mb-4 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentLetter}
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg font-bold mb-2 text-brand"
                    >
                        Current Letter: {currentLetter}
                    </motion.div>
                </AnimatePresence>

                <div className="mb-2">
                    {progress.index === ALPHABET.length ? (
                        <p className="text-center text-xl font-bold mt-8 text-brand">🎉 Yippee!!! You completed the hunt!</p>
                    ) : (
                        <>
                            <motion.div
                                animate={shake ? { x: [0, -10, 10, -6, 6, -2, 2, 0] } : {}}
                                transition={{ duration: 0.4 }}
                                onAnimationComplete={() => setShake(false)}
                            >
                                <input
                                    type="text"
                                    placeholder={`Spotted a word starting with ${currentLetter}?`}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && e.currentTarget.value) {
                                            const input = e.currentTarget.value.trim();
                                            if (!input.toUpperCase().startsWith(currentLetter)) {
                                                setError(`That word doesn't start with "${currentLetter}"`);
                                                setShake(true);
                                                e.currentTarget.value = "";
                                                return;
                                            }

                                            handleFound(e.currentTarget.value);
                                            e.currentTarget.value = '';
                                            setError(null);
                                        }
                                    }}
                                    className="w-full p-2 rounded border dark:bg-gray-800"
                                />
                            </motion.div>
                            {error && (
                                <p className="text-sm text-red-500 mt-1 text-center animate-pulse">
                                    {error}</p>
                            )}
                        </>
                    )}
                </div>

                <div className="flex gap-2 justify-center mt-2">
                    <Button variant="ghost" onClick={handleSkip} disabled={progress.skips >= MAX_SKIPS}>Skip Letter ({(MAX_SKIPS - progress.skips)} left)</Button>
                    <Button variant="secondary" onClick={handleReset}>Reset Game</Button>
                </div>
            </div>

            <div className="mb-4">
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-brand transition-all"
                        style={{ width: `${(progress.index / totalLetters) * 100}%` }}
                    />
                </div>
                <p className="text-center text-xs text-text-muted mt-1">
                    Progress: {progress.index} / {totalLetters} | Skipped: {progress.skips}
                </p>
            </div>

            <div className="mt-6">
                <h2 className="text-sm font-semibold mb-2">Words Found:</h2>
                <ul className="grid grid-cols-2 gap-1 text-sm">
                    {ALPHABET.map((letter) => (
                        <li key={letter} className="flex justify-between border-b border-border pb-1">
                            <span>{letter}</span>
                            <span className="text-right text-text-muted">
                                {progress.found[letter] || "-"}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

        </PageWrapper>
    )
}