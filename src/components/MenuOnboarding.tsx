"use client";

import { motion } from "framer-motion";
import { FileText, Database, Printer, Brain, ShieldCheck, MessageSquare, Zap } from "lucide-react";

export default function MenuOnboarding({ dict }: { dict: any }) {
    const features = dict.menuOnboarding.features;

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section className="bg-korami-white py-16 md:py-24 border-t-4 border-korami-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-korami-gray/5 -skew-x-12 transform origin-top-right pointer-events-none"></div>
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 max-w-4xl mx-auto flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-korami-black text-korami-gold text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
                        <Zap className="w-3.5 h-3.5" strokeWidth={3} />
                        {dict.menuOnboarding.guarantee.big} {dict.menuOnboarding.guarantee.title}
                    </div>
                    <h2 className="text-korami-black font-display font-black text-4xl md:text-5xl lg:text-7xl mb-6 tracking-tighter leading-[1] md:leading-[0.95]">
                        {dict.menuOnboarding.title1} <span className="text-korami-accent">{dict.menuOnboarding.title2}</span>
                    </h2>
                    <p className="text-korami-black/80 text-lg md:text-xl md:text-2xl font-bold leading-relaxed max-w-[42rem]">
                        {dict.menuOnboarding.subtitle}
                    </p>
                </motion.div>

                {/* Micro Visual Diagram */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="max-w-4xl lg:max-w-5xl mx-auto bg-korami-white border-2 border-korami-black px-6 py-12 md:px-12 md:py-16 shadow-neo transition-shadow duration-300 relative overflow-hidden"
                >

                    <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-12 md:gap-8 relative z-10 w-full">
                        {/* Input Stage */}
                        <div className="flex-1 flex flex-col justify-start group cursor-default h-full relative px-2 md:px-6 w-full text-center items-center">
                            <div className="flex flex-col items-center h-32 w-full">
                                <span className="text-[10px] md:text-xs font-black text-korami-black uppercase tracking-widest mb-6">
                                    {dict.menuOnboarding.diagram.microLabel1}
                                </span>
                                <div className="w-16 h-16 bg-korami-white text-korami-black rounded-none flex items-center justify-center border-2 border-korami-black shadow-[4px_4px_0px_0px_#111216] relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                                    <FileText className="w-7 h-7" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="mt-8 flex flex-col justify-start flex-1 w-full">
                                <p className="text-korami-black/70 font-bold text-sm md:text-[15px] leading-relaxed max-w-[220px] mx-auto">
                                    {dict.menuOnboarding.diagram.input}
                                </p>
                            </div>
                        </div>

                        {/* Divider 1 */}
                        <div className="hidden md:block w-px border-l-2 border-dotted border-korami-black/20 self-stretch my-8"></div>

                        {/* Processing Stage */}
                        <div className="flex-1 flex flex-col justify-start group cursor-default h-full relative px-2 md:px-6 w-full text-center items-center">
                            <div className="flex flex-col items-center h-32 w-full">
                                <span className="text-[10px] md:text-xs font-black text-korami-black uppercase tracking-widest mb-6">
                                    {dict.menuOnboarding.diagram.microLabel2}
                                </span>
                                <div className="w-16 h-16 bg-korami-white text-korami-black rounded-none flex items-center justify-center border-2 border-korami-black shadow-[4px_4px_0px_0px_#111216] relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                                    <Database className="w-7 h-7" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="mt-8 flex flex-col justify-start flex-1 w-full">
                                <p className="text-korami-black/70 font-bold text-sm md:text-[15px] leading-relaxed max-w-[220px] mx-auto">
                                    {dict.menuOnboarding.diagram.processing1}
                                    <strong className="text-korami-black font-black block mt-1">{dict.menuOnboarding.diagram.processingBold}</strong>
                                    {dict.menuOnboarding.diagram.processing2}
                                </p>
                            </div>
                        </div>

                        {/* Divider 2 */}
                        <div className="hidden md:block w-px border-l-2 border-dotted border-korami-black/20 self-stretch my-8"></div>

                        {/* Output Stage */}
                        <div className="flex-1 flex flex-col justify-start group cursor-default h-full relative px-2 md:px-6 w-full text-center items-center">
                            <div className="flex flex-col items-center h-32 w-full">
                                <span className="text-[10px] md:text-xs font-black text-korami-black uppercase tracking-widest mb-6">
                                    {dict.menuOnboarding.diagram.microLabel3}
                                </span>
                                <div className="w-16 h-16 bg-korami-white text-korami-black rounded-none flex items-center justify-center border-2 border-korami-black shadow-[4px_4px_0px_0px_#111216] relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                                    <Printer className="w-7 h-7" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="mt-8 flex flex-col justify-start flex-1 w-full">
                                <p className="text-korami-black/70 font-bold text-sm md:text-[15px] leading-relaxed max-w-[220px] mx-auto">
                                    {dict.menuOnboarding.diagram.output}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Supporting Badges Row */}
                <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-12 max-w-4xl mx-auto mt-10">
                    {features.map((feature: any, index: number) => {
                        const Icon = index === 0 ? Brain : index === 1 ? ShieldCheck : MessageSquare;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="flex items-center gap-3 text-korami-black/90 group"
                            >
                                <Icon className="w-5 h-5 text-korami-black/60 group-hover:text-korami-black transition-colors" />
                                <span className="text-[15px] font-black tracking-wide">{feature.title}</span>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
