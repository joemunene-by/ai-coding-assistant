import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joe's AI - Coding Assistant",
  description:
    "A powerful AI-powered coding assistant with Monaco editor and AI chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-editor-bg text-editor-text`}>
        {children}
      </body>
    </html>
  );
}
