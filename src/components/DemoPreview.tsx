export default function DemoPreview() {
    return (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-korami-white text-korami-black flex justify-center">
            <div className="w-full max-w-4xl aspect-video bg-korami-black flex items-center justify-center relative overflow-hidden group cursor-pointer">
                {/* Abstract waveform representation */}
                <div className="flex items-center gap-1 h-12 opacity-50">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-white animate-pulse"
                            style={{
                                height: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-500 group-hover:backdrop-blur-none group-hover:bg-black/20">
                    <h3 className="text-white text-xl md:text-2xl font-mono tracking-widest uppercase border border-white/30 px-6 py-3 bg-black/50">
                        Korami Voice Demo — Coming Soon
                    </h3>
                </div>
            </div>
        </section>
    );
}
