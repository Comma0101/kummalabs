export default function Architecture() {
    return (
        <section className="bg-[#F8F8F8] py-24 md:py-32 border-b border-korami-border">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-korami-black mb-4">
                        How Korami Works
                    </h2>
                    <p className="text-korami-black/60">
                        Enterprise-grade infrastructure for voice automation.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto flex flex-col items-center">
                    {/* Step 1 */}
                    <div className="w-full bg-korami-white border border-korami-black/10 p-6 rounded-sm text-center shadow-sm">
                        <span className="font-mono text-sm text-korami-black tracking-wide">Voice Input</span>
                    </div>

                    {/* Arrow */}
                    <div className="h-12 w-px bg-korami-black/10 my-2 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-korami-black/40 animate-flow-down"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r border-b border-korami-black/20 rotate-45"></div>
                    </div>

                    {/* Step 2 */}
                    <div className="w-full bg-korami-black text-korami-white border border-korami-black p-8 rounded-sm text-center shadow-md relative z-10">
                        <span className="font-mono text-lg font-medium tracking-wide">Korami Inference Layer</span>
                        <div className="mt-2 text-xs text-korami-white/60 font-mono">
                            ASR • LLM • TTS • Latency Optimization
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="h-12 w-px bg-korami-black/10 my-2 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-korami-black/40 animate-flow-down" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r border-b border-korami-black/20 rotate-45"></div>
                    </div>

                    {/* Step 3 */}
                    <div className="w-full bg-korami-white border border-korami-black/10 p-6 rounded-sm text-center shadow-sm">
                        <span className="font-mono text-sm text-korami-black tracking-wide">Task Engine / Tools</span>
                    </div>

                    {/* Arrow */}
                    <div className="h-12 w-px bg-korami-black/10 my-2 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-korami-black/40 animate-flow-down" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r border-b border-korami-black/20 rotate-45"></div>
                    </div>

                    {/* Step 4 */}
                    <div className="w-full bg-korami-white border border-korami-black/10 p-6 rounded-sm text-center shadow-sm">
                        <span className="font-mono text-sm text-korami-black tracking-wide">Restaurant POS / CRM / Apps</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
