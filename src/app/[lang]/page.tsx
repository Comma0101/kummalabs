import Hero from "@/components/Hero";
import SignatureDemo from "@/components/SignatureDemo";
import ProblemOutcome from "@/components/ProblemOutcome";
import HowItWorks from "@/components/HowItWorks";
import MenuOnboarding from "@/components/MenuOnboarding";
import UseCases from "@/components/UseCases";
import SafetyHandoff from "@/components/SafetyHandoff";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
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
      <ProblemOutcome dict={dict} />
      <HowItWorks dict={dict} />
      <SignatureDemo dict={dict} />
      <MenuOnboarding dict={dict} />
      <UseCases dict={dict} />
      <SafetyHandoff dict={dict} />
      <FAQ dict={dict} />
      <CTA dict={dict} />
    </div>
  );
}
