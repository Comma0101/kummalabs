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
        <section className="bg-korami-white py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Top Section: Reliability Grid */}
                <div className="flex flex-col lg:flex-row gap-12 mb-16">
                    {/* Left: The Narrative */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-korami-black mb-6 tracking-tighter leading-[1] md:leading-[0.95]">
                                {dict.safety.title1} <br className="hidden lg:block" />
                                <span className="text-korami-accent">{dict.safety.title2}</span>
                            </h2>
                            <p className="text-lg md:text-xl text-korami-black/80 font-bold leading-[1.6] mb-8 max-w-[42rem]">
                                {dict.safety.description}
                            </p>
                            <div className="w-12 h-2 bg-korami-black"></div>
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
                                    <div className="relative h-full p-6 border-4 border-korami-black bg-white shadow-neo hover:shadow-neo-hover transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-neo">
                                        {feature.icon}
                                        <h3 className="text-xl md:text-2xl font-display font-black text-korami-black mb-3 leading-tight tracking-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-korami-black/80 text-[15px] md:text-base font-bold leading-[1.6]">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: Multilingual Proof Block */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className="border-2 border-korami-black bg-korami-gray/5 p-6 md:p-12 shadow-neo relative"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                        {/* Copy Block */}
                        <div className="max-w-xl w-full">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-korami-black mb-4 tracking-tighter leading-[1.05]">
                                {dict.safety.languages.title1} <br className="hidden lg:block" />
                                <span className="text-korami-accent">{dict.safety.languages.title2}</span>
                            </h2>
                            <p className="text-base md:text-lg text-korami-black/80 font-bold leading-[1.6] max-w-[42rem]">
                                {dict.safety.languages.description}
                            </p>
                        </div>

                        {/* Language Capabilities Grid */}
                        <div className="w-full max-w-2xl grid sm:grid-cols-2 gap-6">
                            {/* Card 1: English (Live) */}
                            <div className="bg-korami-white border-2 border-korami-black p-5 shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] hover:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[120px]">
                                <span className="text-xl md:text-2xl font-display font-black text-korami-black tracking-tight">
                                    {dict.safety.languages.english}
                                </span>
                                <div className="flex items-center gap-2 mt-4">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] md:text-xs font-black text-korami-black/80 uppercase tracking-[0.2em]">{dict.safety.languages.live}</span>
                                </div>
                            </div>

                            {/* Card 2: Mandarin (Live) */}
                            <div className="bg-korami-white border-2 border-korami-black p-5 shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] hover:shadow-[6px_6px_0px_0px_rgba(250,250,250,1)] hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[120px]">
                                <span className="text-xl md:text-2xl font-display font-black text-korami-black tracking-tight">
                                    {dict.safety.languages.mandarin}
                                </span>
                                <div className="flex items-center gap-2 mt-4">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] md:text-xs font-black text-korami-black/80 uppercase tracking-[0.2em]">{dict.safety.languages.live}</span>
                                </div>
                            </div>

                            {/* Card 3: Spanish (Coming Soon) */}
                            <div className="bg-korami-white border-2 border-korami-black/20 p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                                <span className="text-xl md:text-2xl font-display font-black text-korami-black/40 tracking-tight">
                                    {dict.safety.languages.spanish}
                                </span>
                                <div className="flex items-center gap-2 mt-4">
                                    <span className="px-2 py-1 bg-korami-black text-korami-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                                        {dict.safety.languages.comingSoon}
                                    </span>
                                </div>
                            </div>

                            {/* Card 4: Custom Languages */}
                            <div className="bg-korami-white border-2 border-dashed border-korami-black/40 p-5 shadow-sm flex flex-col justify-between min-h-[120px]">
                                <span className="text-lg md:text-xl font-display font-black text-korami-black tracking-tight">
                                    {dict.safety.languages.custom}
                                </span>
                                <p className="text-[13px] md:text-sm text-korami-black/60 font-bold leading-[1.4] mt-3">
                                    {dict.safety.languages.customDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}