import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";

const keywords =
  "smart contracts, ethereum, blockchain, web3, dapp, decentralized application, smart contract interaction, ethereum network, blockchain platform, cryptocurrency, ETH, smart portal, smart contract deployment, blockchain technology, ethereum wallet, web3 integration, smart contract development, blockchain interface, decentralized finance, DeFi, ethereum transactions, gas fees, metamask, ethereum blockchain, smart contract security, blockchain explorer, ethereum smart contracts, crypto wallet, blockchain platform, digital assets, cryptocurrency exchange, blockchain development, smart contract audit, ethereum mining, blockchain solutions, crypto payments, blockchain infrastructure, smart contract platform, ethereum ecosystem, blockchain technology, decentralized network, crypto trading, blockchain security, smart contract tools, ethereum development, blockchain applications, crypto investment, smart contract management, blockchain protocol, ethereum mining, digital currency, cryptocurrency wallet, blockchain consulting";

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
  title: "MarkUp",
  description: "MarkUp - online markdown editor",
  authors: {
    url: "https://github.com/EldarMuhamethanov",
    name: "EldarMuhamethanov",
  },
  robots: "index, follow",
  keywords,
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
