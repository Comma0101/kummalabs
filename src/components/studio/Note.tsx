import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { STUDIO_URL } from "@/lib/studio-site";
import { DIAGNOSTIC } from "@/lib/studio-offer";
import { formatNoteDate, getNote, notePath } from "@/lib/studio-notes";

const REPO = "https://github.com/Comma0101/kummalabs/blob/master/";

export function noteMetadata(slug: string): Metadata {
  const note = getNote(slug);
  return {
    title: note.searchTitle,
    description: note.summary,
    alternates: { canonical: notePath(slug) },
  };
}

/** One row of the record beside a note: where its evidence comes from and what was left out. */
export type RecordRow = { label: string; value: ReactNode };

export function NoteShell({ slug, record, children }: { slug: string; record: RecordRow[]; children: ReactNode }) {
  const note = getNote(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: note.title,
    description: note.summary,
    datePublished: note.date,
    mainEntityOfPage: `${STUDIO_URL}${notePath(slug)}`,
    author: { "@type": "Person", name: "Yang Wu" },
    publisher: { "@type": "Organization", name: "KummaLabs", url: STUDIO_URL },
  };

  return (
    <article>
      <header className="mx-auto max-w-[88rem] px-4 pb-12 pt-14 sm:px-6 lg:pt-20">
        <p className="text-[15px] text-graphite">
          <Link href="/notes" className="link">
            Notes
          </Link>
        </p>
        <h1 className="display mt-3 max-w-4xl text-[2.1rem] sm:text-5xl">{note.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">{note.summary}</p>
      </header>

      <div className="border-t border-ink">
        <div className="mx-auto grid max-w-[88rem] grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-10 px-4 py-12 sm:px-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <aside aria-label="About this note" className="lg:sticky lg:top-8 lg:self-start">
            <dl className="space-y-5 border-l-2 border-ink pl-5 text-[15px]">
              <div>
                <dt className="text-graphite">Written</dt>
                <dd className="mt-0.5">
                  <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
                </dd>
              </div>
              {record.map((row) => (
                <div key={row.label}>
                  <dt className="text-graphite">{row.label}</dt>
                  <dd className="mt-0.5 leading-snug">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
          <div className="note-body">{children}</div>
        </div>
      </div>

      <section className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Want this checked on your agent?</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              An integration diagnostic is {DIAGNOSTIC.price}, fixed. You get a written report with the evidence for each
              finding within {DIAGNOSTIC.deliveryDays} business days of access being ready.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/#brief" className="rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90">
              Describe your project
            </Link>
            <Link href="/work/sample-diagnostic" className="link text-paper">
              Read a sample report
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // Built from constants in studio-notes.ts, no user input; `<` escaped so the JSON can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </article>
  );
}

/** Source code, shown exactly as it is in the repository. `file` is a repo-relative path. */
export function Code({ file, caption, children }: { file?: string; caption?: string; children: string }) {
  return (
    <figure className="note-wide">
      {(file || caption) && (
        <figcaption className="text-[14px] text-graphite">
          {file ? (
            <a className="link" href={`${REPO}${file}`}>
              {file}
            </a>
          ) : null}
          {file && caption ? ", " : null}
          {caption}
        </figcaption>
      )}
      <pre
        tabIndex={0}
        aria-label={file ? `Code from ${file}` : "Code"}
        className="mt-2 overflow-x-auto border border-rule bg-sheet p-4 font-mono text-[13.5px] leading-relaxed"
      >
        <code>{children}</code>
      </pre>
    </figure>
  );
}

/** Output copied from a real run. Never edit the text by hand: re-run and paste. */
export function Recorded({ label, tone = "fail", children }: { label: string; tone?: "fail" | "pass"; children: string }) {
  return (
    <figure>
      <figcaption className="text-[14px] text-graphite">{label}</figcaption>
      <p
        className={`mt-1 whitespace-pre-wrap break-words border-l-2 pl-5 font-mono text-[14px] leading-relaxed ${
          tone === "pass" ? "border-pass" : "border-mark"
        }`}
      >
        {children}
      </p>
    </figure>
  );
}
