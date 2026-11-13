import type { Metadata } from "next";
import Link from "next/link";
import { INQUIRY_MAILTO } from "@/lib/studio-site";
import { work } from "@/lib/studio-work";

export const metadata: Metadata = {
  title: "Work: AI agents we’ve built",
  description:
    "AI agents and agent infrastructure built by KummaLabs: a bilingual phone-ordering agent, document extraction with validation, a research agent that checks its sources, an approval-gated outreach pipeline, and an open-source agent runtime.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 lg:pt-20">
        <h1 className="display max-w-4xl text-[2.4rem] sm:text-6xl">Agents we’ve built</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          Prototypes, internal tools, and open source. Each is labeled for what it is, and none is
          presented as a client deployment. Test counts are from our own runs of each project’s
          suite.
        </p>
      </header>

      <div className="border-t border-ink">
        {work.map((w) => (
          <section key={w.id} id={w.id} className="scroll-mt-6 border-b border-rule">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2fr]">
              <div>
                <p className="text-[15px] text-graphite">{w.status}</p>
                <h2 className="display mt-2 text-3xl sm:text-4xl">{w.name}</h2>
                <p className="mt-2 text-lg text-graphite">{w.kind}</p>
              </div>
              <div className="max-w-prose space-y-6">
                <p className="text-lg leading-relaxed">{w.shows}</p>
                <div>
                  <h3 className="font-semibold">What it does</h3>
                  <p className="mt-1 leading-relaxed text-graphite">{w.does}</p>
                </div>
                <div>
                  <h3 className="font-semibold">How it’s built</h3>
                  <p className="mt-1 leading-relaxed text-graphite">{w.built}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Evidence</h3>
                  <p className="mt-1 leading-relaxed text-graphite">{w.evidence}</p>
                </div>
                {w.link &&
                  (w.link.href.startsWith("/") ? (
                    <Link href={w.link.href} className="link inline-block font-semibold">
                      {w.link.label}
                    </Link>
                  ) : (
                    <a href={w.link.href} className="link inline-block font-semibold">
                      {w.link.label}
                    </a>
                  ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Need an agent like one of these?</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              Tell us what happens today and what a good result looks like.
            </p>
          </div>
          <a href={INQUIRY_MAILTO} className="self-start rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90 lg:self-auto">
            Describe your project
          </a>
        </div>
      </section>
    </>
  );
}
