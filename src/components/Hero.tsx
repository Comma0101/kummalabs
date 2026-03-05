"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center bg-korami-white overflow-hidden pt-24 pb-24">
            <div className="max-w-6xl mx-auto px-6 w-full">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className="text-korami-black font-black text-6xl md:text-8xl lg:text-[6.5rem] leading-[1.05] tracking-tight mb-8">
                            <span className="text-korami-accent">Answer</span> every call. <br />
                            Capture every order.
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        <p className="text-korami-black/80 text-2xl md:text-3xl leading-relaxed max-w-2xl mb-12 font-semibold">
                            KOTA answers restaurant calls during rush—takes orders and reservations, then sends confirmed details to your team via Cloud Printer or SMS.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-start gap-4 mb-16"
                    >
                        <Link
                            href="#contact"
                            className="px-10 py-5 bg-korami-accent text-korami-white font-black text-xl border-4 border-korami-black shadow-neo hover:shadow-neo-hover hover:translate-x-1 hover:translate-y-1 transition-all w-full sm:w-auto text-center"
                        >
                            Get a Demo
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Infinite Marquee */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-korami-black py-4 border-t-4 border-korami-black flex items-center">
                <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex space-x-12 mx-6 items-center">
                            <span className="text-korami-white font-black text-xl uppercase tracking-widest">NO POS INTEGRATION REQUIRED</span>
                            <span className="text-korami-accent font-black text-xl">•</span>
                            <span className="text-korami-white font-black text-xl uppercase tracking-widest">WORKS WITH CLOUD PRINTERS</span>
                            <span className="text-korami-accent font-black text-xl">•</span>
                            <span className="text-korami-white font-black text-xl uppercase tracking-widest">HUMAN FALLBACK</span>
                            <span className="text-korami-accent font-black text-xl">•</span>
                            <span className="text-korami-white font-black text-xl uppercase tracking-widest">MULTIPLE CALLS AT ONCE</span>
                            <span className="text-korami-accent font-black text-xl">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}