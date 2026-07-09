import { NextResponse } from "next/server";
import type { Command, CommandsResponse } from "@/lib/types";

const COMMANDS: Command[] = [
  {
    name: "/add-dir",
    description:
      "Give the session access to another folder so Claude can read and edit files there too.",
  },
  {
    name: "/advisor",
    description:
      'Turn a second "advisor" model on or off; it offers guidance at key moments during a task.',
  },
  {
    name: "/agents",
    description:
      "Create and manage subagents (specialized helpers), or edit their config files.",
  },
  {
    name: "/autofix-pr",
    description:
      "Start a cloud session that watches your pull request and pushes fixes when CI fails or reviewers comment.",
  },
  {
    name: "/background",
    description:
      "Detach the current session so it keeps running in the background and frees your terminal.",
  },
  {
    name: "/batch",
    description:
      "Break a large, codebase-wide change into many independent units and run each in parallel.",
  },
  {
    name: "/branch",
    description:
      "Fork the current conversation at this point so you can try a different direction without losing the original.",
  },
  {
    name: "/btw",
    description:
      "Ask a quick side question without adding it to the conversation history.",
  },
  {
    name: "/cd",
    description: "Move the session to a different working directory.",
  },
  {
    name: "/chrome",
    description: "Open the settings for Claude in Chrome.",
  },
  {
    name: "/claude-api",
    description:
      "Load Claude API reference material for your language, or migrate existing API code to a newer model.",
  },
  {
    name: "/clear",
    description:
      "Start a fresh conversation with empty context; the old one stays available in /resume.",
  },
  {
    name: "/code-review",
    description:
      "Review the current diff for correctness bugs and cleanups; can auto-apply fixes or post PR comments.",
  },
  {
    name: "/color",
    description: "Set the prompt bar color for the current session.",
  },
  {
    name: "/compact",
    description:
      "Summarize the conversation so far to free up context while continuing the same session.",
  },
  {
    name: "/config",
    description:
      "Open settings to change theme, model, and other preferences, or set a value directly.",
  },
  {
    name: "/context",
    description:
      "Show a visual breakdown of what is filling up your context window.",
  },
  {
    name: "/copy",
    description:
      "Copy Claude's last response (or a chosen earlier one) to your clipboard.",
  },
  {
    name: "/cost",
    description: "Show session cost and usage (alias for /usage).",
  },
  {
    name: "/dataviz",
    description: "Design guidance for building charts, graphs, and dashboards.",
  },
  {
    name: "/debug",
    description:
      "Turn on debug logging and troubleshoot issues from the session log.",
  },
  {
    name: "/deep-research",
    description:
      "Fan out web searches on a question and synthesize a cited report.",
  },
  {
    name: "/design-login",
    description:
      "Authorize design-system access for /design-sync with your Claude account.",
  },
  {
    name: "/design-sync",
    description:
      "Upload your repo's React design system so Claude's designs use your real components.",
  },
  {
    name: "/desktop",
    description: "Continue the current session in the Claude Code desktop app.",
  },
  {
    name: "/diff",
    description:
      "Open an interactive viewer of your uncommitted changes and per-turn diffs.",
  },
  {
    name: "/doctor",
    description:
      "Diagnose and verify your Claude Code installation and settings.",
  },
  {
    name: "/effort",
    description:
      "Set how much reasoning effort the model applies, from low up to max.",
  },
  {
    name: "/exit",
    description: "Exit the CLI; a background session keeps running.",
  },
  {
    name: "/export",
    description:
      "Export the current conversation as plain text to a file or clipboard.",
  },
  {
    name: "/fast",
    description: "Toggle fast mode on or off.",
  },
  {
    name: "/feedback",
    description: "Submit feedback, report a bug, or share your conversation.",
  },
  {
    name: "/fewer-permission-prompts",
    description:
      "Scan past sessions and add safe commands to an allowlist to reduce permission prompts.",
  },
  {
    name: "/focus",
    description:
      "Toggle a stripped-down view showing only your last prompt and Claude's final response.",
  },
  {
    name: "/fork",
    description:
      "Spawn a background subagent that inherits the conversation and works on a task while you keep going.",
  },
  {
    name: "/goal",
    description:
      "Set a goal Claude keeps working toward across turns until it is met.",
  },
  {
    name: "/heapdump",
    description:
      "Write a memory snapshot to disk for diagnosing high memory usage.",
  },
  {
    name: "/help",
    description: "Show help and the list of available commands.",
  },
  {
    name: "/hooks",
    description: "View the hook configurations that run on tool events.",
  },
  {
    name: "/ide",
    description: "Manage IDE integrations and show their status.",
  },
  {
    name: "/init",
    description: "Create a starter CLAUDE.md guide for the project.",
  },
  {
    name: "/insights",
    description:
      "Generate a report analyzing your Claude Code sessions and friction points.",
  },
  {
    name: "/install-github-app",
    description: "Install the Claude GitHub App for a repository.",
  },
  {
    name: "/install-slack-app",
    description: "Install the Claude Slack app via a browser sign-in.",
  },
  {
    name: "/keybindings",
    description: "Open your keyboard-shortcuts file to customize it.",
  },
  {
    name: "/login",
    description: "Sign in to your Anthropic account.",
  },
  {
    name: "/logout",
    description: "Sign out of your Anthropic account.",
  },
  {
    name: "/loop",
    description:
      "Run a prompt repeatedly while the session stays open, on an interval or self-paced.",
  },
  {
    name: "/mcp",
    description: "Manage MCP server connections and their authentication.",
  },
  {
    name: "/memory",
    description: "Edit your CLAUDE.md memory files and manage auto-memory.",
  },
  {
    name: "/mobile",
    description: "Show a QR code to download the Claude mobile app.",
  },
  {
    name: "/model",
    description: "Switch the AI model and save it as your default.",
  },
  {
    name: "/passes",
    description: "Share a free week of Claude Code with friends, if eligible.",
  },
  {
    name: "/permissions",
    description: "Manage the allow, ask, and deny rules for tool permissions.",
  },
  {
    name: "/plan",
    description: "Enter plan mode to design an approach before making changes.",
  },
  {
    name: "/plugin",
    description:
      "Manage Claude Code plugins: list, install, enable, or disable them.",
  },
  {
    name: "/powerup",
    description:
      "Learn Claude Code features through short interactive lessons.",
  },
  {
    name: "/pr-comments",
    description:
      "Removed; previously fetched and showed comments from a GitHub pull request.",
  },
  {
    name: "/privacy-settings",
    description: "View and update your privacy settings.",
  },
  {
    name: "/radio",
    description: "Open Claude FM lo-fi radio in your browser.",
  },
  {
    name: "/recap",
    description: "Generate a one-line summary of the current session.",
  },
  {
    name: "/release-notes",
    description: "Browse the changelog and view release notes by version.",
  },
  {
    name: "/reload-plugins",
    description: "Reload active plugins to apply changes without restarting.",
  },
  {
    name: "/reload-skills",
    description:
      "Re-scan skill directories so newly added skills become available.",
  },
  {
    name: "/remote-control",
    description: "Make this session controllable remotely from claude.ai.",
  },
  {
    name: "/remote-env",
    description: "Choose the default environment for cloud agents.",
  },
  {
    name: "/rename",
    description:
      "Rename the current session and show the name on the prompt bar.",
  },
  {
    name: "/resume",
    description:
      "Resume a past conversation by name or ID, or pick one from a list.",
  },
  {
    name: "/review",
    description: "Run a fast, read-only review of a GitHub pull request.",
  },
  {
    name: "/rewind",
    description:
      "Roll the conversation and/or code back to an earlier checkpoint.",
  },
  {
    name: "/run",
    description:
      "Launch and drive your project's app to see a change actually working.",
  },
  {
    name: "/run-skill-generator",
    description:
      "Write a per-project skill that teaches /run and /verify how to launch your app.",
  },
  {
    name: "/sandbox",
    description: "Toggle sandbox mode on supported platforms.",
  },
  {
    name: "/schedule",
    description:
      "Create and manage routines that run on a schedule in the cloud.",
  },
  {
    name: "/scroll-speed",
    description: "Adjust the mouse-wheel scroll speed interactively.",
  },
  {
    name: "/security-review",
    description: "Review pending changes for security vulnerabilities.",
  },
  {
    name: "/setup-bedrock",
    description:
      "Configure Amazon Bedrock authentication and models through a wizard.",
  },
  {
    name: "/setup-vertex",
    description:
      "Configure Google Cloud Vertex authentication and models through a wizard.",
  },
  {
    name: "/simplify",
    description:
      "Review changed code for cleanups and apply the fixes, without hunting for bugs.",
  },
  {
    name: "/skills",
    description: "List the available skills and manage their visibility.",
  },
  {
    name: "/stats",
    description: "Show usage on the Stats tab (alias for /usage).",
  },
  {
    name: "/status",
    description:
      "Show version, model, account, and connectivity on the Status tab.",
  },
  {
    name: "/statusline",
    description: "Configure the status line shown in Claude Code.",
  },
  {
    name: "/stickers",
    description: "Order Claude Code stickers.",
  },
  {
    name: "/stop",
    description:
      "Stop the current background session, keeping its transcript and worktree.",
  },
  {
    name: "/tasks",
    description: "View and manage everything running in the background.",
  },
  {
    name: "/team-onboarding",
    description: "Generate a team onboarding guide from your usage history.",
  },
  {
    name: "/teleport",
    description: "Pull a Claude Code web session into your terminal.",
  },
  {
    name: "/terminal-setup",
    description: "Configure terminal keybindings like Shift+Enter.",
  },
  {
    name: "/theme",
    description:
      "Change the color theme, including auto and accessible options.",
  },
  {
    name: "/tui",
    description:
      "Set the terminal UI renderer (default or fullscreen) and relaunch into it.",
  },
  {
    name: "/ultraplan",
    description:
      "Draft a plan in the cloud, review it in your browser, then execute it.",
  },
  {
    name: "/ultrareview",
    description:
      "Run a deep, multi-agent code review in the cloud (alias for /code-review ultra).",
  },
  {
    name: "/upgrade",
    description: "Open the page to switch to a higher plan tier.",
  },
  {
    name: "/usage",
    description: "Show session cost, plan usage limits, and activity stats.",
  },
  {
    name: "/usage-credits",
    description:
      "Configure usage credits so you can keep working after hitting a limit.",
  },
  {
    name: "/verify",
    description:
      "Confirm a change works by building and running your app, not just passing tests.",
  },
  {
    name: "/vim",
    description:
      "Removed; Vim editing mode is now set via /config, Editor mode.",
  },
  {
    name: "/voice",
    description: "Toggle voice dictation, or enable it in a specific mode.",
  },
  {
    name: "/web-setup",
    description: "Connect your GitHub account to Claude Code on the web.",
  },
  {
    name: "/workflows",
    description:
      "Open the workflow view to watch, pause, resume, or save workflows.",
  },
];

/** GET /api/explore — the complete list of Claude Code slash commands. */
export const GET = async (): Promise<NextResponse<CommandsResponse>> => {
  return NextResponse.json<CommandsResponse>({
    title: "All slash commands",
    commands: COMMANDS,
  });
};
