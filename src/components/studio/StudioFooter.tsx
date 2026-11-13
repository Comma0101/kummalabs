import Link from "next/link";
import { KOTA_URL, STUDIO_EMAIL } from "@/lib/studio-site";

export function StudioFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto grid max-w-[88rem] gap-6 px-4 py-10 text-[15px] text-graphite sm:grid-cols-[1fr_auto] sm:px-6">
        <p className="max-w-prose">
          KummaLabs is an engineering studio run by Yang Wu (Kumma). We build, connect, and improve
          AI agents that do real work inside business systems. English and 中文.
        </p>
        <ul className="space-y-1 sm:text-right">
          <li>
            <a className="link text-ink" href={`mailto:${STUDIO_EMAIL}`}>
              {STUDIO_EMAIL}
            </a>
          </li>
          <li>
            <Link className="link" href="/work">
              Work
            </Link>
          </li>
          <li>
            <Link className="link" href="/notes">
              Notes
            </Link>
          </li>
          <li>
            <a className="link" href={KOTA_URL}>
              KOTA product site
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
