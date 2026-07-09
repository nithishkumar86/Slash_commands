"use client";

import { useEffect, useState } from "react";
import SectionNav from "@/components/SectionNav";
import TopicBox from "@/components/TopicBox";
import type { Command, CommandsResponse } from "@/lib/types";

/** Client page for /manage: fetches the session-management actions and renders them. */
const ManagePage = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const loadCommands = async (): Promise<void> => {
      try {
        const res = await fetch("/api/manage");
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data: CommandsResponse = await res.json();
        setCommands(data.commands);
      } catch (error) {
        console.error("Failed to load session actions:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCommands();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <SectionNav current="manage" />

      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-bold text-white">
          Managing sessions
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-300">
          Resume, rename, rewind, branch, and export — the actions that let you
          pick up, reshape, and share a Claude Code session.
        </p>
      </header>

      {isLoading ? (
        <p className="text-slate-400">Loading session actions…</p>
      ) : hasError ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          Sorry, we couldn&apos;t load the session actions. Please refresh the
          page to try again.
        </p>
      ) : commands.length === 0 ? (
        <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-slate-300">
          No session actions are available right now.
        </p>
      ) : (
        <div className="space-y-3">
          {commands.map((command) => (
            <TopicBox key={command.name} command={command} />
          ))}
        </div>
      )}
    </main>
  );
};

export default ManagePage;
