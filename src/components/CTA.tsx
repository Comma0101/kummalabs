import ContactForm from "./ContactForm";

export default function CTA({ dict }: { dict: any }) {
    return (
        <section id="contact" className="bg-korami-black py-16 md:py-24 lg:py-32 border-t border-korami-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left Column: The Pitch */}
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-korami-white mb-6 tracking-tighter leading-[1] md:leading-[1.05]">
                            {dict.cta.title}
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-korami-white/80 font-semibold mb-10 leading-[1.6]">
                            {dict.cta.subtitle}
                        </p>

                        <div className="space-y-4 pt-8 border-t-2 border-korami-white/10">
                            {dict.cta.bullets.map((bullet: string, i: number) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-korami-accent flex-shrink-0"></div>
                                    <span className="text-base md:text-lg font-bold text-korami-white/90">
                                        {bullet}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: The Form */}
                    <div className="bg-korami-gray/50 border-2 border-korami-white/10 p-6 md:p-8 lg:p-10 relative">
                        {/* Decorative Corner Squares */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-korami-white/20"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-korami-white/20"></div>

                        <ContactForm dict={dict} />
                    </div>
                </div>
            </div>
        </section>
    );
}
