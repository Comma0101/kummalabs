import Hero from "@/components/Hero";
import ProblemOutcome from "@/components/ProblemOutcome";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import SafetyHandoff from "@/components/SafetyHandoff";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ProblemOutcome />
      <HowItWorks />
      <UseCases />
      <SafetyHandoff />
      <CTA />
      <section id="contact" className="bg-korami-black py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
