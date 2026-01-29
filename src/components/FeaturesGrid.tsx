export default function FeaturesGrid() {
    const features = [
        "Real-time streaming",
        "Multi-language",
        "Tool calling",
        "Memory system",
        "API-first",
        "Fail-safe fallback logic"
    ];

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-korami-black text-korami-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/20 border border-white/20">
                {features.map((feature, index) => (
                    <div key={index} className="bg-korami-black p-12 flex items-center justify-center text-center min-h-[200px]">
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight">{feature}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
