export default function Solution() {
    const pillars = [
        {
            title: "Understands Context",
            description: "Real-time speech + memory chain."
        },
        {
            title: "Executes Tasks",
            description: "Integrates with POS, CRM, scheduling, and internal tools."
        },
        {
            title: "Built for Production",
            description: "Stable, low-latency, scalable."
        },
        {
            title: "Multimodal",
            description: "Voice → Text → Structured actions."
        }
    ];

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-korami-black text-korami-white border-t border-white/10">
            <div className="max-w-6xl mx-auto space-y-20">
                <h2 className="text-3xl md:text-5xl font-semibold text-center leading-tight max-w-4xl mx-auto">
                    Korami enables fast, reliable, and human-level voice interactions.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="space-y-4 border-l border-white/20 pl-6">
                            <h3 className="text-xl font-bold">{pillar.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
