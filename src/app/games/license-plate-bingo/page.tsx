"use client";

import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { useLocalState } from "@/hooks/useLocalState";
import confetti from "canvas-confetti";
import clsx from "clsx";
import { useState, useEffect } from "react";

const POSSIBLE_VALUES = [
    "VIC", "NSW", "QLD", "SA", "WA", "TAS", "NT", "ACT",
    "AAA", "777", "XZY", "123", "XYZ", "999",
    "ECO", "UTE", "EV", "TOW", "CAR", "BUS",
    "RANDOM", "ANY O", "BLACK", "PINK", "GREEN"
]

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => 0.5 - Math.random());
}

export default function LicensePlateBingo() {
    const [board, setBoard] = useLocalState<string[][]>("bingo-board", []);
    const [marked, setMarked] = useLocalState<boolean[][]>("bingo-marked", []);
    const [bingo, setBingo] = useState(false);
    const [winningCells, setWinningCells] = useState<[number, number][]>([]);

    useEffect(() => {
        if (board.length === 0) {
            const shuffled = shuffle(POSSIBLE_VALUES).slice(0, 25);
            const newBoard = Array.from({ length: 5 }, (_, row) => shuffled.slice(row * 5, row * 5 + 5));
            setBoard(newBoard);
            setMarked(Array.from({ length: 5 }, () => Array(5).fill(false)));
            setBingo(false);
        }
    }, []);

    const toggleCell = (row: number, col: number) => {
        const newMarked = [...marked];
        newMarked[row][col] = !newMarked[row][col];
        setMarked(newMarked);
        checkBingo(newMarked);
    };

    const checkBingo = (grid: boolean[][]) => {
        const winning: [number, number][] = [];

        for (let row = 0; row < 5; row++) {
            if (grid[row].every(cell => cell)) {
                for (let col = 0; col < 5; col++) winning.push([row, col]);
            }
        }

        for (let col = 0; col < 5; col++) {
            if (grid.every(row => row[col])) {
                for (let row = 0; row < 5; row++) winning.push([row, col]);
            }
        }

        if (grid.every((row, i) => row[i])) {
            for (let i = 0; i < 5; i++) winning.push([i, i]);
        }

        if (grid.every((row, i) => row[4 - i])) {
            for (let i = 0; i < 5; i++) winning.push([i, 4 - i]);
        }
        setWinningCells(winning);
        setBingo(winning.length > 0);
        if (winning.length > 0) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            })
        }
    }

    const resetBoard = () => {
        const shuffled = shuffle(POSSIBLE_VALUES).slice(0, 25);
        const newBoard = Array.from({ length: 5 }, (_, row) => shuffled.slice(row * 5, row * 5 + 5));
        setBoard(newBoard);
        setMarked(Array.from({ length: 5 }, () => Array(5).fill(false)));
        setWinningCells([]);
        setBingo(false);
    }

    return (
        <PageWrapper>
            <Heading title="🚘 License Plate Bingo" />
            <p className="text-center text-sm text-text-muted mb-4">
                Tap a tile when you spot a matching license plate or keyword. You must connect a row, column or diagonal to win!
            </p>

            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
                {board.map((row, rowIndex) =>
                    row.map((value, colIndex) => {
                        const isWinningCell = winningCells.some(([r, c]) => r === rowIndex && c === colIndex);

                        return (

                            <button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => toggleCell(rowIndex, colIndex)}
                                className={clsx(
                                    "aspect-square rounded-lg text-sm font-semibold flex items-center justify-center p-2",
                                    marked[rowIndex][colIndex] ? "bg-brand text-white" : "bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600",
                                    isWinningCell && "ring-2 ring-yellow-400 animate-pulse"
                                )}
                            >
                                {value}
                            </button>
                        )
                    })
                )}
            </div>

            {bingo && (
                <div className="text-center text-brand font-bold text-xl mt-6 animate-bounce">
                    🥳 BINGO!!
                </div>
            )}

            <div className="text-center mt-6">
                <Button onClick={resetBoard}>New Board</Button>
            </div>
        </PageWrapper>
    )
}