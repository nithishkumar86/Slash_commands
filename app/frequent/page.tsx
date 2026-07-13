"use client";

import { useEffect, useState } from "react";
import SectionNav from "@/components/SectionNav";
import CommandExplorer from "@/components/CommandExplorer";
import type { Command, CommandsResponse } from "@/lib/types";

/** Client page for /frequent: fetches the curated most-used commands and renders them. */
const FrequentPage = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const loadCommands = async (): Promise<void> => {
      try {
        const res = await fetch("/api/frequent");
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data: CommandsResponse = await res.json();
        setCommands(data.commands);
      } catch (error) {
        console.error("Failed to load frequent commands:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCommands();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <SectionNav current="frequent" />

      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-bold text-white">
          Frequently used commands
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
          The handful of slash commands you reach for daily, and why each one
          matters.
        </p>
      </header>

      {isLoading ? (
        <p className="text-slate-400">Loading frequent commands…</p>
      ) : hasError ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          Sorry, we couldn&apos;t load the frequent commands. Please refresh the
          page to try again.
        </p>
      ) : commands.length === 0 ? (
        <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-slate-300">
          No frequent commands are available right now.
        </p>
      ) : (
        <CommandExplorer commands={commands} />
      )}
    </main>
  );
};

export default FrequentPage;
