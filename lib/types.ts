// Shared types for the Section 4 — Commands teaching site.

/** A single slash command or session action: name + plain-English definition. */
export interface Command {
  name: string;
  description: string;
  example?: string;
}

/** One of the four teaching sub-topics, used for home-page cards and nav. */
export interface Section {
  slug: string;
  title: string;
  topicNumber: number;
  blurb: string;
}

/** Response shape for the box-layout routes: /explore, /frequent, /manage. */
export interface CommandsResponse {
  title: string;
  commands: Command[];
}

/** A when-to-use / when-to-skip guidance pair for Plan Mode. */
export interface PlanGuidance {
  useWhen: string[];
  skipWhen: string[];
}

/** Response shape for the /plans narrative route. */
export interface PlansResponse {
  title: string;
  whatItIs: string;
  howToEnter: string[];
  workflow: string[];
  guidance: PlanGuidance;
}
