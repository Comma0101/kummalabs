"use client";

import { motion } from "framer-motion";

export default function HowItWorks({ dict }: { dict: any }) {
    const steps = dict.howItWorks.steps.map((step: any, index: number) => ({
        number: (index + 1).toString(),
        title: step.title,
        description: step.description
    }));

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
        hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section id="how-it-works" className="bg-korami-white py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-korami-black font-display font-black text-5xl md:text-6xl mb-6 tracking-tight">
                        {dict.howItWorks.title}
                    </h2>
                    <p className="text-korami-black/80 text-2xl font-semibold max-w-3xl mx-auto leading-relaxed mb-4">
                        {dict.howItWorks.subtitle}
                    </p>
                    <p className="text-korami-black/70 text-xl font-semibold max-w-3xl mx-auto">
                        {dict.howItWorks.description}
                    </p>
                </div>

                <motion.div
                    className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {steps.map((step: any, index: number) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="h-full"
                        >
                            <div className="relative h-full bg-korami-white border-4 border-korami-black p-8 shadow-neo hover:shadow-neo-hover transition-all duration-150 hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0 active:translate-y-0 active:shadow-neo overflow-hidden">
                                {/* Oversized Background Number */}
                                <div className="absolute -top-10 -right-4 text-[12rem] font-black text-korami-black opacity-5 pointer-events-none select-none">
                                    {step.number}
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-korami-black font-display font-black text-3xl mb-4">
                                        <span className="text-korami-accent mr-2">{step.number}.</span>
                                        {step.title}
                                    </h3>
                                    <p className="text-korami-black/80 text-lg leading-relaxed font-bold">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Setup instruction */}
                <div className="text-center pt-12 border-t border-korami-black/10">
                    <p className="text-korami-black/60 text-xl font-bold">
                        {dict.howItWorks.setupInstruction}
                    </p>
                </div>
            </div>
        </section>
    );
}