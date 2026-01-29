export default function ProblemOpportunity() {
    return (
        <section className="bg-korami-white py-24 md:py-32 border-b border-korami-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="w-full h-px bg-korami-border mb-16"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {/* Problem Column */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-korami-black mb-8">
                            Problem
                        </h3>
                        <div className="space-y-6">
                            <p className="text-xl md:text-2xl font-light text-korami-black leading-relaxed">
                                Every business needs automation.
                            </p>
                            <p className="text-xl md:text-2xl font-light text-korami-black/70 leading-relaxed">
                                AI is powerful, but voice interfaces remain fragile.
                            </p>
                            <p className="text-xl md:text-2xl font-light text-korami-black/70 leading-relaxed">
                                Real-world tasks require context, memory, and reliability.
                            </p>
                        </div>
                    </div>

                    {/* Opportunity Column */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-korami-black mb-8">
                            Opportunity
                        </h3>
                        <p className="text-xl md:text-2xl font-medium text-korami-black leading-relaxed">
                            Korami provides a voice-first infrastructure layer that abstracts the complexity so businesses can focus on building great customer experiences.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
