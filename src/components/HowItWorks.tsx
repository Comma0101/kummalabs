"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
    const steps = [
        {
            number: "1",
            title: "Answer",
            description: "KOTA picks up instantly when staff is busy"
        },
        {
            number: "2",
            title: "Confirm",
            description: "Repeats back items and details to reduce mistakes"
        },
        {
            number: "3",
            title: "Deliver",
            description: "Prints a kitchen ticket via Cloud Printer (or texts your team)"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="how-it-works" className="bg-korami-white py-24 border-t-4 border-korami-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-korami-black font-black text-5xl md:text-6xl mb-6 uppercase tracking-tight">
                        How it Works
                    </h2>
                    <p className="text-korami-black/80 text-2xl font-semibold max-w-3xl mx-auto leading-relaxed mb-4">
                        Simple call handling that fits your current workflow.
                    </p>
                    <p className="text-korami-black/70 text-xl font-semibold max-w-3xl mx-auto">
                        No POS integration required. Orders are delivered via Cloud Printer or SMS.
                    </p>
                </div>

                <motion.div 
                    className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="relative bg-korami-white border-4 border-korami-black p-8 shadow-neo hover:shadow-neo-hover hover:translate-x-1 hover:translate-y-1 transition-all overflow-hidden"
                        >
                            {/* Oversized Background Number */}
                            <div className="absolute -top-10 -right-4 text-[12rem] font-black text-korami-black opacity-5 pointer-events-none select-none">
                                {step.number}
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="text-korami-black font-black text-3xl mb-4 uppercase">
                                    <span className="text-korami-accent mr-2">{step.number}.</span>
                                    {step.title}
                                </h3>
                                <p className="text-korami-black/80 text-lg leading-relaxed font-bold">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Setup instruction */}
                <div className="text-center pt-12 border-t-4 border-korami-black">
                    <p className="text-korami-black text-xl font-black uppercase">
                        Setup is fast: forward your phone line → choose delivery → go live.
                    </p>
                </div>
            </div>
        </section>
    );
}