"use client";

import { motion } from "framer-motion";

export default function UseCases({ dict }: { dict: any }) {
    const activeFeatures = [
        { ...dict.useCases.features[0], colSpan: "col-span-1 md:col-span-2 lg:col-span-2", isPrimary: true },
        { ...dict.useCases.features[2], colSpan: "col-span-1", isPrimary: false },
        { ...dict.useCases.features[3], colSpan: "col-span-1", isPrimary: false },
        { ...dict.useCases.features[4], colSpan: "col-span-1", isPrimary: false },
        { ...dict.useCases.features[5], colSpan: "col-span-1 md:col-span-2 lg:col-span-1", isPrimary: false }
    ];

    const roadmapFeatures = [
        dict.useCases.features[1]
    ];

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
        <section id="use-cases" className="bg-korami-white py-12 md:py-16 border-t-2 border-korami-black/10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-korami-black mb-6 tracking-tighter leading-[1] md:leading-[0.95]">
                            {dict.useCases.title1} <span className="text-korami-accent">{dict.useCases.title2}</span>
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl text-korami-black/80 font-bold leading-relaxed max-w-[42rem]">
                            {dict.useCases.subtitle}
                        </p>
                    </div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {activeFeatures.map((feature: any, index: number) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={feature.colSpan}
                        >
                            <div className={`relative h-full p-6 md:p-8 border-2 border-korami-black shadow-neo hover:shadow-neo-hover transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-neo ${feature.isPrimary ? 'bg-korami-black text-korami-white' : 'bg-white'}`}>
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                                    <h3 className={`text-2xl md:text-3xl font-display font-black leading-tight tracking-tight ${feature.isPrimary ? 'text-korami-accent' : 'text-korami-black'}`}>
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className={`text-[15px] md:text-base font-bold leading-[1.6] ${feature.isPrimary ? 'text-korami-white/80' : 'text-korami-black/80'}`}>
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Roadmap / Coming Soon Block */}
                <motion.div
                    className="mt-12 pt-8 border-t-2 border-korami-black/10"
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-xs md:text-sm font-black text-korami-black uppercase tracking-[0.2em]">{dict.useCases.comingSoon}</h3>
                        <div className="flex-1 h-px bg-korami-black/10"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {roadmapFeatures.map((feature: any, index: number) => (
                            <div key={index} className="p-6 border-2 border-korami-black/20 bg-korami-gray/5 opacity-80 cursor-not-allowed">
                                <h4 className="text-lg md:text-xl font-display font-black text-korami-black mb-2 leading-tight">{feature.title}</h4>
                                <p className="text-korami-black/60 text-[15px] font-bold leading-[1.6]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}