import Link from 'next/link';
import Button from './ui/Button';

type GameCardProps = {
    title: string;
    description: string;
    href: string;
}

export default function GameCard({ title, description, href }: GameCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-2xl p-4 flex flex-col gap-2">
            <h2 className="text-lg font-title font-semibold">{title}</h2>
            <p className="text-sm text-text-muted dark:text-gray-300">{description}</p>
            <Link href={href}>
                <Button>Play</Button>
            </Link>
        </div>
    )
}