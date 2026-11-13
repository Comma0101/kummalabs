import type { Metadata } from "next";
import Link from "next/link";
import { formatNoteDate, notePath, notes } from "@/lib/studio-notes";

export const metadata: Metadata = {
  title: "Engineering notes: what breaks behind an AI agent, and what fixes it",
  description:
    "Short write-ups from KummaLabs on the code behind AI agents: confirmations that don’t match the database, duplicate bookings, webhook checks. Each one is built on tests we ran, with the output quoted exactly.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <header className="mx-auto max-w-[88rem] px-4 pb-12 pt-14 sm:px-6 lg:pt-20">
        <h1 className="display max-w-4xl text-[2.4rem] sm:text-6xl">Notes</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          Things we have tested, mostly in the code behind an agent: what broke, how we found it, and what fixed it.
          Every quoted output is copied from a real run, and each note says what it did not test.
        </p>
      </header>

      <ul className="border-t border-ink">
        {sorted.map((note) => (
          <li key={note.slug} className="border-b border-rule">
            <div className="mx-auto grid max-w-[88rem] gap-x-16 gap-y-4 px-4 py-12 sm:px-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
              <p className="text-[15px] text-graphite">
                <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
              </p>
              <div className="max-w-[44rem]">
                <h2 className="wide text-2xl font-extrabold leading-snug sm:text-3xl">
                  <Link href={notePath(note.slug)} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                    {note.title}
                  </Link>
                </h2>
                <p className="mt-4 text-lg leading-relaxed">{note.summary}</p>
                <p className="mt-3 leading-relaxed text-graphite">Built on: {note.basis}.</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Seeing one of these in your own agent?</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">Tell us what it does today and where it goes wrong.</p>
          </div>
          <Link href="/#brief" className="self-start rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90 lg:self-auto">
            Describe your project
          </Link>
        </div>
      </section>
    </>
  );
}
