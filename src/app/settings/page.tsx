"use client";

import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { useDarkMode } from "@/hooks/useDarkMode";
import PageWrapper from "@/components/layout/PageWrapper";
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const { isDark, toggle } = useDarkMode();
    const [message, setMessage] = useState<string | undefined>(undefined);

    const clearScores = () => {
        localStorage.removeItem("car-cricket-scores");
        localStorage.removeItem("car-cricket-round");
        localStorage.removeItem("car-cricket-turn");
        localStorage.removeItem("car-cricket-names");
        localStorage.removeItem("car-cricket-danger");
        localStorage.removeItem("car-cricket-history");
        localStorage.removeItem("car-cricket-wins");
        localStorage.removeItem("trivia-score");
        setMessage('Scores reset!');
    }

    useEffect(() => {
        if (!message) return;

        const timer = setInterval(() => {
            setMessage(undefined);
        }, 1000)

        return () => clearInterval(timer);
    }, [message])

    return (
        <PageWrapper>
            <Heading title="Settings" />

            {message && (
                <p className="text-sm text-text-muted">{message}</p>
            )}

            <section className="space-y-2 mb-2">
                <h2 className="font-semibold text-lg">Theme</h2>
                <Button onClick={toggle}>
                    Switch to {isDark ? "Light" : "Dark"} mode
                </Button>
            </section>

            <section className="space-y-2 mb-2">
                <h2 className="font-semibold text-lg">Reset Games</h2>
                <Button variant="secondary" onClick={clearScores}>
                    Reset Scores
                </Button>
            </section>
        </PageWrapper>
    )
}