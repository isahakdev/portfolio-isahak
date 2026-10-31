
"use client";

import { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import PortfolioChatbot from "./PortfolioChatbot";

export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-5 right-5 z-[99990] sm:bottom-7 sm:right-7">

            {isOpen && (
                <div className="mb-4 flex h-[min(580px,75svh)] w-[min(370px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-950">

                    <div className="flex items-center justify-between border-b border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 text-zinc-950">
                                <Sparkles size={20} />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                                    Isahak AI
                                </h3>
                                <p className="text-xs text-zinc-500">
                                    Ask me anything
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chatbot"
                            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-3">
                        <PortfolioChatbot />
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
                aria-expanded={isOpen}
                className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-zinc-950 shadow-[0_8px_30px_rgba(163,230,53,0.35)] transition duration-300 hover:scale-110 hover:bg-lime-300"
            >
                {isOpen ? (
                    <X size={25} />
                ) : (
                    <MessageCircle size={25} />
                )}
            </button>
        </div>
    );
}
