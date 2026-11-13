import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./studio.css";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { STUDIO_EMAIL, STUDIO_URL } from "@/lib/studio-site";

// Root layout for the KummaLabs studio site, served on kummalabs.com via src/middleware.ts.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "KummaLabs builds, connects, and fixes custom AI agents that do real work inside business systems: email and lead handling, document extraction, CRM, API and MCP integrations, research, and phone. English and 中文.";

export const metadata: Metadata = {
  metadataBase: new URL(STUDIO_URL),
  title: {
    default: "KummaLabs — AI agent engineering",
    template: "%s — KummaLabs",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: STUDIO_URL,
    siteName: "KummaLabs",
    title: "KummaLabs — AI agent engineering",
    description,
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "KummaLabs: AI agents that do real work inside your business systems" },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#f4f5f0",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "KummaLabs",
  url: STUDIO_URL,
  email: STUDIO_EMAIL,
  description,
  founder: { "@type": "Person", name: "Yang Wu", alternateName: "Kumma" },
  knowsLanguage: ["en", "zh"],
  serviceType: ["AI agent development", "AI agent integration", "AI agent debugging and testing"],
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-sheet focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <StudioHeader />
        <main id="main">{children}</main>
        <StudioFooter />
        <script
          type="application/ld+json"
          // Static constant, no user input; `<` escaped so the JSON can't close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
