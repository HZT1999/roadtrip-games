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
          <GameCard
            title="🚘 License Plate Bingo"
            description="Find License Plate Combos to Win Bingo!"
            href="/games/license-plate-bingo"
          />
          <GameCard
            title="🤔 Would You Rather"
            description="Guess your friends Would you Rather!"
            href="/games/would-you-rather"
          />
          <GameCard
            title="⚡ Category Blitz"
            description="Fire rounds of words to letters!"
            href="/games/category-blitz"
          />
          <GameCard
            title="🛑 Road Sign Hunt"
            description="Tap each road sign when you spot it!"
            href="/games/road-sign-hunt"
          />
          <GameCard
            title="🔢 Count That Thing!"
            description="Compete or collaborate to count as many things as you can!"
            href="/games/count-that-thing"
          />
        </div>
      </PageWrapper>
    </div>
  );
}
