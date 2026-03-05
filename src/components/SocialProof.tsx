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
                    <div className="text-2xl font-black font-serif italic tracking-tight hover:text-korami-accent transition-colors cursor-default">The Golden Wok</div>
                    <div className="text-xl font-black uppercase tracking-tighter hover:text-korami-accent transition-colors cursor-default">Luigi&apos;s Trattoria</div>
                    <div className="text-2xl font-bold font-sans hover:text-korami-accent transition-colors cursor-default">Burger & Tap</div>
                    <div className="text-xl font-black font-display tracking-widest hover:text-korami-accent transition-colors cursor-default">SUSHI HOUSE</div>
                    <div className="text-2xl font-black tracking-widest hover:text-korami-accent transition-colors cursor-default">EL CAMINO</div>
                </div>
            </div>
        </section>
    );
}
