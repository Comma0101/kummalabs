import type { Metadata } from "next";
import { Inter, Space_Grotesk, Noto_Sans_SC } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary, Locale } from "@/dictionaries";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const noto = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "KOTA by Kummalabs - Never Miss a Phone Order Again",
  description: "KOTA handles phone orders and reservations when your staff is busy—then sends confirmed details to your kitchen.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${space.variable} ${noto.variable} antialiased bg-korami-white text-korami-black`}
        suppressHydrationWarning
      >
        <Header dict={dict} currentLang={locale} />
        <main>{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
