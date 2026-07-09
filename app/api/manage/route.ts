import { NextResponse } from "next/server";
import type { Command, CommandsResponse } from "@/lib/types";

const COMMANDS: Command[] = [
  {
    name: "/resume",
    description:
      "Reopens an earlier conversation by its ID or name, or opens a picker of past sessions so you can jump back into one. Use it to continue exactly where you left off. (Alias: /continue.)",
  },
  {
    name: "/rename",
    description:
      "Renames the current session and shows the name on the prompt bar; with no name given it auto-generates one from the conversation. Use it to label a session so it's easy to find later in /resume.",
  },
  {
    name: "/rewind",
    description:
      "Rolls the conversation and/or the code back to an earlier checkpoint, or summarizes from a chosen message. Use it to undo a wrong turn without throwing away the whole session. (Aliases: /checkpoint, /undo.)",
  },
  {
    name: "/branch",
    description:
      "Forks the current conversation at this point into a copy and switches you into it, while preserving the original (which you can return to with /resume). Use it to try a different direction without losing the conversation as it stands.",
  },
  {
    name: "/export",
    description:
      "Exports the current conversation as plain text; with a filename it writes to that file, otherwise it opens a dialog to copy to the clipboard or save to a file. Use it to share or archive a session outside Claude Code.",
  },
];

/** GET /api/manage — the five session-management actions in Claude Code. */
export const GET = async (): Promise<NextResponse<CommandsResponse>> => {
  return NextResponse.json<CommandsResponse>({
    title: "Managing sessions",
    commands: COMMANDS,
  });
};
