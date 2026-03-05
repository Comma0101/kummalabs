"use client";

import { motion } from "framer-motion";
import { ShieldAlert, FileText, SlidersHorizontal, Globe2 } from "lucide-react";

export default function SafetyHandoff() {
    const reliabilityFeatures = [
        {
            title: "Human Fallback",
            description: "Handoffs to staff when confidence is low or complex questions arise.",
            icon: <ShieldAlert className="w-8 h-8 mb-4 text-korami-black" />
        },
        {
            title: "Full Transparency",
            description: "Every call is transcribed and logged. Review exactly what was said.",
            icon: <FileText className="w-8 h-8 mb-4 text-korami-black" />
        },
        {
            title: "Custom Guardrails",
            description: "Enforce strict rules for 86'd items, custom hours, and required upsells.",
            icon: <SlidersHorizontal className="w-8 h-8 mb-4 text-korami-black" />
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="bg-korami-white py-24 border-t-4 border-korami-black">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Top Section: Reliability Grid */}
                <div className="flex flex-col lg:flex-row gap-16 mb-24">
                    
                    {/* Left: The Narrative */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32">
                            <h2 className="text-5xl md:text-6xl font-black text-korami-black mb-6 uppercase tracking-tight">
                                Built for <br />
                                <span className="text-korami-accent">Reliability</span>
                            </h2>
                            <p className="text-2xl text-korami-black/70 font-bold leading-relaxed mb-8">
                                KOTA doesn't guess. Smart guardrails ensure orders are perfectly captured, or instantly escalated to your team.
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
                            {reliabilityFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className={`p-8 border-4 border-korami-black bg-white shadow-neo hover:shadow-neo-hover hover:translate-x-1 hover:translate-y-1 transition-all ${index === 2 ? 'md:col-span-2' : ''}`}
                                >
                                    {feature.icon}
                                    <h3 className="text-2xl font-black text-korami-black mb-3 uppercase">
                                        {feature.title}
                                    </h3>
                                    <p className="text-korami-black/80 text-lg font-bold leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: Multilingual Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="border-4 border-korami-black bg-korami-black p-8 md:p-16 shadow-neo relative overflow-hidden"
                >
                    {/* Abstract background globe icon */}
                    <Globe2 className="absolute -right-20 -top-20 w-96 h-96 text-korami-white opacity-5 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-black text-korami-white mb-4 uppercase tracking-tight">
                                Speaks Your <br />
                                <span className="text-korami-accent">Customers' Language</span>
                            </h2>
                            <p className="text-xl text-korami-white/80 font-bold leading-relaxed">
                                Never lose a massive catering order to a language barrier again. KOTA seamlessly detects and switches languages instantly.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
                            {/* Live Languages */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="px-6 py-4 bg-korami-white border-2 border-korami-white flex items-center justify-center">
                                    <span className="text-korami-black font-black text-xl uppercase tracking-wider">English</span>
                                </div>
                                <div className="px-6 py-4 bg-korami-white border-2 border-korami-white flex items-center justify-center">
                                    <span className="text-korami-black font-black text-xl uppercase tracking-wider">Mandarin <span className="text-korami-accent">(中文)</span></span>
                                </div>
                            </div>
                            
                            {/* Coming Soon Languages */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="px-6 py-4 bg-transparent border-4 border-korami-white/20 flex flex-col sm:flex-row items-center justify-center gap-3 relative overflow-hidden group">
                                    <span className="text-korami-white/50 font-black text-xl uppercase tracking-wider group-hover:text-korami-white transition-colors">Spanish <span className="text-korami-white/30">(Español)</span></span>
                                    <span className="inline-block px-2 py-1 bg-korami-accent text-korami-white text-[10px] font-black uppercase tracking-widest border border-korami-accent">
                                        Coming Soon
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