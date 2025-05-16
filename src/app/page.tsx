import GameCard from "@/components/GameCard";
import PageWrapper from "@/components/layout/PageWrapper";
import Heading from "@/components/ui/Heading";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-colour" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>

      {/* 👅 BLEGHHH */}
      <PageWrapper>

        <div className="grid gap-4">
          <GameCard
            title="🏏 Car Cricket"
            description="Count cars, avoid the danger colour. Best score wins!"
            href="/games/car-cricket"
          />
          <GameCard
            title="🧠 Trivia Time"
            description="Challenge your brain with random trivia questions."
            href="/games/trivia"
          />
          <GameCard
            title="🔡 Alphabet Hunt"
            description="Find words A to Z on signs, plates, or anything outside."
            href="/games/alphabet-hunt"
          />
        </div>
      </PageWrapper>
    </div>
  );
}
