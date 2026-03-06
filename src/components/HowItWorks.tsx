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
        <section id="how-it-works" className="bg-korami-white py-16 md:py-24 border-t-[3px] border-korami-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-korami-black font-display font-black text-4xl md:text-6xl mb-4 tracking-tighter leading-[1] md:leading-[0.95]">
                            {dict.howItWorks.title}
                        </h2>
                        <p className="text-korami-black/80 text-base md:text-xl font-bold leading-relaxed max-w-[42rem]">
                            {dict.howItWorks.subtitle}
                        </p>
                    </div>
                    <div className="hidden lg:block shrink-0">
                        <p className="text-korami-black/80 text-sm font-bold max-w-xs text-right leading-[1.6]">
                            {dict.howItWorks.description}
                        </p>
                    </div>
                </div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                            <div className="relative h-full bg-korami-white border-2 border-korami-black p-6 shadow-neo hover:shadow-neo-hover transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-neo overflow-hidden flex flex-col">
                                <div className="absolute -top-2 -right-1 text-[6rem] md:text-[6rem] lg:text-[8rem] font-black text-korami-black opacity-5 pointer-events-none select-none leading-none tracking-tighter">
                                    {step.number}
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <h3 className="text-xl md:text-2xl font-display font-black text-korami-black mb-3 leading-tight tracking-tight">
                                        <span className="text-korami-accent mr-2">{step.number}.</span>
                                        {step.title}
                                    </h3>
                                    <p className="text-korami-black/80 text-sm leading-relaxed font-bold mt-auto pb-4">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center pt-8 mt-16 border-t-2 border-korami-black/10">
                    <p className="text-korami-black/80 text-lg font-bold">
                        {dict.howItWorks.setupInstruction}
                    </p>
                </div>
            </div>
        </section>
    );
}