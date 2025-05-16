import { useState } from 'react';
import Button from './ui/Button';

type Props = {
    onSubmit: (names: [string, string]) => void;
};

export default function PlayerNameForm({ onSubmit }: Props) {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit([player1, player2]);
            }}
            className="space-y-4 max-w-sm mx-auto"
        >
            <input
                className="w-full p-2 rounded border dark:bg-gray-800"
                placeholder="Player 1 Name"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
                className="w-full p-2 rounded border dark:bg-gray-800"
                placeholder="Player 2 Name"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
            />

            <Button type="submit" className="w-full">Start Game</Button>
        </form>
    )
}