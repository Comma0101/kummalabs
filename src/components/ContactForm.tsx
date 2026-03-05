"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        restaurant: "",
        phone: "",
        city: "",
        message: ""
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            setFormData({
                name: "",
                restaurant: "",
                phone: "",
                city: "",
                message: ""
            });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-base font-bold text-korami-white/90 mb-3">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 bg-korami-gray border-3 border-korami-white/20 rounded-lg text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white focus:ring-2 focus:ring-korami-white/30 transition-all"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label htmlFor="restaurant" className="block text-base font-bold text-korami-white/90 mb-3">
                        Restaurant Name *
                    </label>
                    <input
                        type="text"
                        id="restaurant"
                        required
                        value={formData.restaurant}
                        onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                        className="w-full px-5 py-4 bg-korami-gray border-3 border-korami-white/20 rounded-lg text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white focus:ring-2 focus:ring-korami-white/30 transition-all"
                        placeholder="Your Restaurant"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="phone" className="block text-base font-bold text-korami-white/90 mb-3">
                        Phone *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-4 bg-korami-gray border-3 border-korami-white/20 rounded-lg text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white focus:ring-2 focus:ring-korami-white/30 transition-all"
                        placeholder="(555) 123-4567"
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-base font-bold text-korami-white/90 mb-3">
                        City *
                    </label>
                    <input
                        type="text"
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-5 py-4 bg-korami-gray border-3 border-korami-white/20 rounded-lg text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white focus:ring-2 focus:ring-korami-white/30 transition-all"
                        placeholder="San Francisco"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-base font-bold text-korami-white/90 mb-3">
                    Message *
                </label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 bg-korami-gray border-3 border-korami-white/20 rounded-lg text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white focus:ring-2 focus:ring-korami-white/30 transition-all resize-none"
                    placeholder="Tell us about your restaurant..."
                />
            </div>

            {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm">
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                </div>
            )}

            {status === "success" && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-sm">
                    <p className="text-green-400 text-sm">We&apos;ll reach out within 24 hours.</p>
                </div>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-10 py-5 bg-korami-accent text-korami-white font-black text-xl rounded-lg hover:bg-korami-accentHover transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-korami-accent hover:border-korami-accentHover shadow-xl"
            >
                {status === "loading" ? "Sending..." : "Request Demo"}
            </button>
        </form>
    );
}
