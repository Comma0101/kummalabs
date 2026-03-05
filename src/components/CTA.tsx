export default function CTA({ dict }: { dict: any }) {
    return (
        <section className="bg-korami-black py-24 md:py-32 border-t border-korami-white/10">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-display font-black text-korami-white mb-8 tracking-tight">
                        {dict.cta.title1} <span className="text-korami-accent">{dict.cta.title2}</span> {dict.cta.title3}
                    </h2>
                    <p className="text-2xl text-korami-white/80 max-w-2xl mx-auto font-semibold mb-6">
                        {dict.cta.subtitle}
                    </p>
                    <p className="text-korami-white/50 text-base font-medium max-w-lg mx-auto bg-white/5 py-2 px-4 border-2 border-white/20">
                        {dict.cta.pricingHint}
                    </p>
                </div>
            </div>
        </section>
    );
}
