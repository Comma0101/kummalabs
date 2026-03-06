"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle2, Ticket, Mic } from "lucide-react";

type Message = {
    role: "user" | "agent";
    text: string;
    delay: number; // ms to wait before showing this message
};

export default function SignatureDemo({ dict }: { dict: any }) {
    const [callState, setCallState] = useState<"idle" | "ringing" | "active" | "completed">("idle");
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMsgIndex, setCurrentMsgIndex] = useState(-1);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Use dictionary for conversation so it switches based on language
    const demoConversation: Message[] = dict.signatureDemo.conversation;

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (callState === "active" && currentMsgIndex < demoConversation.length - 1) {
            const nextIndex = currentMsgIndex + 1;
            timeout = setTimeout(() => {
                setMessages(prev => [...prev, demoConversation[nextIndex]]);
                setCurrentMsgIndex(nextIndex);
            }, demoConversation[nextIndex].delay);
        } else if (callState === "active" && currentMsgIndex === demoConversation.length - 1) {
            timeout = setTimeout(() => setCallState("completed"), 3000);
        }

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callState, currentMsgIndex]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [messages]);

    const handleStartDemo = () => {
        setCallState("ringing");
        setMessages([]);
        setCurrentMsgIndex(-1);
        setTimeout(() => setCallState("active"), 2000); // answer after 2s
    };

    // Calculate dynamic ticket state based on conversation progress
    const items = [];
    if (currentMsgIndex >= 4 && dict.signatureDemo.items) {
        items.push({ name: dict.signatureDemo.items[0].name, qty: 2, price: 24.00, notes: dict.signatureDemo.items[0].notes });
    }
    if (currentMsgIndex >= 4 && dict.signatureDemo.items) {
        const rollObj = { name: dict.signatureDemo.items[1].name, qty: 1, price: 18.50, notes: [] as string[] };
        if (currentMsgIndex >= 6) {
            rollObj.notes = dict.signatureDemo.items[1].notes;
        }
        items.push(rollObj);
    }
    const customerName = currentMsgIndex >= 9 ? "Alex" : dict.signatureDemo.receipt.pendingCustomer;
    const isPaid = currentMsgIndex >= 10;

    return (
        <section id="demo" className="bg-korami-white py-16 md:py-24 border-b-2 border-korami-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-korami-black font-display font-black text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tighter leading-[1] md:leading-[0.95]">
                        {dict.signatureDemo.title}
                    </h2>
                    <p className="text-korami-black/80 text-base md:text-xl md:text-2xl font-bold leading-relaxed max-w-[42rem] mx-auto">
                        {dict.signatureDemo.description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left side: Phone UI */}
                    <div className="bg-korami-black/5 border-2 border-korami-black p-4 md:p-8 relative overflow-hidden h-[500px] md:h-[600px] flex flex-col shadow-neo">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-korami-black/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-korami-accent flex items-center justify-center border-2 border-korami-black">
                                    <Phone className="w-5 h-5 text-korami-black" />
                                </div>
                                <div>
                                    <h3 className="font-display font-black text-xl md:text-2xl text-korami-black leading-tight tracking-tight">{dict.signatureDemo.phone.incomingCall}</h3>
                                    <p className="text-korami-black/70 font-black text-[10px] md:text-xs mt-1 tracking-[0.2em] uppercase">
                                        {callState === "idle" && dict.signatureDemo.phone.statusReady}
                                        {callState === "ringing" && dict.signatureDemo.phone.statusRinging}
                                        {callState === "active" && dict.signatureDemo.phone.statusConnected}
                                        {callState === "completed" && dict.signatureDemo.phone.statusEnded}
                                    </p>
                                </div>
                            </div>

                            {callState === "idle" && (
                                <button
                                    onClick={handleStartDemo}
                                    className="px-4 py-1.5 bg-korami-black text-korami-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] border-2 border-korami-black shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm transition-all flex items-center gap-1.5"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M5 3l14 9-14 9V3z" />
                                    </svg>
                                    {dict.signatureDemo.phone.playAudio}
                                </button>
                            )}
                            {callState === "active" && (
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-[2px] h-4 w-10">
                                        {[...Array(8)].map((_, i) => {
                                            const heights = [40, 80, 50, 100, 30, 75, 45, 90];
                                            return (
                                                <span
                                                    key={i}
                                                    className="w-[2px] bg-korami-accent/80 rounded-full"
                                                    style={{
                                                        height: `${heights[i]}%`,
                                                        animation: `wave 1s ease-in-out infinite`,
                                                        animationDelay: `${i * 0.05}s`
                                                    }}
                                                ></span>
                                            );
                                        })}
                                    </div>
                                    <div className="flex gap-1.5 items-center border-l-2 border-korami-black/10 pl-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-korami-accent animate-pulse"></span>
                                        <span className="text-korami-accent font-mono font-bold text-[10px] tracking-widest uppercase">{dict.signatureDemo.phone.liveAudio}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Transcript Area */}
                        <div className="flex-1 overflow-y-auto pr-4 space-y-4 font-medium" style={{ scrollbarWidth: "thin", scrollbarColor: "#000000 transparent" }}>
                            {callState === "idle" && (
                                <div className="h-full flex flex-col items-center justify-center text-korami-black/40">
                                    <Mic className="w-12 h-12 mb-4 opacity-40" />
                                    <p className="font-display font-bold text-base text-center max-w-[240px] leading-[1.6]">{dict.signatureDemo.phone.instruction}</p>
                                </div>
                            )}

                            <AnimatePresence>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className={`flex flex-col ${msg.role === "agent" ? "items-start" : "items-end"}`}
                                    >
                                        <span className="text-[10px] md:text-xs font-black text-korami-black/70 mb-1 uppercase tracking-[0.2em]">
                                            {msg.role === "agent" ? dict.signatureDemo.phone.agent : dict.signatureDemo.phone.caller}
                                        </span>
                                        <div className={`p-4 max-w-[85%] border-2 border-korami-black shadow-sm ${msg.role === "agent" ? "bg-korami-white text-korami-black" : "bg-korami-accent text-korami-black"
                                            }`}>
                                            <p className="leading-[1.6] font-bold text-[15px]">{msg.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Right side: Receipt UI */}
                    <div className="h-[500px] md:h-[600px] flex items-center justify-center lg:justify-start">
                        <div className="w-full max-w-sm bg-[#FDFAF5] border-2 border-korami-black p-6 md:p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative flex flex-col h-[450px] md:h-[500px]">
                            {/* Zigzag bottom border effect using clip-path or simple SVG approach for receipt feel */}
                            <div className="absolute bottom-0 left-0 right-0 h-3 bg-repeat-x overflow-hidden translate-y-full" style={{
                                backgroundImage: 'linear-gradient(135deg, transparent 50%, #000 50%), linear-gradient(45deg, #000 50%, transparent 50%)',
                                backgroundSize: '12px 100%',
                            }}>
                                <div className="w-full h-[10px] bg-[#FDFAF5] translate-y-[-2px]"></div>
                            </div>

                            <div className="flex justify-between items-start border-b-2 border-korami-black/20 pb-4 mb-6">
                                <div>
                                    <h4 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter leading-none">{dict.signatureDemo.receipt.title}</h4>
                                    <p className="font-mono text-xs md:text-sm font-bold text-korami-black/80 mt-1">{dict.signatureDemo.receipt.orderNumber}</p>
                                </div>
                                <Ticket className="text-korami-black/40 w-8 h-8" />
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="grid grid-cols-[1fr_auto] gap-4 font-mono text-sm border-b-2 border-korami-black/10 pb-2 text-korami-black/80 uppercase">
                                    <span className="font-black">{dict.signatureDemo.receipt.item}</span>
                                    <span className="font-black">{dict.signatureDemo.receipt.qty}</span>
                                </div>

                                {items.length === 0 && callState !== "idle" && (
                                    <div className="text-center py-8 text-korami-black/30 font-mono text-sm italic">
                                        {dict.signatureDemo.receipt.waiting}
                                    </div>
                                )}
                                {items.length === 0 && callState === "idle" && (
                                    <div className="text-center py-8 text-korami-black/30 font-mono text-sm italic">
                                        {dict.signatureDemo.receipt.empty}
                                    </div>
                                )}

                                <AnimatePresence>
                                    {items.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10, filter: 'blur(2px)' }}
                                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="font-mono font-bold text-korami-black"
                                        >
                                            <div className="grid grid-cols-[1fr_auto] gap-4 items-start pb-2">
                                                <div>
                                                    <span className="uppercase">{item.name}</span>
                                                    {item.notes.map((note: string, nIdx: number) => (
                                                        <div key={nIdx} className="text-korami-[#D32F2F] text-xs mt-1 pl-2 border-l-2 border-korami-[#D32F2F] ml-1">
                                                            *** {note}
                                                        </div>
                                                    ))}
                                                </div>
                                                <span>x{item.qty}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="border-t-2 border-korami-black/20 pt-4 mt-auto">
                                <div className="flex justify-between font-mono font-bold text-sm mb-2">
                                    <span className="uppercase text-korami-black/80">{dict.signatureDemo.receipt.customer}</span>
                                    <span>{customerName}</span>
                                </div>
                                <div className="flex justify-between font-mono font-bold text-sm mb-4">
                                    <span className="uppercase text-korami-black/80">{dict.signatureDemo.receipt.type}</span>
                                    <span>{dict.signatureDemo.receipt.phonePickup}</span>
                                </div>

                                {isPaid ? (
                                    <div className="bg-korami-black text-korami-white font-black text-center py-3 uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> {dict.signatureDemo.receipt.readyForKitchen}
                                    </div>
                                ) : (
                                    <div className="bg-korami-black/5 text-korami-black/60 font-black text-center py-3 uppercase tracking-widest text-sm border-2 border-korami-black/20 border-dashed">
                                        {dict.signatureDemo.receipt.drafting}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
