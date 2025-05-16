'use client';

import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { TriviaQuestion, fallbackTrivia } from "@/data/aussie-trivia";
import { useLocalState } from "@/hooks/useLocalState";
import { getTriviaQuestion } from "@/utils/triviaFetcher";
import clsx from "clsx";
import { useEffect, useState } from "react";

const categories = [
    { id: 9, label: "General Knowledge" },
    { id: 10, label: "Books" },
    { id: 11, label: "Film" },
    { id: 12, label: "Music" },
    { id: 14, label: "Television" },
    { id: 15, label: "Video Games" },
    { id: 17, label: "Science & Nature" },
    { id: 18, label: "Computers" },
    { id: 19, label: "Mathematics" },
    { id: 21, label: "Sports" },
    { id: 22, label: "Geography" },
    { id: 23, label: "History" },
    { id: 24, label: "Politics" },
    { id: 27, label: "Animals" },
    { id: 28, label: "Vehicles" },
    { id: 31, label: "Anime & Manga" },
    { id: 32, label: "Cartoons & Animation" },
];

export default function TriviaPage() {
    const [question, setQuestion] = useState<TriviaQuestion | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [source, setSource] = useState<"online" | "fallback">("fallback");
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<number | undefined>(9);
    const [score, setScore] = useLocalState("trivia-score", { correct: 0, streak: 0 });
    const [timeLeft, setTimeLeft] = useState(30);
    const [timerActive, setTimerActive] = useState(false);

    const loadQuestion = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const { question, source } = await getTriviaQuestion(category?.toString());
        setQuestion(question);
        setSelected(null);
        setFeedback(null);
        setSource(source);
        setLoading(false);
        setTimeLeft(30);
        setTimerActive(true);
    };


    const handleSelect = (option: string) => {
        setSelected(option);
        setFeedback(option === question?.answer
            ? "Correct! 🎉"
            : `Oops! Correct answer: ${question?.answer}`
        );
        if (option === question?.answer) {
            setScore({ correct: score.correct + 1, streak: score.streak + 1 });
        } else {
            setScore({ ...score, streak: 0 });
        }
        setTimerActive(false);
    }

    const handleTimeout = () => {
        if (!question) return;
        setSelected("⏱️");
        setFeedback(`Time's up! The correct answer was: ${question.answer}`);
        setScore({ ...score, streak: 0 })
    }

    useEffect(() => {
        if (!timerActive || selected) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    setTimerActive(false);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerActive, selected]);


    return (
        <PageWrapper>
            <Heading title="Trivia Time!" />

            <div className="space-y-2 mb-4">
                <label htmlFor="category" className="block text-sm font-medium">
                    Select Category
                </label>
                <select
                    id="category"
                    className="w-full p-2 rounded-lg border dark:bg-gray-800"
                    value={category}
                    onChange={(e) => setCategory(Number(e.target.value))}
                    disabled={loading}
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="text-center mb-4 text-sm text-text-muted">
                👌Correct: {score.correct} | 🔥 Streak: {score.streak}
            </div>


            <div className="relative h-2 w-full bg-gray-300 dark:bg-gray-700 rounded overflow-hidden mb-4">
                <div
                    className={clsx(
                        "absolute top-0 left-0 h-full transition-all duration-300 ease-linear rounded-full",
                        timeLeft > 20
                            ? "bg-brand"
                            : timeLeft > 10
                                ? "bg-yellow-400"
                                : "bg-red-600 animate-pulse shadow-md shadow-red-500/40"
                    )}
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                />
            </div>

            {!question && !loading && (
                <div className="text-center mt-6">
                    <Button onClick={loadQuestion}>
                        Start Trivia
                    </Button>
                </div>
            )}

            {loading && (
                <div className="text-center mt-6">
                    <div className="w-6 h-6 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-text-muted mt-2">Fetching question...</p>
                </div>
            )}

            {!loading && question && (
                <div className="space-y-4">
                    <p className="font-semibold text-lg">{question.question}</p>
                    <div className="grid gap-2">
                        {question.options.map((opt) => (
                            <Button
                                key={opt}
                                variant={selected === opt
                                    ? opt === question.answer
                                        ? "primary"
                                        : "secondary"
                                    : "secondary"}
                                className={clsx("transition-transform duration-200", selected === opt && (opt === question.answer ? "animate-bounce" : "opacity-60 scale-95"))}
                                onClick={() => handleSelect(opt)}
                                disabled={!!selected || timeLeft <= 0}
                            >
                                {opt}
                            </Button>

                        ))}
                    </div>
                    {feedback && (
                        <p className="mt-4 text-center text-md font-semibold">
                            {feedback} {source === "fallback" && (
                                <span className="text-sm text-text-muted">(Offline)</span>
                            )}
                        </p>
                    )}

                    <Button className={`mt-6 ${timeLeft > 0 && !selected ? "bg-opacity-30" : null}`} onClick={loadQuestion} disabled={loading || (!selected && timeLeft > 0)}>
                        {loading ? "Loading..." : "Next Question"}
                    </Button>
                </div>
            )}
        </PageWrapper>
    )
}