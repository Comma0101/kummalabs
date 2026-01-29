export default function UseCases() {
    const features = [
        {
            title: "Phone Orders",
            description: "Captures items, modifiers, and customer info—confirmed"
        },
        {
            title: "Reservations & Waitlist",
            description: "Books reservations and manages waitlist requests"
        },
        {
            title: "Menu & Allergens Q&A",
            description: "Answers allergens and ingredients based on your menu"
        },
        {
            title: "Hours, Location & Parking",
            description: "Stops repetitive calls during rush"
        },
        {
            title: "Catering Inquiries",
            description: "Collects details and routes to the right person"
        },
        {
            title: "Order Status & Pickup Timing",
            description: "Reduces 'is it ready?' calls"
        }
    ];

    return (
        <section id="use-cases" className="bg-korami-white py-24 border-t-4 border-korami-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-5xl md:text-6xl font-black text-korami-black mb-6">
                        Built for Restaurants
                    </h2>
                    <p className="text-2xl text-korami-black/70 max-w-2xl font-semibold">
                        Handle every type of call that comes into your restaurant
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 border-4 border-korami-black/10 hover:border-korami-black hover:shadow-lg transition-all duration-200 bg-korami-white"
                        >
                            <h3 className="text-2xl font-black text-korami-black mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-korami-black/80 leading-relaxed text-lg font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
