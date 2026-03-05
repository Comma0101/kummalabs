export default function ProblemOutcome() {
    return (
        <section className="bg-korami-white py-24 border-t-4 border-korami-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-20">
                    {/* Left: Pain - Amber warning tone */}
                    <div>
                        <h2 className="text-amber-600/80 font-black text-4xl md:text-5xl mb-8 uppercase tracking-tight">
                            The Problem
                        </h2>
                        <ul className="space-y-6 text-amber-700/70 text-xl font-medium leading-relaxed">
                            <li>Missed calls during rush hours</li>
                            <li>Staff stuck on the phone instead of serving customers</li>
                            <li>Wrong or missed items leading to refunds and bad reviews</li>
                            <li>Only one call can be handled at a time</li>
                            <li>Language barriers cause misunderstandings and slow service</li>
                        </ul>
                    </div>

                    {/* Right: Outcome - Bold, emphasized */}
                    <div>
                        <h2 className="text-korami-accent font-black text-4xl md:text-5xl mb-8 uppercase tracking-tight">
                            The Outcome
                        </h2>
                        <ul className="space-y-6 text-korami-black text-xl font-bold leading-relaxed">
                            <li>Calls answered automatically, every time</li>
                            <li>Orders captured consistently with confirmation</li>
                            <li>Staff stays focused on in-person service</li>
                            <li>Handles multiple calls at once</li>
                            <li>Supports English and Mandarin</li>
                        </ul>

                        {/* Bottom line - conversion message */}
                        <div className="mt-10 pt-8 border-t-2 border-korami-black/10">
                            <p className="text-korami-black/70 text-lg font-semibold">
                                No POS integration required. Orders delivered via Cloud Printer or SMS.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
