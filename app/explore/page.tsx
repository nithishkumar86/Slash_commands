"use client";

import { useEffect, useState } from "react";
import SectionNav from "@/components/SectionNav";
import CommandExplorer from "@/components/CommandExplorer";
import type { Command, CommandsResponse } from "@/lib/types";

/** Client page for /explore: fetches every slash command and renders a searchable list. */
const ExplorePage = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const loadCommands = async (): Promise<void> => {
      try {
        const res = await fetch("/api/explore");
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data: CommandsResponse = await res.json();
        setCommands(data.commands);
      } catch (error) {
        console.error("Failed to load slash commands:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCommands();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const normalizedTerm = searchTerm.trim().toLowerCase();
  const filteredCommands = commands.filter(
    (command) =>
      command.name.toLowerCase().includes(normalizedTerm) ||
      command.description.toLowerCase().includes(normalizedTerm),
  );

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <SectionNav current="explore" />

      <header className="mb-8">
        <h1 className="text-gradient mb-3 text-4xl font-bold">
          Explore all slash commands
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
          Every slash command in Claude Code, with a plain-English definition.
        </p>
      </header>

      {isLoading ? (
        <p className="text-slate-400">Loading slash commands…</p>
      ) : hasError ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          Sorry, we couldn&apos;t load the slash commands. Please refresh the
          page to try again.
        </p>
      ) : commands.length === 0 ? (
        <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-slate-300">
          No slash commands are available right now.
        </p>
      ) : (
        <>
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search commands by name or description…"
            className="mb-6 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-base text-slate-100 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none"
          />

          {filteredCommands.length === 0 ? (
            <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-slate-300">
              No commands match &ldquo;{searchTerm}&rdquo;.
            </p>
          ) : (
            <CommandExplorer commands={filteredCommands} />
          )}
        </>
      )}
    </main>
  );
};

export default ExplorePage;
