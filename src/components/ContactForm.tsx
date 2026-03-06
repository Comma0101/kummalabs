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
                    <label htmlFor="name" className="block text-sm font-display font-black text-korami-white uppercase tracking-widest mb-2">
                        {dict.contact.name}
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 bg-transparent border-[3px] border-korami-white/20 text-korami-white text-base font-medium placeholder:text-korami-white/30 focus:outline-none focus:border-korami-white/70 focus:bg-korami-white/5 transition-all"
                        placeholder={dict.contact.namePlaceholder}
                    />
                </div>

                <div>
                    <label htmlFor="restaurant" className="block text-sm font-display font-black text-korami-white uppercase tracking-widest mb-2">
                        {dict.contact.restaurant}
                    </label>
                    <input
                        type="text"
                        id="restaurant"
                        required
                        value={formData.restaurant}
                        onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                        className="w-full px-5 py-4 bg-transparent border-[3px] border-korami-white/20 text-korami-white text-base font-medium placeholder:text-korami-white/30 focus:outline-none focus:border-korami-white/70 focus:bg-korami-white/5 transition-all"
                        placeholder={dict.contact.restaurantPlaceholder}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="phone" className="block text-sm font-display font-black text-korami-white uppercase tracking-widest mb-2">
                        {dict.contact.phone}
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-4 bg-transparent border-[3px] border-korami-white/20 text-korami-white text-base font-medium placeholder:text-korami-white/30 focus:outline-none focus:border-korami-white/70 focus:bg-korami-white/5 transition-all"
                        placeholder={dict.contact.phonePlaceholder}
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-display font-black text-korami-white uppercase tracking-widest mb-2">
                        {dict.contact.city}
                    </label>
                    <input
                        type="text"
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-5 py-4 bg-transparent border-[3px] border-korami-white/20 text-korami-white text-base font-medium placeholder:text-korami-white/30 focus:outline-none focus:border-korami-white/70 focus:bg-korami-white/5 transition-all"
                        placeholder={dict.contact.cityPlaceholder}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-display font-black text-korami-white uppercase tracking-widest mb-2">
                    {dict.contact.message}
                </label>
                <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 bg-transparent border-[3px] border-korami-white/20 text-korami-white text-base font-medium placeholder:text-korami-white/30 focus:outline-none focus:border-korami-white/70 focus:bg-korami-white/5 transition-all resize-none"
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

            <div className="pt-6 border-t border-korami-white/10 mt-8">
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-10 py-5 bg-korami-white text-korami-black font-display font-black text-xl hover:bg-korami-accent hover:text-korami-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === "loading" ? dict.contact.buttonLoading : dict.contact.button}
                </button>
                <div className="mt-4 flex items-start gap-3 p-4 bg-korami-black/50 border border-korami-white/10">
                    <div className="w-1.5 h-1.5 bg-korami-accent rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-korami-white/60 text-sm font-semibold leading-snug">
                        {dict.contact.microcopy}
                    </p>
                </div>
            </div>
        </form>
    );
}
