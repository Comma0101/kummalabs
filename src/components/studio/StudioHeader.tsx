import Link from "next/link";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/agencies", label: "For agencies" },
];

export function StudioHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-[88rem] flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 sm:px-6">
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
        <Link
          href="/#brief"
          className="ml-auto rounded-full bg-ink px-4 py-2 text-[15px] font-semibold text-paper hover:bg-ink/90"
        >
          Describe your project
        </Link>
      </div>
    </header>
  );
}
