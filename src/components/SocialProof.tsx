export default function SocialProof({ dict }: { dict: any }) {
    return (
        <section className="bg-korami-white py-12 border-b-4 border-korami-black">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                <p className="text-korami-black/40 font-display font-black uppercase tracking-[0.2em] text-sm mb-10 flex items-center gap-4">
                    <span className="h-px w-8 bg-korami-black/20"></span>
                    {dict.socialProof.title}
                    <span className="h-px w-8 bg-korami-black/20"></span>
                </p>

                {/* 
                  Using a flex layout with varying typographic styles to simulate different restaurant brand marks. 
                  In a real scenario with logos, this would be an infinite marquee or SVG grid.
                */}
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 hover:opacity-100 transition-all duration-500">
                    <div className="flex flex-col items-center gap-1 group/brand hover:text-korami-accent transition-colors cursor-default">
                        <div className="text-2xl font-black font-serif italic tracking-tight">The Golden Wok</div>
                        <div className="text-xs font-bold text-korami-black/50 group-hover/brand:text-korami-accent/80 tracking-widest uppercase">{dict.socialProof.stats?.[0]}</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/brand hover:text-korami-accent transition-colors cursor-default">
                        <div className="text-xl font-black uppercase tracking-tighter">Luigi&apos;s Trattoria</div>
                        <div className="text-xs font-bold text-korami-black/50 group-hover/brand:text-korami-accent/80 tracking-widest uppercase">{dict.socialProof.stats?.[1]}</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/brand hover:text-korami-accent transition-colors cursor-default">
                        <div className="text-2xl font-bold font-sans">Burger & Tap</div>
                        <div className="text-xs font-bold text-korami-black/50 group-hover/brand:text-korami-accent/80 tracking-widest uppercase">{dict.socialProof.stats?.[2]}</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/brand hover:text-korami-accent transition-colors cursor-default">
                        <div className="text-xl font-black font-display tracking-widest">SUSHI HOUSE</div>
                        <div className="text-xs font-bold text-korami-black/50 group-hover/brand:text-korami-accent/80 tracking-widest uppercase">{dict.socialProof.stats?.[3]}</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/brand hover:text-korami-accent transition-colors cursor-default">
                        <div className="text-2xl font-black tracking-widest">EL CAMINO</div>
                        <div className="text-xs font-bold text-korami-black/50 group-hover/brand:text-korami-accent/80 tracking-widest uppercase">{dict.socialProof.stats?.[4]}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
