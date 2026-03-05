"use client";

import { motion } from "framer-motion";

export default function UseCases() {
    const features = [
        {
            title: "Phone Orders",
            description: "Captures items, modifiers, and customer info—confirmed with 100% accuracy.",
            colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
            isPrimary: true
        },
        {
            title: "Reservations & Waitlist",
            description: "Books reservations and manages waitlist requests dynamically.",
            colSpan: "col-span-1",
            isPrimary: false,
            comingSoon: true
        },
        {
            title: "Menu & Allergens Q&A",
            description: "Answers complex allergen and ingredient questions instantly based on your custom menu data.",
            colSpan: "col-span-1 lg:col-span-2",
            isPrimary: false
        },
        {
            title: "Hours, Location & Parking",
            description: "Stops repetitive logistical calls during rush hour.",
            colSpan: "col-span-1",
            isPrimary: false
        },
        {
            title: "Catering Inquiries",
            description: "Collects group sizes, dietary restrictions, and dates, routing them directly to your event manager.",
            colSpan: "col-span-1",
            isPrimary: false
        },
        {
            title: "Order Status & Timing",
            description: "Eliminates 'is it ready yet?' calls. Gives real-time status updates based on your prep times.",
            colSpan: "col-span-1 md:col-span-2",
            isPrimary: false
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
    };

    return (
        <section id="use-cases" className="bg-korami-white py-24 border-t-4 border-korami-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-black text-korami-black mb-6 uppercase tracking-tight">
                        Built for <br /> Restaurants
                    </h2>
                    <p className="text-2xl text-korami-black/70 max-w-2xl font-bold">
                        Handle every type of call that comes into your restaurant, organized seamlessly.
                    </p>
                </div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`relative ${feature.colSpan} p-8 md:p-10 border-4 border-korami-black shadow-neo hover:shadow-neo-hover hover:translate-x-1 hover:translate-y-1 transition-all ${feature.isPrimary ? 'bg-korami-black text-korami-white' : 'bg-white'}`}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                <h3 className={`text-3xl font-black uppercase ${feature.isPrimary ? 'text-korami-accent' : 'text-korami-black'}`}>
                                    {feature.title}
                                </h3>
                                {feature.comingSoon && (
                                    <span className="inline-block px-3 py-1 bg-korami-gray text-korami-white text-xs font-black uppercase tracking-widest border-2 border-korami-black shrink-0 whitespace-nowrap self-start">
                                        Coming Soon
                                    </span>
                                )}
                            </div>
                            <p className={`text-xl font-bold leading-relaxed ${feature.isPrimary ? 'text-korami-white/90' : 'text-korami-black/80'}`}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}