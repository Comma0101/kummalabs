import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KOTA by Kummalabs",
  description: "Privacy Policy for KOTA by Kummalabs.",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-korami-white pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-korami-black font-black text-5xl md:text-6xl tracking-tight mb-12">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-korami-black/80 text-lg md:text-xl font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">1. What we collect</h2>
            <p>
              We may collect phone numbers, message content, order-related information (e.g., items selected), and basic usage data when you interact with our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">2. How we use data</h2>
            <p>
              We use data to provide and improve ordering/support services, send transactional messages you request (e.g., order confirmations and status updates), troubleshoot issues, and maintain security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">3. Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with service providers that help us operate messaging and ordering (e.g., SMS/telephony providers) only as needed to provide the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">4. Data retention</h2>
            <p>
              We retain data only as long as necessary for service operations, compliance, and dispute resolution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">5. Your choices</h2>
            <p>
              You may opt out of SMS messages at any time by replying <strong className="text-korami-black">STOP</strong>. For help, reply <strong className="text-korami-black">HELP</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">6. Contact</h2>
            <p>
              Contact us at: <a href="mailto:support@kummalabs.com" className="underline hover:text-korami-black">support@kummalabs.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-korami-black mb-4">7. Updates</h2>
            <p>
              We may update this policy from time to time by posting a revised version on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
