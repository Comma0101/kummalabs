import type { Metadata } from "next";
import Link from "next/link";
import { BriefForm } from "@/components/studio/BriefForm";
import { BUILD_FROM, REPLY_DAYS } from "@/lib/studio-offer";
import { STUDIO_EMAIL } from "@/lib/studio-site";

export const metadata: Metadata = {
  title: "Custom document extraction and validation services",
  description:
    "Turn documents into structured records with field validation and human review. Inspect a recorded menu example and scope a build around your own documents.",
  alternates: { canonical: "/services/document-extraction" },
};

export default function DocumentExtractionService() {
  return (
    <>
      <header className="mx-auto max-w-[88rem] px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
        <h1 className="display max-w-4xl text-[2.3rem] sm:text-6xl">
          Custom document extraction and validation
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          If your team copies the same fields from documents into a database or spreadsheet, we can
          build that step around the record you need. You choose which values can be checked
          against a catalog or a list of allowed choices and which need someone to read the original.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#brief" className="rounded-full bg-ink px-5 py-3 font-semibold text-paper hover:bg-ink/90">
            Scope an extraction project
          </a>
          <Link href="/work/menu-validation" className="link font-semibold">
            See a recorded validation run
          </Link>
        </div>
      </header>

      <section className="border-y border-rule bg-sheet">
        <div className="mx-auto grid max-w-[88rem] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="display max-w-sm text-3xl sm:text-4xl">What a catalog check can catch</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-graphite">
              We built a menu extraction pipeline for KOTA. This recorded run tested the validation
              step using a synthetic menu.
            </p>
          </div>
          <dl className="max-w-2xl border-t border-ink">
            <div className="border-b border-rule py-5">
              <dt className="text-lg font-bold">A suggested dish missing from the menu</dt>
              <dd className="mt-2 leading-relaxed text-graphite">
                A serving suggestion for Beef Noodle Soup recommended Mango Pudding. The dessert was
                missing from the menu’s item list, so the checker removed the suggestion.
              </dd>
            </div>
            <div className="border-b border-rule py-5">
              <dt className="text-lg font-bold">A price for a person to check</dt>
              <dd className="mt-2 leading-relaxed text-graphite">
                The soup’s price passed through at 13.95. To catch a digit misread from a photo,
                a reviewer needs to compare the extracted price with the original menu.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-[88rem] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="display max-w-sm text-3xl sm:text-4xl">Scope the first document type</h2>
          <p className="mt-4 max-w-sm leading-relaxed text-graphite">
            Custom builds start at {BUILD_FROM}. We agree on the output and acceptance tests before work begins.
          </p>
        </div>
        <dl className="max-w-2xl space-y-6">
          <div>
            <dt className="font-bold">Which documents come in?</dt>
            <dd className="mt-1 leading-relaxed text-graphite">
              Describe a typical document and one your team finds difficult to read.
            </dd>
          </div>
          <div>
            <dt className="font-bold">What should one finished record look like?</dt>
            <dd className="mt-1 leading-relaxed text-graphite">
              Name the system that receives it, the fields it requires, and the values you expect
              from one redacted example.
            </dd>
          </div>
          <div>
            <dt className="font-bold">When should a person review it?</dt>
            <dd className="mt-1 leading-relaxed text-graphite">
              Pick one error that would matter if it reached the destination. We can use that case
              to define a check and agree on who resolves it.
            </dd>
          </div>
        </dl>
      </section>

      <section id="brief" className="scroll-mt-4 border-t border-rule bg-ink text-paper">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display max-w-xl text-3xl sm:text-5xl">Describe your document workflow</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80">
              A description is enough for the first conversation. We’ll email questions or a
              proposed scope within {REPLY_DAYS} business days.
            </p>
            <p className="mt-4 leading-relaxed text-paper/80">
              Prefer email? Write to{" "}
              <a href={`mailto:${STUDIO_EMAIL}`} className="link text-paper">
                {STUDIO_EMAIL}
              </a>
              .
            </p>
          </div>
          <BriefForm />
        </div>
      </section>
    </>
  );
}
