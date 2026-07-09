import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Section 4 — Commands",
  description:
    "A teaching site for Claude Code slash commands, Plan Mode, and sessions.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
