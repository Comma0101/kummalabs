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
                    <div className="border-4 border-korami-black p-8 md:p-12 shadow-neo bg-white">
                        <h2 className="text-amber-600 font-display font-black text-4xl md:text-5xl mb-8 uppercase tracking-tight">
                            {dict.problemOutcome.theProblem}
                        </h2>
                        <motion.ul
                            className="space-y-6 text-amber-900/80 text-xl font-bold leading-relaxed"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {problems.map((problem: string, i: number) => (
                                <motion.li key={i} variants={itemVariants} className="flex items-start">
                                    <span className="text-amber-600 mr-4 font-black">×</span>
                                    {problem}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* Right: Outcome */}
                    <div className="border-4 border-korami-black p-8 md:p-12 shadow-neo bg-korami-trustBlue text-korami-white">
                        <h2 className="text-korami-accent font-display font-black text-4xl md:text-5xl mb-8 uppercase tracking-tight">
                            {dict.problemOutcome.theOutcome}
                        </h2>
                        <motion.ul
                            className="space-y-6 text-korami-white/90 text-xl font-bold leading-relaxed"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {outcomes.map((outcome: string, i: number) => (
                                <motion.li key={i} variants={itemVariants} className="flex items-start">
                                    <span className="text-korami-accent mr-4 font-black">✓</span>
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