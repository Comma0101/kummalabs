export default function SafetyHandoff() {
    const features = [
        "Handoff to staff when confidence is low",
        "Call transcripts and logs for review",
        "Custom rules (hours, 86'd items, upsells)"
    ];

    return (
        <section className="bg-korami-white py-24 border-t-4 border-korami-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl font-black text-korami-black mb-8">
                        Built for Reliability
                    </h2>
                    <p className="text-2xl text-korami-black/70 mb-16 font-semibold">
                        Smart guardrails ensure calls are handled correctly or escalated to your team
                    </p>

                    <div className="space-y-6 text-left">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 border-4 border-korami-black/10 hover:border-korami-black hover:shadow-lg transition-all duration-200"
                            >
                                <p className="text-2xl text-korami-black font-bold leading-relaxed">
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
