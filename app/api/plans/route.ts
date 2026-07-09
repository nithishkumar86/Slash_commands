import { NextResponse } from "next/server";
import type { PlansResponse } from "@/lib/types";

const PLANS_CONTENT: PlansResponse = {
  title: "Plan Mode",
  whatItIs:
    "Plan mode tells Claude to research and propose changes without making them. Claude reads files and runs read-only commands to explore your codebase, then writes up a plan — but it does not edit your source until you approve. It is the 'analyze before you edit' permission mode: reads only.",
  howToEnter: [
    "Press Shift+Tab to cycle permission modes (default → acceptEdits → plan) until you reach plan mode; the current mode shows in the status bar.",
    "Prefix a single prompt with /plan, for example: /plan fix the auth bug.",
    "Start Claude in plan mode from the CLI: claude --permission-mode plan.",
    'Make it a project default by setting "defaultMode": "plan" under permissions in .claude/settings.json.',
  ],
  workflow: [
    "Research: Claude reads files and runs read-only commands to explore, without editing any source.",
    "Propose: when the plan is ready, Claude presents it and asks how you want to proceed.",
    "Approve: you pick an option — approve and start in auto mode, approve and accept edits, or approve and review each edit manually — or keep planning by giving feedback.",
    "Execute: approving exits plan mode and switches the session to the mode you chose, and Claude starts making the changes.",
    "Tips: press Ctrl+G to open the plan in your editor and tweak it before Claude proceeds, or press Shift+Tab again to leave plan mode without approving a plan.",
  ],
  guidance: {
    useWhen: [
      "Exploring an unfamiliar codebase before you change anything.",
      "Large or risky changes where you want to review the approach first.",
      "When you want Claude to stay read-only and not touch your source until you say go.",
      "When agreeing on the right approach matters more than raw speed.",
    ],
    skipWhen: [
      "Small, obvious, low-risk edits where writing a plan just adds overhead.",
      "Quick fixes you already understand and can review directly in the diff.",
      "When you would rather use acceptEdits or auto mode so Claude works in longer uninterrupted stretches.",
    ],
  },
};

/** GET /api/plans — Plan Mode explanation, how to enter, workflow, and guidance. */
export const GET = async (): Promise<NextResponse<PlansResponse>> => {
  return NextResponse.json<PlansResponse>(PLANS_CONTENT);
};
