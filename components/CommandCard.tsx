import Link from "next/link";
import type { Section } from "@/lib/types";

interface CommandCardProps {
  section: Section;
}

/** Home-page card linking to one of the four section pages. */
const CommandCard = ({ section }: CommandCardProps) => {
  return (
    <Link
      href={`/${section.slug}`}
      className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-sky-400/60 hover:bg-white/10 hover:shadow-sky-500/10"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-sky-400">
        Topic {section.topicNumber}
      </span>
      <span className="text-lg font-semibold text-slate-100 group-hover:text-white">
        {section.title}
      </span>
      <span className="text-sm leading-relaxed text-slate-400">
        {section.blurb}
      </span>
    </Link>
  );
};

export default CommandCard;
