"use client";

import { useState } from "react";

export default function SampleCall({ dict }: { dict: any }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section id="sample-call" className="bg-korami-white py-24 border-b-4 border-korami-black">
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-korami-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_#FF5D00] border-4 border-korami-black flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-korami-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                    {/* Text Content */}
                    <div className="flex-1 z-10">
                        <h2 className="text-korami-white font-display font-black text-4xl md:text-5xl mb-4 tracking-tight">
                            {dict.sampleCall?.title || "Hear KOTA in Action"}
                        </h2>
                        <p className="text-korami-white/70 text-lg font-semibold max-w-md">
                            {dict.sampleCall?.description || "Listen to a real-world scenario of KOTA navigating a complex lunch order."}
                        </p>
                    </div>

                    {/* Player UI */}
                    <div className="w-full md:w-auto flex-shrink-0 z-10 bg-korami-gray/80 backdrop-blur-md p-6 rounded-2xl border border-korami-white/10 flex items-center gap-6">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-16 h-16 rounded-full bg-korami-accent text-korami-black flex items-center justify-center hover:scale-105 transition-transform shadow-neo"
                        >
                            {isPlaying ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                                    <path d="M5 3l14 9-14 9V3z" />
                                </svg>
                            )}
                        </button>

                        <div className="flex items-center gap-1 h-12 w-48">
                            {[...Array(24)].map((_, i) => {
                                // Deterministic heights to prevent hydration mismatch
                                const heights = [35, 80, 45, 90, 20, 60, 100, 30, 75, 40, 85, 25, 65, 95, 50, 70, 45, 80, 55, 90, 60, 85, 40, 75];
                                const height = heights[i];
                                return (
                                    <span
                                        key={i}
                                        className="w-1.5 bg-korami-white/40 rounded-full"
                                        style={{
                                            height: `${height}%`,
                                            ...(isPlaying && {
                                                animation: `wave 1s ease-in-out infinite`,
                                                animationDelay: `${i * 0.05}s`
                                            })
                                        }}
                                    ></span>
                                );
                            })}
                        </div>

                        <span className="text-korami-white/50 font-mono font-bold text-sm">
                            {isPlaying ? "0:12" : "1:45"}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
