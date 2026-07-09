import Link from "next/link";

interface SectionNavProps {
  current: string;
}

const SECTIONS = [
  { slug: "explore", label: "Explore" },
  { slug: "frequent", label: "Frequent" },
  { slug: "plans", label: "Plan Mode" },
  { slug: "manage", label: "Manage" },
];

/** Back-to-home link plus cross-links to the other three sections. */
const SectionNav = ({ current }: SectionNavProps) => {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-3 text-sm">
      <Link
        href="/"
        className="rounded-md border border-white/15 px-3 py-1.5 text-slate-200 hover:bg-white/10"
      >
        ← Home
      </Link>
      {SECTIONS.filter((section) => section.slug !== current).map((section) => (
        <Link
          key={section.slug}
          href={`/${section.slug}`}
          className="rounded-md px-3 py-1.5 text-slate-400 hover:text-slate-100"
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
};

export default SectionNav;
