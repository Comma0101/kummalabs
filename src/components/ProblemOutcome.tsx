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
        <section className="bg-korami-white py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left: Pain */}
                    <div className="border-2 border-korami-black p-6 md:p-8 bg-korami-white shadow-neo transition-all duration-300 relative">
                        <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-l-2 border-b-2 border-korami-black bg-korami-gray/5 -mt-[2px] -mr-[2px]"></div>
                        <h2 className="text-korami-black font-display font-black text-2xl md:text-4xl mb-6 uppercase tracking-tighter leading-none">
                            {dict.problemOutcome.theProblem}
                        </h2>
                        <motion.ul
                            className="space-y-4 text-korami-black/80 text-sm md:text-lg font-bold leading-[1.6]"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {problems.map((problem: string, i: number) => (
                                <motion.li key={i} variants={itemVariants} className="flex items-start">
                                    <span className="text-red-500/70 mr-3 font-black mt-1">×</span>
                                    {problem}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* Right: Outcome */}
                    <div className="border-2 border-korami-black hover:border-korami-accent/50 p-6 md:p-8 bg-korami-black text-korami-white shadow-neo hover:shadow-neo-hover hover:-translate-y-1 hover:-translate-x-1 active:translate-x-0 active:translate-y-0 active:shadow-neo transition-all duration-300 group relative">
                        <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-l-2 border-b-2 border-korami-accent bg-korami-white/5 flex items-center justify-center -mt-[2px] -mr-[2px]">
                            <div className="w-2 h-2 rounded-full bg-korami-accent animate-pulse"></div>
                        </div>
                        <h2 className="text-korami-white font-display font-black text-2xl md:text-4xl mb-6 uppercase tracking-tighter leading-none group-hover:text-korami-accent transition-colors duration-300">
                            {dict.problemOutcome.theOutcome}
                        </h2>
                        <motion.ul
                            className="space-y-4 text-korami-white/80 text-sm md:text-lg font-bold leading-[1.6]"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {outcomes.map((outcome: string, i: number) => (
                                <motion.li key={i} variants={itemVariants} className="flex items-start">
                                    <span className="text-korami-accent mr-3 font-black mt-1">✓</span>
                                    {outcome}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t-2 border-korami-black/10 flex justify-center text-center">
                    <p className="text-korami-black/80 text-lg font-bold tracking-wide">
                        {dict.problemOutcome.bottomText}
                    </p>
                </div>
            </div>
        </section>
    );
}