"use client";

import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import clsx from "clsx";
import { useState } from "react";

const QUESTIONS = [
    ["Have super strength", "Have super speed"],
    ["Be able to fly", "Be invisible"],
    ["Only eat sweet food", "Only eat salty food"],
    ["Live without music", "Live without TV"],
    ["Talk to animals", "Speak every human language"],
    ["Win $10M now", "Get $1M a year for 10 years"],
    ["Be stuck in traffic for 2 hours", "Have slow internet for a day"],
    ["Fight 1 horse sized duck", "100 duck sized horses"],
    ["Always feel hot", "Always feel cold"],
    ["Never age physically", "Never age mentally"]
];

function getRandomIndex(prevIndex: number) {
    let index = Math.floor(Math.random() * QUESTIONS.length);
    while (index === prevIndex) {
        index = Math.floor(Math.random() * QUESTIONS.length);
    }
    return index;
}

export default function WouldYouRatherPage() {
    const [currentIndex, setCurrentIndex] = useState(() => getRandomIndex(-1));
    const [selected, setSelected] = useState<number | null>(null);

    const options = QUESTIONS[currentIndex];

    const handleSelect = (index: number) => {
        setSelected(index);
    }

    const nextQuestion = () => {
        const newIndex = getRandomIndex(currentIndex);
        setCurrentIndex(newIndex);
        setSelected(null);
    }

    return (
        <PageWrapper>
            <Heading title="🤔 Would You Rather?" />
            <p className="text-center text-sm text-text-muted mb-6">
                Tap your preferred option, then try to guess what your road trip buddy will choose!
            </p>

            <div className="flex flex-col gap-4 max-w-xs mx-auto">
                {options.map((opt, i) => (
                    <Button
                        key={i}
                        variant={selected === i ? "primary" : "secondary"}
                        className={clsx("py-4 text-base", selected === i && "scale-105 animate-pulse")}
                        onClick={() => handleSelect(i)}
                    >
                        {opt}
                    </Button>
                ))}
            </div>

            <div className="text-center mt-6">
                <Button onClick={nextQuestion}>
                    Next Question
                </Button>
            </div>
        </PageWrapper>
    )
}