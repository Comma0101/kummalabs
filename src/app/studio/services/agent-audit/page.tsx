import type { Metadata } from "next";
import Link from "next/link";
import { BriefForm } from "@/components/studio/BriefForm";
import { AUDIT, CREDIT_DAYS, REPLY_DAYS } from "@/lib/studio-offer";
import { STUDIO_EMAIL } from "@/lib/studio-site";

export const metadata: Metadata = {
  title: "AI agent reliability audit for tool calls and integrations",
  description: `Find out why an AI agent confirms missing records or repeats actions. Audit up to ${AUDIT.maxFlows} tools or integrations for ${AUDIT.price}, with a written fix plan.`,
  alternates: { canonical: "/services/agent-audit" },
};

const checks = [
  {
    question: "Did the action the agent confirmed actually happen?",
    detail: "We compare the agent’s reply with the tool result and the record in your system. We check what the agent tells the user when a write fails.",
  },
  {
    question: "What happens when the same request arrives twice?",
    detail: "We repeat an agreed test action and count the records or messages it produces. That shows whether a retry can create a second booking, order, or notification.",
  },
  {
    question: "Who can call the agent’s tools?",
    detail: "We check that the endpoints in scope reject unauthenticated and forged requests before they can take a business action.",
  },
];

export default function AgentAuditService() {
  return (
    <>
      <header className="mx-auto grid max-w-[88rem] gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:pt-20">
        <div>
          <h1 className="display max-w-3xl text-[2.3rem] sm:text-6xl">AI agent reliability audit</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
            If your agent confirms an order nobody can find, or a retry creates two bookings,
            we trace the action from the conversation through the tool call to the record in
            your system. You can see where it went wrong and what to fix first.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#brief" className="rounded-full bg-ink px-5 py-3 font-semibold text-paper hover:bg-ink/90">
              Request an audit
            </a>
            <Link href="/work/sample-diagnostic" className="link font-semibold">Read a sample report</Link>
          </div>
        </div>
        <dl className="max-w-md space-y-4 border-l-2 border-ink pl-5">
          <div>
            <dt className="text-sm text-graphite">Fixed fee</dt>
            <dd className="mt-1 text-3xl font-bold">{AUDIT.price}</dd>
          </div>
          <div>
            <dt className="text-sm text-graphite">Scope</dt>
            <dd className="mt-1">One agent and up to {AUDIT.maxFlows} tools or integrations it calls</dd>
          </div>
          <div>
            <dt className="text-sm text-graphite">Delivery</dt>
            <dd className="mt-1">{AUDIT.deliveryDays} business days</dd>
          </div>
        </dl>
      </header>

      <section className="border-y border-rule bg-sheet">
        <div className="mx-auto grid max-w-[88rem] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-[15px] text-graphite">Recorded internal diagnostic · Synthetic order</p>
            <h2 className="display mt-2 max-w-lg text-3xl sm:text-4xl">The database write failed. KOTA confirmed the order.</h2>
          </div>
          <div className="max-w-prose space-y-4 leading-relaxed">
            <p>
              In a test of our phone-ordering agent, we made the database reject a save. The tool
              returned no order number. The agent cleared the cart and sent a confirmation to the
              test messaging service anyway.
            </p>
            <p className="text-graphite">
              The report gives the engineer an acceptance test for the fix. With the same failure,
              the cart should stay intact, the confirmation should be withheld, and an alert should
              record the failed save.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[88rem] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="display text-3xl sm:text-4xl">What we test</h2>
          <p className="mt-4 max-w-md leading-relaxed text-graphite">
            We agree on the tools and expected outcomes in writing and run the checks against your
            test data. You get the findings, the evidence behind them, and a fix plan with a fixed
            price for each group of repairs.
          </p>
        </div>
        <dl className="border-t border-ink">
          {checks.map(({ question, detail }) => (
            <div key={question} className="border-b border-rule py-5">
              <dt className="font-bold">{question}</dt>
              <dd className="mt-1 max-w-prose leading-relaxed text-graphite">{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="brief" className="scroll-mt-4 border-t border-rule bg-ink text-paper">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="max-w-xl">
            <h2 className="display text-3xl sm:text-4xl">Request an agent audit</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              Describe one failure, the tool involved, and the result you expected. Yang will reply
              within {REPLY_DAYS} business days with questions or a proposed scope.
            </p>
            <p className="mt-4 leading-relaxed text-paper/80">
              The audit is paid in full before work starts. Its fee is credited toward a build that
              starts within {CREDIT_DAYS} days.
            </p>
            <a href={`mailto:${STUDIO_EMAIL}`} className="link mt-5 inline-block text-paper">{STUDIO_EMAIL}</a>
          </div>
          <BriefForm />
        </div>
      </section>
    </>
  );
}
