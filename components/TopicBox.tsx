import type { Command } from "@/lib/types";

interface TopicBoxProps {
  command: Command;
}

/** Two-column bordered box: left = command/action name, right = its definition. */
const TopicBox = ({ command }: TopicBoxProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-start sm:gap-4">
      <div className="shrink-0 sm:w-44">
        <code className="font-mono text-sm font-semibold text-sky-300">
          {command.name}
        </code>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-slate-300">
        {command.description}
      </p>
    </div>
  );
};

export default TopicBox;
