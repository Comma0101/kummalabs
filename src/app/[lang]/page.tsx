import Hero from "@/components/Hero";
import ProblemOutcome from "@/components/ProblemOutcome";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import SafetyHandoff from "@/components/SafetyHandoff";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import SocialProof from "@/components/SocialProof";
import { getDictionary, Locale } from "@/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col w-full">
      <Hero dict={dict} />
      <SocialProof dict={dict} />
      <ProblemOutcome dict={dict} />
      <HowItWorks dict={dict} />
      <UseCases dict={dict} />
      <SafetyHandoff dict={dict} />
      <CTA dict={dict} />
      <section id="contact" className="bg-korami-black py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ContactForm dict={dict} />
        </div>
      </section>
    </div>
  );
}
