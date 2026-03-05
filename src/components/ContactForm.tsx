"use client";

import { useState, FormEvent } from "react";

export default function ContactForm({ dict }: { dict: any }) {
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
                    <label htmlFor="name" className="block text-base font-display font-bold text-korami-white/90 mb-3">
                        {dict.contact.name}
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 bg-korami-gray border-2 border-korami-white/20 text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white/50 focus:ring-0 transition-all"
                        placeholder={dict.contact.namePlaceholder}
                    />
                </div>

                <div>
                    <label htmlFor="restaurant" className="block text-base font-display font-bold text-korami-white/90 mb-3">
                        {dict.contact.restaurant}
                    </label>
                    <input
                        type="text"
                        id="restaurant"
                        required
                        value={formData.restaurant}
                        onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                        className="w-full px-5 py-4 bg-korami-gray border-2 border-korami-white/20 text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white/50 focus:ring-0 transition-all"
                        placeholder={dict.contact.restaurantPlaceholder}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="phone" className="block text-base font-display font-bold text-korami-white/90 mb-3">
                        {dict.contact.phone}
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-4 bg-korami-gray border-2 border-korami-white/20 text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white/50 focus:ring-0 transition-all"
                        placeholder={dict.contact.phonePlaceholder}
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-base font-display font-bold text-korami-white/90 mb-3">
                        {dict.contact.city}
                    </label>
                    <input
                        type="text"
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-5 py-4 bg-korami-gray border-2 border-korami-white/20 text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white/50 focus:ring-0 transition-all"
                        placeholder={dict.contact.cityPlaceholder}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-base font-display font-bold text-korami-white/90 mb-3">
                    {dict.contact.message}
                </label>
                <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 bg-korami-gray border-2 border-korami-white/20 text-korami-white text-lg font-medium placeholder:text-korami-white/40 focus:outline-none focus:border-korami-white/50 focus:ring-0 transition-all resize-none"
                    placeholder={dict.contact.messagePlaceholder}
                />
            </div>

            {status === "error" && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm">
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                </div>
            )}

            {status === "success" && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-sm">
                    <p className="text-green-400 text-sm">{dict.contact.success}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-10 py-5 bg-korami-accent text-korami-white font-display font-black text-xl border-2 border-korami-black transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] hover:shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] active:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)]"
            >
                {status === "loading" ? dict.contact.buttonLoading : dict.contact.button}
            </button>
        </form>
    );
}
