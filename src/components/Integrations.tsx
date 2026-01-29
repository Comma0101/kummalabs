"use client";

import { useEffect, useRef } from "react";

export default function Integrations() {
    const partners = [
        "Twilio", "Deepgram", "OpenAI", "Square", "Stripe", "Supabase", "GCP",
        "Twilio", "Deepgram", "OpenAI", "Square", "Stripe", "Supabase", "GCP" // Duplicate for seamless loop
    ];

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollPos = 0;
        const scrollSpeed = 0.5; // Adjust speed as needed

        const animate = () => {
            scrollPos += scrollSpeed;

            // Reset when we've scrolled halfway (since we duplicated items)
            if (scrollPos >= scrollContainer.scrollWidth / 2) {
                scrollPos = 0;
            }

            scrollContainer.scrollLeft = scrollPos;
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <section className="bg-korami-white py-16 border-b border-korami-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-medium text-korami-black/40 mb-8 uppercase tracking-widest">
                    Trusted by industry leaders
                </p>

                <div
                    ref={scrollRef}
                    className="flex gap-12 md:gap-16 opacity-50 grayscale overflow-hidden"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 group cursor-default flex-shrink-0"
                        >
                            {/* Placeholder Icon */}
                            <div className="w-6 h-6 bg-korami-black/20 rounded-full group-hover:bg-korami-black transition-colors"></div>
                            <span
                                className="text-xl md:text-2xl font-bold text-korami-black/60 group-hover:text-korami-black transition-colors whitespace-nowrap"
                            >
                                {partner}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
