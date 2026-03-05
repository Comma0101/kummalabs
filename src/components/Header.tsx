"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-korami-white/90 backdrop-blur-md border-b-4 border-korami-black">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="text-korami-black font-black text-2xl tracking-tight flex items-center gap-2">
                        <span className="w-8 h-8 bg-korami-accent text-korami-white flex items-center justify-center rounded-lg text-lg">K</span>
                        KOTA
                    </Link>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="#how-it-works" className="text-base font-bold text-korami-black hover:text-korami-gray transition-colors">
                        How it Works
                    </Link>
                    <Link href="#use-cases" className="text-base font-bold text-korami-black hover:text-korami-gray transition-colors">
                        Use Cases
                    </Link>
                    <Link href="#contact" className="text-base font-bold text-korami-black hover:text-korami-gray transition-colors">
                        Contact
                    </Link>
                    <Link href="#contact" className="px-6 py-3 bg-korami-accent text-korami-white text-base font-black rounded-lg hover:bg-korami-accentHover transition-all hover:scale-105 border-2 border-korami-accent hover:border-korami-accentHover shadow-md">
                        Get a Demo
                    </Link>
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
                <div className="md:hidden bg-korami-white border-t border-korami-border">
                    <nav className="px-6 py-4 flex flex-col space-y-4">
                        <Link
                            href="#how-it-works"
                            className="text-base font-bold text-korami-black hover:text-korami-gray transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            How it Works
                        </Link>
                        <Link
                            href="#use-cases"
                            className="text-base font-bold text-korami-black hover:text-korami-gray transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Use Cases
                        </Link>
                        <Link
                            href="#contact"
                            className="text-base font-bold text-korami-black hover:text-korami-gray transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            href="#contact"
                            className="px-6 py-3 bg-korami-accent text-korami-white text-base font-black rounded-lg hover:bg-korami-accentHover transition-all text-center border-2 border-korami-accent hover:border-korami-accentHover shadow-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get a Demo
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
