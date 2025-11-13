import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clash of Clans - Strategy Game",
  description: "A simplified Clash of Clans-style strategy game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
