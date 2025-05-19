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
    ["Never age physically", "Never age mentally"],
    ["Time travel to the past", "Time travel to the future"],
    ["Live on a houseboat", "Live in a treehouse"],
    ["Be famous but poor", "Unknown but rich"],
    ["Give up coffee forever", "Give up soda forever"],
    ["Have no phone for a year", "Have no computer for a year"],
    ["Always have to whisper", "Always have to shout"],
    ["Only be able to listen to one song forever", "Never listen to music again"],
    ["Work your dream job for low pay", "Work a boring job for high pay"],
    ["Teleport anywhere instantly", "Read minds for 10 minutes a day"],
    ["Live in a world without the internet", "Live in a world without air travel"],
    ["Only be able to watch movies", "Only be able to read books"],
    ["Sleep 2 hours a day and feel rested", "Sleep 10 hours a day but always feel tired"],
    ["Be able to breathe underwater", "Survive in outer space without a suit"],
    ["Forget your favorite memory", "Never make new ones"],
    ["Have no taste buds", "Have no sense of smell"],
    ["Have a pause button for your life", "Have a rewind button"],
    ["Be stuck on a deserted island alone", "Be stuck with someone you dislike"],
    ["Always get stuck behind slow walkers", "Always hit every red light"],
    ["Speak only in rhymes", "Sing everything you say"],
    ["Have your dream home in a bad location", "Live in a tiny home in your dream location"],
    ["Never have to do laundry", "Never have to do dishes"],
    ["Lose access to YouTube", "Lose access to Netflix"],
    ["Wake up with a different haircut every day", "Wake up in a different outfit every day"],
    ["Only be able to text", "Only be able to call"],
    ["Have a pet dinosaur", "Have a robot best friend"],
    ["Always know when someone is lying", "Always get away with lying"],
    ["Eat pizza every day", "Never eat pizza again"],
    ["Be able to control fire", "Be able to control water"],
    ["Have spaghetti for hair", "Sweat maple syrup"],
    ["Always have to hop everywhere", "Always have to sing instead of talk"],
    ["Be able to talk to your furniture", "Have your pet secretly be a genius"],
    ["Only be able to eat food that’s blue", "Only drink liquids that are green"],
    ["Have hands for feet", "Have feet for hands"],
    ["Fight a giant hamster once a year", "Fight 10 regular hamsters once a week"],
    ["Be followed around by theme music", "Have your life narrated by Morgan Freeman"],
    ["Have a nose that honks when you laugh", "Have ears that wiggle when you're lying"],
    ["Randomly shout 'SURPRISE!' every hour", "Randomly break into dance every 2 hours"],
    ["Only be able to walk backwards", "Only be able to crawl everywhere"],
    ["Have to wear clown makeup every day", "Have to wear a tutu every day"],
    ["Communicate only by charades", "Only speak in riddles"],
    ["Turn into a pickle once a day for an hour", "Turn invisible but only while sneezing"],
    ["Have fingers that are tiny sausages", "Have toes that are mini carrots"],
    ["Have your phone always be at 1% battery", "Have your socks always be slightly wet"],
    ["Be chased by one angry goose forever", "Have one bee follow you wherever you go"],
    ["Have to eat a banana with every meal", "Have to wear oven mitts all day"],
    ["Only be able to watch TV shows from the 1980s", "Only be able to listen to elevator music"],
    ["Always get hiccups when nervous", "Always sneeze when you meet someone new"],
    ["Have a permanent unibrow", "Have glow-in-the-dark teeth"],
    ["Be best friends with a talking toilet", "Have a fridge that sings every time you open it"],
    ["Have to wear flippers instead of shoes", "Have to wear ski goggles all the time"],
    ["Have a laugh that sounds like a kazoo", "Snore like a foghorn"],
    ["Only be able to wear clothes made of bubble wrap", "Only be able to sit on inflatable furniture"],
    ["Be stuck in a soap opera", "Be stuck in a reality TV show"]
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