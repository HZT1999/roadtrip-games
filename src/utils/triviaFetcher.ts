import { fallbackTrivia, TriviaQuestion } from "@/data/aussie-trivia";

const TOKEN_KEY = "opentdb_token";

const getToken = async (): Promise<string | null> => {
    const existing = localStorage.getItem(TOKEN_KEY);
    if (existing) return existing;

    try {
        const res = await fetch("https://opentdb.com/api_token.php?command=request");
        const data = await res.json();
        if (data.response_code === 0) {
            localStorage.setItem(TOKEN_KEY, data.token);
            return data.token;
        }
    } catch (err) {
        console.warn("Failed to fetch OpenTDB Token", err);
    }

    return null;
};

const decode = (str: string) => decodeURIComponent(str);

const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

export const getTriviaQuestion = async (
    categoryId?: string
): Promise<{ question: TriviaQuestion, source: "online" | "fallback"; }> => {
    const token = await getToken();
    const categoryParam = categoryId ? `&category=${categoryId}` : '';

    try {
        const url =
            token
                ?
                `https://opentdb.com/api.php?amount=1&type=multiple&encode=url3986${categoryParam}&token=${token}`
                : `https://opentdb.com/api.php?amount=1&type=multiple&encode=url3986${categoryParam}`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.results?.[0]) throw new Error("No question returned");

        const q = data.results[0];
        const question: TriviaQuestion = {
            question: decode(q.question),
            answer: decode(q.correct_answer),
            options: shuffle([
                ...q.incorrect_answers.map(decode), decode(q.correct_answer)
            ]),
        };

        return { question, source: 'online' };
    } catch (err) {
        console.warn("Failling back to local trivia", err);
        const local = fallbackTrivia[Math.floor(Math.random() * fallbackTrivia.length)];
        return { question: local, source: 'fallback' }
    }
}