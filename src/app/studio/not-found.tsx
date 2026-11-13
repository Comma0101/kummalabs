import Link from "next/link";

export default function StudioNotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h1 className="display text-4xl">This page doesn’t exist.</h1>
      <p className="mt-4 text-lg text-graphite">
        The link may be old or mistyped.{" "}
        <Link href="/" className="link text-ink">
          Go to the home page
        </Link>
        .
      </p>
    </section>
  );
}
