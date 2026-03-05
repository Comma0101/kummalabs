"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero({ dict }: { dict: any }) {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center bg-korami-white overflow-hidden pt-24 pb-24">
            <div className="max-w-6xl mx-auto px-6 w-full">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        <h1 className="text-korami-black font-display font-black text-6xl md:text-8xl lg:text-[6.5rem] leading-[1.05] tracking-tight mb-8">
                            <span className="text-korami-accent">{dict.hero.answer}</span> {dict.hero.everyCall} <br />
                            {dict.hero.capture}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
                    >
                        <p className="text-korami-black/80 text-2xl md:text-3xl leading-relaxed max-w-2xl mb-6 font-semibold">
                            {dict.hero.description}
                        </p>
                        <p className="text-korami-black/60 text-lg md:text-xl leading-relaxed max-w-2xl mb-12 border-l-4 border-korami-gold pl-4">
                            {dict.hero.roiMetric}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center gap-4 mb-16"
                    >
                        <Link
                            href="#contact"
                            className="px-10 py-5 bg-korami-accent text-korami-white font-black text-xl border-2 border-korami-black shadow-neo hover:shadow-neo-hover hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-neo transition-all duration-150 w-full sm:w-auto text-center"
                        >
                            {dict.hero.getDemo}
                        </Link>
                        <button className="group px-10 py-5 bg-korami-white text-korami-black font-black text-xl border-2 border-korami-black shadow-neo hover:shadow-neo-hover hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-neo transition-all duration-150 w-full sm:w-auto text-center flex items-center justify-center gap-3">
                            {/* Animated Audio Wave Icon */}
                            <div className="flex items-center gap-[2px] h-5">
                                <span className="w-1 bg-korami-black h-2 group-hover:h-full transition-all duration-300 group-hover:animate-[wave_1s_ease-in-out_infinite]"></span>
                                <span className="w-1 bg-korami-black h-4 group-hover:h-3 transition-all duration-300 group-hover:animate-[wave_1s_ease-in-out_0.2s_infinite]"></span>
                                <span className="w-1 bg-korami-black h-3 group-hover:h-full transition-all duration-300 group-hover:animate-[wave_1s_ease-in-out_0.4s_infinite]"></span>
                                <span className="w-1 bg-korami-black h-5 group-hover:h-2 transition-all duration-300 group-hover:animate-[wave_1s_ease-in-out_0.6s_infinite]"></span>
                                <span className="w-1 bg-korami-black h-2 group-hover:h-full transition-all duration-300 group-hover:animate-[wave_1s_ease-in-out_0.8s_infinite]"></span>
                            </div>
                            {dict.hero.listenCall}
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Infinite Marquee */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-korami-black py-4 border-t-4 border-korami-black flex items-center">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex space-x-12 mx-6 items-center">
                            <span className="text-korami-white font-black text-xl uppercase tracking-widest">{dict.hero.marquee.noPos}</span>
                            <span className="text-korami-accent font-black text-xl">•</span>
                            <span className="text-korami-white font-black text-xl uppercase tracking-widest">{dict.hero.marquee.cloudPrinters}</span>
                            <span className="text-korami-accent font-black text-xl">•</span>
                            <span className="text-korami-white font-black text-xl uppercase tracking-widest">{dict.hero.marquee.fallback}</span>
                            <span className="text-korami-accent font-black text-xl">•</span>
                            <span className="text-korami-white font-black text-xl uppercase tracking-widest">{dict.hero.marquee.multipleCalls}</span>
                            <span className="text-korami-accent font-black text-xl">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}