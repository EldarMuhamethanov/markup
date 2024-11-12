import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MarkUp - Ваш лучший Markdown редактор",
  description: "MarkUp - это современный онлайн редактор Markdown, который позволяет легко создавать и редактировать документы. Поддержка автосохранения, импорт/экспорт и многое другое.",
  authors: {
    url: "https://github.com/EldarMuhamethanov",
    name: "EldarMuhamethanov",
  },
  robots: "index, follow",
  keywords: "Markdown, редактор, онлайн, автосохранение, импорт, экспорт, документация",
  openGraph: {
    type: "website",
    url: "https://ваш-сайт.com",
    title: "MarkUp - Ваш лучший Markdown редактор",
    description: "Создавайте и редактируйте Markdown документы с легкостью.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ваш_твиттер",
    title: "MarkUp - Ваш лучший Markdown редактор",
    description: "Создавайте и редактируйте Markdown документы с легкостью.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
