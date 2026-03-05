"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header({ dict, currentLang }: { dict: any, currentLang: 'en' | 'zh' }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-korami-white border-b-4 border-korami-black transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <motion.div whileHover="hover" whileTap="tap">
                        <Link href="/" className="text-korami-black font-display font-black text-2xl tracking-tight flex items-center gap-2">
                            <motion.span
                                variants={{
                                    hover: { scale: 1.05, rotate: 5, backgroundColor: "var(--korami-accentHover)", color: "var(--korami-white)" },
                                    tap: { scale: 0.95, rotate: -5 }
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="w-8 h-8 bg-korami-accent text-korami-white flex items-center justify-center border-2 border-korami-black shadow-[2px_2px_0px_0px_rgba(17,18,22,1)] text-lg"
                            >
                                K
                            </motion.span>
                            <span className="flex overflow-hidden">
                                {["K", "O", "T", "A"].map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{
                                            hover: { y: -2, color: "var(--korami-accent)" },
                                            tap: { y: 0 }
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 15,
                                            delay: i * 0.05
                                        }}
                                        className="inline-block"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        </Link>
                    </motion.div>

                    {/* System Status Indicator */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-korami-gray/10 border border-korami-black/10 rounded-full">
                        <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-xs font-bold text-korami-black/60 uppercase tracking-widest">{dict.header.systemStatus}</span>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="#how-it-works" className="text-base font-display font-bold text-korami-black/80 hover:text-korami-black transition-colors">
                        {dict.header.howItWorks}
                    </Link>
                    <Link href="#use-cases" className="text-base font-display font-bold text-korami-black/80 hover:text-korami-black transition-colors">
                        {dict.header.useCases}
                    </Link>
                    <Link href="#contact" className="text-base font-display font-bold text-korami-black/80 hover:text-korami-black transition-colors">
                        {dict.header.contact}
                    </Link>
                    <Link href="#contact" className="px-6 py-3 bg-korami-accent text-korami-white text-base font-display font-black border-2 border-korami-black hover:bg-korami-accentHover transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 shadow-neo hover:shadow-neo-hover active:translate-x-0 active:translate-y-0 active:shadow-neo">
                        {dict.header.getDemo}
                    </Link>

                    {/* Language Switcher Toggle */}
                    <div className="flex items-center space-x-1 border-2 border-korami-black p-1 bg-korami-white">
                        <Link
                            href="/en"
                            className={`px-3 py-1 font-display font-black transition-all text-sm ${currentLang === 'en' ? 'bg-korami-black text-korami-white' : 'text-korami-black/50 hover:text-korami-black'}`}
                        >
                            EN
                        </Link>
                        <Link
                            href="/zh"
                            className={`px-3 py-1 font-display font-black transition-all text-sm ${currentLang === 'zh' ? 'bg-korami-black text-korami-white' : 'text-korami-black/50 hover:text-korami-black'}`}
                        >
                            中文
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-korami-black p-2"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-korami-white border-t-4 border-korami-black">
                    <nav className="px-6 py-6 flex flex-col space-y-5">
                        <Link
                            href="#how-it-works"
                            className="text-lg font-display font-bold text-korami-black/80 hover:text-korami-black transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {dict.header.howItWorks}
                        </Link>
                        <Link
                            href="#use-cases"
                            className="text-lg font-display font-bold text-korami-black/80 hover:text-korami-black transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {dict.header.useCases}
                        </Link>
                        <Link
                            href="#contact"
                            className="text-lg font-display font-bold text-korami-black/80 hover:text-korami-black transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {dict.header.contact}
                        </Link>
                        <Link
                            href="#contact"
                            className="px-6 py-4 mt-2 bg-korami-accent text-korami-white font-display font-black text-lg border-2 border-korami-black shadow-neo text-center transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-hover active:translate-x-0 active:translate-y-0 active:shadow-neo"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {dict.header.getDemo}
                        </Link>

                        <div className="flex justify-center space-x-2 pt-6 border-t-2 border-korami-black mt-4">
                            <Link
                                href="/en"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex-1 text-center px-4 py-3 font-display font-black transition-colors text-sm border-2 border-korami-black ${currentLang === 'en' ? 'bg-korami-black text-korami-white' : 'text-korami-black bg-korami-white'}`}
                            >
                                English
                            </Link>
                            <Link
                                href="/zh"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex-1 text-center px-4 py-3 font-display font-black transition-colors text-sm border-2 border-korami-black ${currentLang === 'zh' ? 'bg-korami-black text-korami-white' : 'text-korami-black bg-korami-white'}`}
                            >
                                中文
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
