import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageSquareText, ShieldCheck } from "lucide-react";
import type { Locale } from "@/dictionaries";

export const metadata: Metadata = {
  title: "SMS Messaging Terms & Opt-In Disclosure | KOTA by Kummalabs",
  description:
    "SMS opt-in disclosure and proof of consent for KOTA by Kummalabs transactional order updates.",
};

const disclosureText =
  "By providing your phone number and texting 'START', you agree to receive automated transactional text messages (e.g., order confirmations, status updates) from KOTA by Kummalabs. Consent is handled via express written opt-in. Message frequency varies. Text STOP to cancel, HELP for help. Message and data rates may apply.";

const optInConfirmationText =
  "Welcome to KOTA by Kummalabs! You've opted in for order updates. Msg & data rates may apply. Reply STOP to end.";

export default async function SmsDisclosurePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang === "zh" ? "zh" : "en") as Locale;

  return (
    <div className="min-h-screen bg-korami-white text-korami-black">
      <section className="border-b border-korami-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1fr_420px] lg:items-center lg:pb-20 lg:pt-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-korami-black/15 bg-white px-3 py-2 text-xs font-black uppercase tracking-widest text-korami-black/70">
              <ShieldCheck className="h-4 w-4 text-korami-success" aria-hidden="true" />
              Trust & Safety
            </div>
            <h1 className="font-display text-4xl font-black leading-tight tracking-normal text-korami-black md:text-6xl">
              SMS Messaging Terms & Opt-In Disclosure
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-korami-black/70 md:text-xl">
              This page documents how customers opt in to receive automated
              transactional SMS updates from KOTA by Kummalabs for restaurant
              order confirmations and status updates.
            </p>
            <div className="mt-8 grid gap-3 text-sm font-bold text-korami-black/80 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-korami-success" aria-hidden="true" />
                Express opt-in
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-korami-success" aria-hidden="true" />
                STOP supported
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-korami-success" aria-hidden="true" />
                HELP supported
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-[2rem] border-[10px] border-korami-black bg-korami-black p-3 shadow-neo">
            <div className="overflow-hidden rounded-[1.35rem] bg-[#f6f7f8]">
              <div className="flex items-center justify-between border-b border-black/10 bg-white px-5 py-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-korami-black/45">
                    SMS Preview
                  </p>
                  <p className="text-base font-black text-korami-black">KOTA Updates</p>
                </div>
                <MessageSquareText className="h-5 w-5 text-korami-accent" aria-hidden="true" />
              </div>
              <div className="space-y-4 px-4 py-6">
                <div className="ml-auto max-w-[72%] rounded-2xl rounded-br-sm bg-korami-accent px-4 py-3 text-right text-base font-black text-white">
                  START
                </div>
                <div className="max-w-[86%] rounded-2xl rounded-bl-sm border border-black/10 bg-white px-4 py-3 text-sm font-semibold leading-6 text-korami-black/80">
                  {optInConfirmationText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-korami-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-korami-accent">
              In-Restaurant Experience
            </p>
            <h2 className="mt-3 font-display text-3xl font-black text-korami-black md:text-4xl">
              Customer-facing signage before opt-in
            </h2>
            <p className="mt-5 text-lg font-medium leading-8 text-korami-black/70">
              Customers see the opt-in instruction at the point of service
              before sending the START message.
            </p>
          </div>

          <div className="border-4 border-korami-black bg-korami-white p-6 shadow-neo md:p-8">
            <div className="border border-dashed border-korami-black/30 bg-white p-6 text-center md:p-10">
              <p className="text-xs font-black uppercase tracking-widest text-korami-black/45">
                Menu Footer / Table-Top Sign
              </p>
              <p className="mt-6 font-display text-3xl font-black leading-tight text-korami-black md:text-4xl">
                Text START to 7473468149
              </p>
              <p className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-8 text-korami-black/75">
                Text START to 7473468149 to receive automated SMS updates for
                your order. Consent is not a condition of purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-korami-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 border-2 border-korami-black bg-korami-success text-white shadow-[2px_2px_0px_0px_rgba(17,18,22,1)]">
              <ShieldCheck className="m-2 h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="font-display text-3xl font-black text-korami-black">
              Disclosure
            </h2>
          </div>

          <div className="border-l-4 border-korami-accent bg-white px-6 py-6 shadow-[0_0_0_1px_rgba(17,18,22,0.08)] md:px-8">
            <p className="text-lg font-semibold leading-9 text-korami-black/80">
              {disclosureText}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-korami-border pt-8 text-sm font-bold text-korami-black/70 sm:flex-row sm:items-center sm:justify-between">
            <p>KOTA by Kummalabs transactional SMS program.</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/privacy-policy`}
                className="underline decoration-korami-accent decoration-2 underline-offset-4 hover:text-korami-black"
              >
                Privacy Policy
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="underline decoration-korami-accent decoration-2 underline-offset-4 hover:text-korami-black"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
