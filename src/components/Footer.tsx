import Link from "next/link";
import type { Locale } from "@/dictionaries";

export default function Footer({
    dict,
    currentLang,
}: {
    dict: any;
    currentLang: Locale;
}) {
    return (
        <footer className="bg-korami-black py-12 border-t border-korami-white/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6 md:flex-row md:justify-between md:items-center text-korami-white/40 text-sm">
                <div>
                    <div className="mb-2">
                        {dict.footer.copyright}
                    </div>
                    <div className="text-xs">
                        {dict.footer.builtWith}
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold">
                    <Link href={`/${currentLang}/privacy-policy`} className="hover:text-korami-white transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href={`/${currentLang}/terms`} className="hover:text-korami-white transition-colors">
                        Terms of Service
                    </Link>
                    <Link href={`/${currentLang}/sms-disclosure`} className="hover:text-korami-white transition-colors">
                        SMS Disclosure
                    </Link>
                </div>
            </div>
        </footer>
    );
}
