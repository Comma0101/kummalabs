"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ({ dict }: { dict: any }) {
    // Fetch FAQs from dictionary to support multiple languages
    const faqs = dict.faq.items;

    const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-korami-white py-16 md:py-24 border-b-2 border-korami-black">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-korami-black font-display font-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tighter leading-[1] md:leading-[0.95]">
                        {dict.faq.title}
                    </h2>
                    <p className="text-korami-black/80 text-lg md:text-xl md:text-2xl font-bold max-w-[42rem] mx-auto leading-relaxed">
                        {dict.faq.subtitle}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq: { question: string, answer: string }, index: number) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`border-2 border-korami-black shadow-neo transition-all duration-300 relative overflow-hidden ${isOpen ? 'bg-korami-gray/5' : 'bg-korami-white hover:bg-korami-gray/5'}`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none relative z-10"
                                >
                                    <h3 className={`text-korami-black font-display font-black text-xl md:text-2xl pr-4 md:pr-8 leading-tight tracking-tight transition-colors ${isOpen ? 'text-korami-accent' : ''}`}>
                                        {faq.question}
                                    </h3>
                                    <div className={`w-8 h-8 rounded-full border-2 border-korami-black flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-korami-accent text-korami-black shadow-neo rotate-180' : 'bg-transparent text-korami-black/30'}`}>
                                        {isOpen ? <Minus className="w-4 h-4" strokeWidth={3} /> : <Plus className="w-4 h-4" strokeWidth={3} />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 border-t border-korami-black/10 mt-1 pt-5 relative z-10">
                                                <p className="text-korami-black/80 text-[15px] md:text-base font-bold leading-[1.6]">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
