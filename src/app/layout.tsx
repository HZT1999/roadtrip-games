import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import HydrationProvider from "@/components/layout/HydrationProvider";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: "Road Trip Games",
  description: "Games to pass the time!",
};

const setInitialTheme = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body
        className="bg-surface text-text-base font-sans dark:bg-gray-900 dark:text-white"
      >
        <HydrationProvider>
          <div className="min-h-screen pb-20">
            <header className="text-center p-4 font-title text-brand text-xl font-bold">
              🛣️ Roadtrip Games
            </header>
            {children}

            <BottomNav />
          </div>
        </HydrationProvider>
      </body>
    </html>
  );
}