export default function SocialProof({ dict }: { dict: any }) {
    return (
        <section className="bg-korami-white py-12 border-b-4 border-korami-black">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-korami-black/60 font-bold uppercase tracking-widest text-sm mb-8">
                    {dict.socialProof.title}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                    <div className="text-xl font-black font-serif italic">The Golden Wok</div>
                    <div className="text-xl font-black uppercase tracking-tighter">Luigi&apos;s Trattoria</div>
                    <div className="text-xl font-black">Burger & Tap</div>
                    <div className="text-xl font-black font-mono">SUSHI HOUSE</div>
                    <div className="text-xl font-black tracking-widest">EL CAMINO</div>
                </div>
            </div>
        </section>
    );
}
