"use client";

import { useLocalState } from "@/hooks/useLocalState";
import ScoreTracker from "@/components/ScoreTracker";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import PageWrapper from "@/components/layout/PageWrapper";
import { useState } from "react";
import PlayerNameForm from "@/components/PlayerNameForm";
import confetti from "canvas-confetti";

const MAX_ROUNDS = 3;

export default function CarCricketGame() {
    const [playerNames, setPlayerNames] = useLocalState<[string, string]>("car-cricket-names", ["", ""]);
    const [scores, setScores] = useLocalState("car-cricket-scores", [0, 0]);
    const [round, setRound] = useLocalState("car-cricket-round", 1);
    const [turn, setTurn] = useLocalState<0 | 1>("car-cricket-turn", 0);
    const [dangerColour, setDangerColour] = useLocalState("car-cricket-danger", "Yellow");
    const [roundScores, setRoundScores] = useLocalState<Array<[number, number]>>("car-cricket-history", []);
    const [tempScores, setTempScores] = useState<[number, number]>([0, 0]);
    const [wins, setWins] = useLocalState<[number, number]>("car-cricket-wins", [0, 0]);
    const [gameOver, setGameOver] = useState(false);

    const updateScore = (delta: number) => {
        const newScores = [...tempScores] as [number, number];
        newScores[turn] = Math.max(0, newScores[turn] + delta);
        setTempScores(newScores);
    };

    const endTurn = () => {
        if (turn === 0) {
            setTurn(1);
        } else {
            const [p1, p2] = tempScores;
            const newRoundScores = [...roundScores, tempScores];
            setRoundScores(newRoundScores);

            const newWins = [...wins] as [number, number];
            if (p1 > p2) newWins[0] += 1;
            else if (p2 > p1) newWins[1] += 1;

            setWins(newWins);
            setRound(round + 1);
            setTempScores([0, 0]);
            setTurn(0);

            if (round + 1 > MAX_ROUNDS) {
                setGameOver(true);
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                })
            }
        }
    };

    const resetGame = () => {
        setGameOver(false);
        setRound(1);
        setTurn(0);
        setTempScores([0, 0]);
        setRoundScores([]);
        setWins([0, 0]);
    };

    if (!playerNames.every(Boolean)) {
        return (
            <PageWrapper>
                <Heading title="🏏 Car Cricket" />
                <PlayerNameForm onSubmit={setPlayerNames} />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Heading title="🏏 Car Cricket" />
            <p className="text-center text-sm text-text-muted">
                Count cars, avoid the danger colour. Best of {MAX_ROUNDS} rounds!
            </p>

            <div className="text-center text-brand font-bold text-lg mt-1.5 mb-2">
                Round {round} — {playerNames[turn]}'s Turn
            </div>

            <div className="text-center mb-6">
                <label htmlFor="danger" className="text-sm mr-2">Danger Car:</label>
                <select
                    id="danger"
                    value={dangerColour}
                    onChange={(e) => setDangerColour(e.target.value)}
                    className="p-1 rounded border dark:bg-gray-800"
                >
                    {["Yellow", "Red", "Pink", "Blue", "Green", "Black", "White"].map((colour) => (
                        <option key={colour} value={colour}>{colour}</option>
                    ))}
                </select>
            </div>


            {!gameOver ? (
                <>
                    <ScoreTracker
                        scores={tempScores}
                        onUpdate={(_, delta) => updateScore(delta)}
                        onReset={() => setTempScores([0, 0])}
                        playerNames={playerNames}
                        activePlayer={turn}
                    />

                    <div className="mt-4 flex flex-col gap-2 items-center">
                        <Button
                            variant="primary"
                            onClick={endTurn}
                        >
                            🚫 Danger Car Spotted
                        </Button>
                    </div>
                </>
            ) : (
                <div className="text-center mt-6">
                    <p className="text-xl font-bold text-brand">
                        🌟 Winner: {
                            wins[0] > wins[1]
                                ? playerNames[0]
                                : wins[1] > wins[0]
                                    ? playerNames[1]
                                    : "It's a draw!"
                        }
                    </p>
                    <Button className="mt-4" onClick={resetGame}>
                        New Game
                    </Button>
                </div>

            )}


            <div className="mt-6">
                <h2 className="text-sm font-semibold mb-2">Round History:</h2>
                <ul className="text-sm space-y-1">
                    {roundScores.map(([p1, p2], i) => (
                        <li key={i} className="flex justify-between">
                            <span>Round {i + 1}</span>
                            <span>
                                {playerNames[0]}: {p1} | {playerNames[1]}: {p2}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </PageWrapper>
    );
}
