export default function HowItWorks() {
    const steps = [
        {
            number: "1",
            title: "Answer",
            description: "KOTA picks up instantly when staff is busy"
        },
        {
            number: "2",
            title: "Confirm",
            description: "Repeats back items and details to reduce mistakes"
        },
        {
            number: "3",
            title: "Deliver",
            description: "Prints a kitchen ticket via Cloud Printer (or texts your team)"
        }
    ];

    return (
        <section id="how-it-works" className="bg-korami-white py-24 border-t-4 border-korami-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-korami-black font-black text-5xl md:text-6xl mb-6">
                        How it Works
                    </h2>
                    <p className="text-korami-black/80 text-2xl font-semibold max-w-3xl mx-auto leading-relaxed mb-4">
                        Simple call handling that fits your current workflow.
                    </p>
                    <p className="text-korami-black/70 text-xl font-semibold max-w-3xl mx-auto">
                        No POS integration required. Orders are delivered via Cloud Printer or SMS.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-16 mb-16">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="mb-8 flex justify-center">
                                <div className="w-20 h-20 rounded-full bg-korami-black text-korami-white flex items-center justify-center text-3xl font-black border-4 border-korami-black">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-korami-black font-black text-3xl mb-4">
                                {step.title}
                            </h3>
                            <p className="text-korami-black/80 text-lg leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Setup instruction */}
                <div className="text-center pt-12 border-t-2 border-korami-black/10">
                    <p className="text-korami-black/80 text-xl font-bold">
                        Setup is fast: forward your phone line → choose delivery → go live.
                    </p>
                </div>
            </div>
        </section>
    );
}
