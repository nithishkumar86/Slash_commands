import { NextResponse } from "next/server";
import type { Command, CommandsResponse } from "@/lib/types";

const COMMANDS: Command[] = [
  {
    name: "/help",
    description:
      "Shows every available command; your starting point when you forget one or are brand new.",
  },
  {
    name: "/init",
    description:
      "Creates a starter CLAUDE.md so Claude understands your project — the first thing to run in a new repo.",
  },
  {
    name: "/clear",
    description:
      "Starts a fresh conversation with empty context, so a new task isn't slowed down by stale history.",
  },
  {
    name: "/compact",
    description:
      "Summarizes the conversation to free up context, keeping a long session going when the window fills up.",
  },
  {
    name: "/context",
    description:
      "Shows what is filling your context window, so you can see what to trim before compacting.",
  },
  {
    name: "/model",
    description:
      "Switches the AI model (and effort), letting you pick fast responses or deeper reasoning per task.",
  },
  {
    name: "/plan",
    description:
      "Enters plan mode so you can review Claude's approach before it changes any code on a big task.",
  },
  {
    name: "/resume",
    description:
      "Reopens a past conversation by name or from a picker, so you pick up exactly where you left off.",
  },
  {
    name: "/rewind",
    description:
      "Rolls the code and/or conversation back to an earlier checkpoint to undo a wrong turn safely.",
  },
  {
    name: "/agents",
    description:
      "Creates and manages subagents, so you can delegate focused, specialized work to helpers.",
  },
  {
    name: "/mcp",
    description:
      "Manages MCP server connections, letting you plug in the external tools and data your project needs.",
  },
  {
    name: "/review",
    description:
      "Runs a fast, read-only review of a GitHub pull request before you ship it.",
  },
  {
    name: "/permissions",
    description:
      "Manages allow, ask, and deny rules so Claude can act without constant prompts.",
  },
];

/** GET /api/frequent — the curated set of most-used Claude Code commands. */
export const GET = async (): Promise<NextResponse<CommandsResponse>> => {
  return NextResponse.json<CommandsResponse>({
    title: "Frequently used commands",
    commands: COMMANDS,
  });
};
