import CommandCard from "@/components/CommandCard";
import type { Section } from "@/lib/types";

const SECTIONS: Section[] = [
  {
    slug: "explore",
    title: "Explore all slash commands",
    topicNumber: 18,
    blurb:
      "The full list of Claude Code slash commands, each with a plain-English definition.",
  },
  {
    slug: "frequent",
    title: "Frequently used commands",
    topicNumber: 19,
    blurb:
      "The handful of commands you reach for every day, and why they matter.",
  },
  {
    slug: "plans",
    title: "Plan Mode",
    topicNumber: 20,
    blurb:
      "What Plan Mode is, how to enter it, and when to use it versus skip it.",
  },
  {
    slug: "manage",
    title: "Managing sessions",
    topicNumber: 21,
    blurb:
      "Resume, rename, rewind, branch, and export your Claude Code sessions.",
  },
];

const TODAYS_TOPICS = [
  "18 — Explore all slash commands",
  "19 — Frequently used commands",
  "20 — Plan Mode",
  "21 — Managing sessions",
];

const Home = () => {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-sky-400">
          Section 4
        </p>
        <h1 className="mb-4 text-4xl font-bold text-white">Commands</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
          A quick tour of Claude Code&apos;s slash commands, Plan Mode, and
          session management — the tools you use to steer a coding session.
        </p>
      </header>

      <section className="mb-12 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <CommandCard key={section.slug} section={section} />
        ))}
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Today&apos;s topics
        </h2>
        <ul className="space-y-2">
          {TODAYS_TOPICS.map((topic) => (
            <li key={topic} className="text-slate-200">
              {topic}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
