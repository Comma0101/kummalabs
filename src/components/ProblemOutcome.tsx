"use client";

import { motion } from "framer-motion";

export default function ProblemOutcome({ dict }: { dict: any }) {
    const problems = dict.problemOutcome.problems;
    const outcomes = dict.problemOutcome.outcomes;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10, filter: 'blur(4px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="bg-korami-white py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Pain */}
                    <div className="border-4 border-korami-black p-8 md:p-12 bg-korami-white shadow-[0_0_0_0_rgba(17,18,22,0)] transition-all duration-300">
                        <h2 className="text-korami-black font-display font-black text-4xl md:text-5xl mb-8 uppercase tracking-tight">
                            {dict.problemOutcome.theProblem}
                        </h2>
                        <motion.ul
                            className="space-y-4 text-korami-black/60 text-lg font-bold leading-relaxed"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {problems.map((problem: string, i: number) => (
                                <motion.li key={i} variants={itemVariants} className="flex items-start">
                                    <span className="text-red-500/70 mr-4 font-black mt-1">×</span>
                                    {problem}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* Right: Outcome */}
                    <div className="border-4 border-korami-black/20 hover:border-korami-accent/50 p-8 md:p-12 bg-korami-black text-korami-white shadow-2xl hover:shadow-[0_20px_50px_rgba(225,55,37,0.15)] transition-all duration-500 transform hover:-translate-y-1 group">
                        <h2 className="text-korami-white font-display font-black text-4xl md:text-5xl mb-10 uppercase tracking-tight group-hover:text-korami-accent transition-colors duration-500">
                            {dict.problemOutcome.theOutcome}
                        </h2>
                        <motion.ul
                            className="space-y-8 text-korami-white/90 text-xl font-bold leading-relaxed"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {outcomes.map((outcome: string, i: number) => (
                                <motion.li key={i} variants={itemVariants} className="flex items-start">
                                    <span className="text-korami-accent mr-5 font-black mt-1 text-2xl">✓</span>
                                    {outcome}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </div>

                {/* Bottom line - conversion message */}
                <div className="mt-16 pt-8 border-t border-korami-black/10 flex justify-center text-center">
                    <p className="text-korami-black/60 text-xl font-bold tracking-wide">
                        {dict.problemOutcome.bottomText}
                    </p>
                </div>
            </div>
        </section>
    );
}