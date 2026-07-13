"use client";

import { useEffect, useState } from "react";
import SectionNav from "@/components/SectionNav";
import type { PlansResponse } from "@/lib/types";

/** Client page for /plans: narrative explanation of Plan Mode with a use/skip comparison. */
const PlansPage = () => {
  const [plans, setPlans] = useState<PlansResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const loadPlans = async (): Promise<void> => {
      try {
        const res = await fetch("/api/plans");
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data: PlansResponse = await res.json();
        setPlans(data);
      } catch (error) {
        console.error("Failed to load Plan Mode content:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPlans();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <SectionNav current="plans" />

      {isLoading ? (
        <p className="text-slate-400">Loading Plan Mode…</p>
      ) : hasError ? (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          Sorry, we couldn&apos;t load the Plan Mode content. Please refresh the
          page to try again.
        </p>
      ) : plans === null ? (
        <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-slate-300">
          No Plan Mode content is available right now.
        </p>
      ) : (
        <article className="space-y-10">
          <header>
            <h1 className="text-gradient mb-3 text-4xl font-bold">
              {plans.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
              {plans.whatItIs}
            </p>
          </header>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              How to enter it
            </h2>
            <ul className="space-y-2 text-slate-300">
              {plans.howToEnter.map((step) => (
                <li key={step} className="flex gap-3 leading-relaxed">
                  <span className="mt-1 text-sky-400" aria-hidden="true">
                    •
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              How it works
            </h2>
            <ol className="space-y-2 text-slate-300">
              {plans.workflow.map((step, index) => (
                <li key={step} className="flex gap-3 leading-relaxed">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-400/40 text-base text-sky-300">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              When to use it vs. when to skip it
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-5">
                <h3 className="mb-3 text-xl font-semibold text-emerald-200">
                  When to use Plan Mode
                </h3>
                <ul className="space-y-2 text-emerald-50/90">
                  {plans.guidance.useWhen.map((item) => (
                    <li key={item} className="flex gap-2 leading-relaxed">
                      <span
                        className="mt-0.5 text-emerald-300"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-5">
                <h3 className="mb-3 text-xl font-semibold text-amber-200">
                  When to skip it
                </h3>
                <ul className="space-y-2 text-amber-50/90">
                  {plans.guidance.skipWhen.map((item) => (
                    <li key={item} className="flex gap-2 leading-relaxed">
                      <span
                        className="mt-0.5 text-amber-300"
                        aria-hidden="true"
                      >
                        ✕
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </article>
      )}
    </main>
  );
};

export default PlansPage;
