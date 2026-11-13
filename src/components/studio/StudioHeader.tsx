import Link from "next/link";
import { INQUIRY_MAILTO } from "@/lib/studio-site";

const nav = [
  { href: "/#agents", label: "Agents" },
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/#process", label: "How we work" },
];

export function StudioHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 sm:px-6">
        <Link href="/" className="wide text-lg font-extrabold tracking-tight">
          KummaLabs
        </Link>
        <nav aria-label="Main" className="order-3 w-full sm:order-none sm:w-auto">
          <ul className="flex gap-6 text-[15px] text-graphite">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={INQUIRY_MAILTO}
          className="ml-auto rounded-full bg-ink px-4 py-2 text-[15px] font-semibold text-paper hover:bg-ink/90"
        >
          Describe your project
        </a>
      </div>
    </header>
  );
}
