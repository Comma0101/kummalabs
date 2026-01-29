import SpotlightCard from "./SpotlightCard";

export default function Showcase() {
    const agents = [
        { name: "AI Ordering Agent", type: "Transactional" },
        { name: "AI Reservation Agent", type: "Scheduling" },
        { name: "AI Customer Support Agent", type: "Service" },
        { name: "AI Personal Companion", type: "Conversational" },
        { name: "AI Internal Tools Assistant", type: "Operational" },
        { name: "AI Appointment Scheduler", type: "Logistics" },
    ];

    return (
        <section id="showcase" className="bg-korami-black py-24 md:py-32 border-b border-korami-gray">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-korami-white mb-4 tracking-tight">
                        Beyond Ordering
                    </h2>
                    <p className="text-korami-white/60 max-w-2xl">
                        Korami powers a diverse range of voice agents across industries.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent, index) => (
                        <SpotlightCard
                            key={index}
                            className="group p-8 border border-korami-white/10 rounded-sm bg-korami-gray/50 hover:border-korami-white/20 transition-all duration-300 h-48 flex flex-col justify-between cursor-default"
                        >
                            <span className="text-xs font-mono text-korami-white/40 uppercase tracking-wider relative z-10">
                                {agent.type}
                            </span>
                            <h3 className="text-xl font-medium text-korami-white group-hover:text-white transition-colors relative z-10">
                                {agent.name}
                            </h3>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
