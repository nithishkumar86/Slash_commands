"use client";

import { useEffect, useState } from "react";
import type { Command } from "@/lib/types";

interface CommandExplorerProps {
  commands: Command[];
}

const CommandExplorer = ({ commands }: CommandExplorerProps) => {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    const isSelectionStillPresent = commands.some(
      (command) => command.name === selectedName,
    );
    if (!isSelectionStillPresent) {
      setSelectedName(null);
      setIsAnimating(false);
    }
  }, [commands, selectedName]);

  const handleSelect = (command: Command): void => {
    if (command.name === selectedName) {
      setIsAnimating((previous) => !previous);
      return;
    }
    setSelectedName(command.name);
    setIsAnimating(true);
  };

  const selectedCommand = commands.find(
    (command) => command.name === selectedName,
  );

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div className="flex flex-col gap-2">
        {commands.map((command) => {
          const isSelected = command.name === selectedName;
          return (
            <button
              key={command.name}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleSelect(command)}
              className={`rounded-lg border px-4 py-3 text-left font-mono text-base font-semibold transition ${
                isSelected
                  ? "border-sky-400/50 bg-sky-400/10 text-sky-300"
                  : "border-white/10 bg-white/5 text-sky-300/90 hover:border-sky-400/30 hover:bg-white/10"
              }`}
            >
              {command.name}
            </button>
          );
        })}
      </div>

      <div className="sm:sticky sm:top-16 sm:self-start">
        {selectedCommand ? (
          <div
            className={`rounded-lg border border-white/10 bg-white/5 p-6 ${
              isAnimating
                ? "animate-command-pulse motion-reduce:animate-none"
                : ""
            }`}
          >
            <code className="font-mono text-base font-semibold text-sky-300">
              {selectedCommand.name}
            </code>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              {selectedCommand.description}
            </p>
          </div>
        ) : (
          <p className="rounded-lg border border-white/10 bg-white/5 p-6 text-slate-400">
            Select a command to see its definition.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommandExplorer;
