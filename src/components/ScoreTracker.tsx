"use client";

import Button from './ui/Button';

type Props = {
    scores: number[];
    onUpdate: (index: number, delta: number) => void;
    onReset?: () => void;
    playerNames?: [string, string];
    activePlayer?: 0 | 1;
}

export default function ScoreTracker({ scores, onUpdate, onReset, playerNames = ["Blegh", "Ptooo"], activePlayer = 0 }: Props) {
    return (
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow p-4 flex flex-col gap-4 text-center">
            <h2 className="text-lg font-title font-semibold">Score Tracker</h2>
            <div className="grid grid-cols-2 gap-4">
                {scores.map((score, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <span className="text-sm text-gray-500">{playerNames[i]}</span>
                        <span className="text-2xl font-bold text-brand">{score}</span>
                        {activePlayer === i && (
                            <div className="flex gap-2 mt-2">
                                <Button onClick={() => onUpdate(i, -1)} variant="primary">-1</Button>
                                <Button onClick={() => onUpdate(i, 1)} variant="primary">+1</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {onReset && (
                <Button variant="secondary" onClick={onReset} className="w-full mt-4">
                    Reset Scores
                </Button>
            )}
        </div>
    )
}