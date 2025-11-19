import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guld – Robust app-skelett",
  description: "Basmall med frontend, backend, API-lager och databasstöd.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <main className="min-h-screen flex items-center justify-center p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
