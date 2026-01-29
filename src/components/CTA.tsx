import ContactForm from "./ContactForm";

export default function CTA() {
    return (
        <section className="bg-korami-black py-24 md:py-32 border-t-4 border-korami-white/20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-black text-korami-white mb-8 tracking-tight">
                        Want to see it handle your restaurant calls?
                    </h2>
                    <p className="text-2xl text-korami-white/80 max-w-2xl mx-auto font-semibold">
                        Get a demo—see how KOTA captures orders during rush
                    </p>
                </div>
            </div>
        </section>
    );
}
