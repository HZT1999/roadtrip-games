export type TriviaQuestion = {
    question: string;
    options: string[];
    answer: string;
};

export const fallbackTrivia: TriviaQuestion[] = [
    {
        question: "Which Australian animal is known for its laugh-like call?",
        options: ["Koala", "Kangaroo", "Kookaburra", "Wombat"],
        answer: "Kookaburra",
    },
    {
        question: "Which famous landmark is located in Sydney?",
        options: ["Uluru", "Sydney Opera House", "Great Barrier Reef", "Twelve Apostles"],
        answer: "Sydney Opera House",
    },
    {
        question: "Who was the first Prime Minister of Australia?",
        options: ["Edmund Barton", "John Howard", "Robert Menzies", "Julia Gillard"],
        answer: "Edmund Barton",
    },
];