export default function Heading({ title }: { title: string }) {
    return <h1 className="text-2xl font-title font-bold text-center text-text-base dark:text-white mb-4">{title}</h1>
}