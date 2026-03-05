"use client";

import { motion } from "framer-motion";

export default function ProblemOutcome() {
    const problems = [
        "Missed calls during rush hours",
        "Staff stuck on the phone instead of serving customers",
        "Wrong or missed items leading to refunds and bad reviews",
        "Only one call can be handled at a time",
        "Language barriers cause misunderstandings and slow service"
    ];

    const outcomes = [
        "Calls answered automatically, every time",
        "Orders captured consistently with confirmation",
        "Staff stays focused on in-person service",
        "Handles multiple calls at once",
        "Supports English and Mandarin"
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="bg-korami-white py-24 border-t-4 border-korami-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Pain */}
                    <div className="border-4 border-korami-black p-8 md:p-12 shadow-neo bg-white">
                        <h2 className="text-amber-600 font-black text-4xl md:text-5xl mb-8 uppercase tracking-tight">
                            The Problem
                        </h2>
                        <motion.ul 
                            className="space-y-6 text-amber-900/80 text-xl font-bold leading-relaxed"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {problems.map((problem, i) => (
                                <motion.li key={i} variants={itemVariants} className="flex items-start">
                                    <span className="text-amber-600 mr-4 font-black">×</span>
                                    {problem}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* Right: Outcome */}
                    <div className="border-4 border-korami-black p-8 md:p-12 shadow-neo bg-korami-black text-korami-white">
                        <h2 className="text-korami-accent font-black text-4xl md:text-5xl mb-8 uppercase tracking-tight">
                            The Outcome
                        </h2>
                        <motion.ul 
                            className="space-y-6 text-korami-white/90 text-xl font-bold leading-relaxed"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {outcomes.map((outcome, i) => (
                                <motion.li key={i} variants={itemVariants} className="flex items-start">
                                    <span className="text-korami-accent mr-4 font-black">✓</span>
                                    {outcome}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </div>

                {/* Bottom line - conversion message */}
                <div className="mt-16 pt-8 border-t-4 border-korami-black flex justify-center text-center">
                    <p className="text-korami-black text-xl font-black uppercase tracking-wide">
                        No POS integration required. Orders delivered via Cloud Printer or SMS.
                    </p>
                </div>
            </div>
        </section>
    );
}