"use client";

import { motion } from "framer-motion";

export default function UseCases({ dict }: { dict: any }) {
    const features = dict.useCases.features.map((feature: any, index: number) => {
        // We preserve the layout styling logic but inject the content from dict
        let colSpan = "col-span-1";
        if (index === 0) colSpan = "col-span-1 md:col-span-2 lg:col-span-2";
        else if (index === 2) colSpan = "col-span-1 lg:col-span-2";
        else if (index === 5) colSpan = "col-span-1 md:col-span-2";

        return {
            title: feature.title,
            description: feature.description,
            colSpan: colSpan,
            isPrimary: index === 0,
            comingSoon: index === 1
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
        <section id="use-cases" className="bg-korami-white py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-display font-black text-korami-black mb-6 tracking-tight">
                        {dict.useCases.title1} <br /> {dict.useCases.title2}
                    </h2>
                    <p className="text-2xl text-korami-black/70 max-w-2xl font-bold">
                        {dict.useCases.subtitle}
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature: any, index: number) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={feature.colSpan}
                        >
                            <div className={`relative h-full p-8 md:p-10 border-4 border-korami-black shadow-neo hover:shadow-neo-hover transition-all duration-150 hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0 active:translate-y-0 active:shadow-neo ${feature.isPrimary ? 'bg-korami-black text-korami-white' : 'bg-white'}`}>
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                    <h3 className={`text-3xl font-display font-black ${feature.isPrimary ? 'text-korami-accent' : 'text-korami-black'}`}>
                                        {feature.title}
                                    </h3>
                                    {feature.comingSoon && (
                                        <span className="inline-block px-3 py-1 bg-korami-gray/10 text-korami-black/60 text-xs font-bold uppercase tracking-widest rounded-full shrink-0 whitespace-nowrap self-start">
                                            {dict.useCases.comingSoon}
                                        </span>
                                    )}
                                </div>
                                <p className={`text-xl font-bold leading-relaxed ${feature.isPrimary ? 'text-korami-white/90' : 'text-korami-black/80'}`}>
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}