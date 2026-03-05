"use client";

import { motion } from "framer-motion";
import { ShieldAlert, FileText, SlidersHorizontal, Globe2 } from "lucide-react";

export default function SafetyHandoff({ dict }: { dict: any }) {
    const reliabilityFeatures = dict.safety.features.map((feature: any, index: number) => {
        let icon = <ShieldAlert className="w-8 h-8 mb-4 text-korami-black" />;
        if (index === 1) icon = <FileText className="w-8 h-8 mb-4 text-korami-black" />;
        else if (index === 2) icon = <SlidersHorizontal className="w-8 h-8 mb-4 text-korami-black" />;

        return {
            title: feature.title,
            description: feature.description,
            icon
        };
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="bg-korami-white py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Section: Reliability Grid */}
                <div className="flex flex-col lg:flex-row gap-16 mb-24">

                    {/* Left: The Narrative */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <h2 className="text-5xl md:text-6xl font-display font-black text-korami-black mb-6 tracking-tight">
                                {dict.safety.title1} <br />
                                <span className="text-korami-accent">{dict.safety.title2}</span>
                            </h2>
                            <p className="text-2xl text-korami-black/70 font-bold leading-relaxed mb-8">
                                {dict.safety.description}
                            </p>
                            <div className="w-16 h-4 bg-korami-black"></div>
                        </div>
                    </div>

                    {/* Right: The Features Grid */}
                    <div className="lg:w-2/3">
                        <motion.div
                            className="grid md:grid-cols-2 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {reliabilityFeatures.map((feature: any, index: number) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className={index === 2 ? 'md:col-span-2' : ''}
                                >
                                    <div className="relative h-full p-8 border-4 border-korami-black bg-white shadow-neo hover:shadow-neo-hover transition-all duration-150 hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0 active:translate-y-0 active:shadow-neo">
                                        {feature.icon}
                                        <h3 className="text-2xl font-display font-black text-korami-black mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-korami-black/80 text-lg font-bold leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: Multilingual Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className="border-4 border-korami-black bg-korami-trustBlue p-8 md:p-16 shadow-neo relative overflow-hidden"
                >
                    {/* Abstract background globe icon */}
                    <Globe2 className="absolute -right-20 -top-20 w-96 h-96 text-korami-white opacity-5 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-display font-black text-korami-white mb-4 tracking-tight">
                                {dict.safety.languages.title1} <br />
                                <span className="text-korami-accent">{dict.safety.languages.title2}</span>
                            </h2>
                            <p className="text-xl text-korami-white/80 font-bold leading-relaxed">
                                {dict.safety.languages.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
                            {/* Live Languages */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="px-6 py-4 bg-korami-white border-4 border-korami-black flex items-center justify-center">
                                    <span className="text-korami-black font-display font-black text-xl tracking-wider">{dict.safety.languages.english}</span>
                                </div>
                                <div className="px-6 py-4 bg-korami-white border-4 border-korami-black flex items-center justify-center">
                                    <span className="text-korami-black font-display font-black text-xl tracking-wider">{dict.safety.languages.mandarin} <span className="text-korami-accent">{dict.safety.languages.chinese}</span></span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="px-6 py-4 bg-transparent border-2 border-korami-white flex flex-col sm:flex-row items-center justify-center gap-3 relative overflow-hidden group">
                                    <span className="text-korami-white/50 font-display font-black text-xl tracking-wider group-hover:text-korami-white transition-colors">{dict.safety.languages.spanish} <span className="text-korami-white/30">{dict.safety.languages.espanol}</span></span>
                                    <span className="inline-block px-2 py-1 bg-korami-accent text-korami-white text-[10px] font-black uppercase tracking-widest border-2 border-korami-black">
                                        {dict.safety.languages.comingSoon}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}