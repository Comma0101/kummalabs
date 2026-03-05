import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | KOTA by Kummalabs",
  description: "Terms & Conditions and SMS Program for KOTA by Kummalabs.",
};

export default function TermsConditions() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-korami-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-korami-black font-black text-5xl md:text-6xl tracking-tight mb-12">
          Terms & SMS Program
        </h1>

        <div className="space-y-8 text-korami-black/80 text-lg md:text-xl font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">Program description</h2>
            <p>
              We send transactional SMS messages related to orders and support (e.g., confirmations, status updates, and issue resolution) to users who opt in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">Message frequency</h2>
            <p>
              Message frequency varies based on order activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">Costs</h2>
            <p>
              Message and data rates may apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">Opt-out</h2>
            <p>
              Reply <strong className="text-korami-black">STOP</strong> to unsubscribe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">Help</h2>
            <p>
              Reply <strong className="text-korami-black">HELP</strong> for support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">Support contact</h2>
            <p>
              Email: <a href="mailto:support@kummalabs.com" className="underline hover:text-korami-black">support@kummalabs.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
