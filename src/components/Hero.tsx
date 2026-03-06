"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Unplug, Printer, Headset, Zap } from "lucide-react";

export default function Hero({ dict }: { dict: any }) {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${id}`);
        }
    };

    return (
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center bg-korami-white overflow-hidden pt-16 md:pt-24 pb-20 md:pb-24">
            <div className="max-w-6xl mx-auto px-6 w-full">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        <h1 className="text-korami-black font-display font-black text-5xl md:text-7xl lg:text-[6.5rem] leading-[1] md:leading-[0.95] tracking-tighter mb-6 mx-auto max-w-[1100px]">
                            <span className="text-korami-accent">{dict.hero.answer}</span> {dict.hero.everyCall} <br className="hidden md:block" />
                            {dict.hero.capture}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
                    >
                        <p className="text-korami-black/80 text-lg md:text-2xl leading-[1.6] max-w-[42rem] mb-6 font-bold">
                            {dict.hero.description}
                        </p>
                        <p className="text-korami-black/60 text-sm md:text-lg leading-[1.6] max-w-[42rem] mb-10 md:mb-12 border-l-4 border-korami-gold pl-4 font-bold tracking-tight">
                            {dict.hero.roiMetric}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center gap-4 mb-20 md:mb-16 w-full"
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="#contact"
                                onClick={(e) => scrollToSection(e, "contact")}
                                className="px-10 py-5 bg-korami-accent text-korami-white font-black text-xl border-2 border-korami-black shadow-neo hover:shadow-neo-hover hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-neo transition-all duration-300 w-full sm:w-auto text-center"
                            >
                                {dict.hero.getDemo}
                            </Link>
                            <Link
                                href="#signature-demo"
                                onClick={(e) => scrollToSection(e, "signature-demo")}
                                className="group px-10 py-5 bg-korami-white text-korami-black font-black text-xl border-2 border-korami-black shadow-neo hover:shadow-neo-hover hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-neo transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                                    <path d="M5 3l14 9-14 9V3z" />
                                </svg>
                                {dict.hero.listenCall}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Premium Static Feature Row */}
            <div className="absolute bottom-0 left-0 w-full bg-korami-black py-6 border-t-4 border-korami-black z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 lg:gap-8 text-center divide-x-0 lg:divide-x-2 divide-korami-white/10">
                        <div className="flex flex-col items-center justify-center group cursor-default">
                            <Unplug className="w-6 h-6 text-korami-white/30 group-hover:text-korami-accent transition-colors duration-300 mb-3" />
                            <span className="text-korami-white/80 font-black text-[10px] md:text-xs tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-korami-white">{dict.hero.marquee.noPos}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center group cursor-default">
                            <Printer className="w-6 h-6 text-korami-white/30 group-hover:text-korami-white transition-colors duration-300 mb-3" />
                            <span className="text-korami-white/80 font-black text-[10px] md:text-xs tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-korami-white">{dict.hero.marquee.cloudPrinters}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center group cursor-default">
                            <Headset className="w-6 h-6 text-korami-white/30 group-hover:text-korami-white transition-colors duration-300 mb-3" />
                            <span className="text-korami-white/80 font-black text-[10px] md:text-xs tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-korami-white">{dict.hero.marquee.fallback}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center group cursor-default">
                            <Zap className="w-6 h-6 text-korami-white/30 group-hover:text-korami-gold transition-colors duration-300 mb-3" />
                            <span className="text-korami-white/80 font-black text-[10px] md:text-xs tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-korami-white">{dict.hero.marquee.multipleCalls}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}