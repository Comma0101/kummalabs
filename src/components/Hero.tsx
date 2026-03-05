import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-korami-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 w-full py-24">
                <div className="max-w-4xl">
                    <h1 className="text-korami-black font-black text-6xl md:text-8xl lg:text-[6.5rem] leading-[1.05] tracking-tight mb-8">
                        <span className="text-korami-accent">Answer</span> every call. <br />
                        Capture every order.
                    </h1>

                    <p className="text-korami-black/80 text-2xl md:text-3xl leading-relaxed max-w-2xl mb-12 font-semibold">
                        KOTA answers restaurant calls during rush—takes orders and reservations, then sends confirmed details to your team via Cloud Printer or SMS.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                        <Link
                            href="#contact"
                            className="px-10 py-5 bg-korami-accent text-korami-white font-bold text-xl rounded-lg hover:bg-korami-accentHover transition-all hover:scale-105 w-full sm:w-auto text-center border-2 border-korami-accent hover:border-korami-accentHover shadow-lg hover:shadow-xl"
                        >
                            Get a Demo
                        </Link>
                    </div>

                    <div className="space-y-4 text-korami-black/70 text-lg font-medium max-w-2xl">
                        <p>No POS integration required</p>
                        <p>Repeat-back confirmation reduces mistakes</p>
                        <p>Handoff to staff when unsure</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
