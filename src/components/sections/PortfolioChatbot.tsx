
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
    ArrowUp,
    Bot,
    MessageCircle,
    Sparkles,
    User,
    X,
} from "lucide-react";

type Message = {
    id: number;
    role: "bot" | "user";
    text: string;
};

const suggestions = [
    "What technologies do you use?",
    "Tell me about your projects",
    "How can I hire you?",
];

function getBotReply(question: string): string {
    const value = question.toLowerCase();

    if (
        value.includes("hello") ||
        value.includes("hi") ||
        value.includes("hey")
    ) {
        return "Hey there! 👋 I'm Isahak's portfolio assistant. Ask me about my skills, projects, experience, or how we can work together.";
    }

    if (
        value.includes("skill") ||
        value.includes("technology") ||
        value.includes("tech") ||
        value.includes("stack")
    ) {
        return "I work with HTML, CSS, Tailwind CSS, JavaScript, TypeScript, React.js, Next.js, Node.js, MongoDB and Python. I also use Git, GitHub, VS Code and AI tools in my workflow.";
    }

    if (
        value.includes("project") ||
        value.includes("work") ||
        value.includes("portfolio")
    ) {
        return "Some of my featured projects are Bazar Dor, LexiLearn and my personal portfolio. You can explore the Projects section to see more details.";
    }

    if (value.includes("experience") || value.includes("years")) {
        return "I have 2+ years of experience as a Full Stack Web Developer. I focus on building modern, responsive and user-friendly web experiences.";
    }

    if (
        value.includes("hire") ||
        value.includes("contact") ||
        value.includes("email") ||
        value.includes("available") ||
        value.includes("freelance")
    ) {
        return "I'm available for freelance projects! You can reach Isahak at mdisahakali354@gmail.com or WhatsApp at 01328613789. You can also visit the Contact section.";
    }

    if (
        value.includes("github") ||
        value.includes("code") ||
        value.includes("source")
    ) {
        return "You can explore my code and repositories on GitHub: github.com/isahakdev";
    }

    if (value.includes("linkedin") || value.includes("profile")) {
        return "You can connect with Isahak on LinkedIn: linkedin.com/in/md-isahak-ali/";
    }

    if (
        value.includes("about") ||
        value.includes("yourself") ||
        value.includes("who are you")
    ) {
        return "I'm Isahak Ali, a Full Stack Web Developer and freelancer. I enjoy creating clean, responsive and meaningful digital products.";
    }

    return "That's a good question! I can help with information about Isahak's skills, projects, experience and contact details. Try asking me about one of those topics.";
}

export default function PortfolioChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: "bot",
            text: "Hey! 👋 I'm Isahak's portfolio assistant. What would you like to know?",
        },
    ]);

    const nextMessageId = useRef(2);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, isOpen]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    function sendMessage(text: string) {
        const question = text.trim();

        if (!question || isTyping) return;

        const userMessage: Message = {
            id: nextMessageId.current++,
            role: "user",
            text: question,
        };

        setMessages((current) => [...current, userMessage]);
        setInput("");
        setIsTyping(true);

        timeoutRef.current = window.setTimeout(() => {
            const reply: Message = {
                id: nextMessageId.current++,
                role: "bot",
                text: getBotReply(question),
            };

            setMessages((current) => [...current, reply]);
            setIsTyping(false);
            timeoutRef.current = null;
        }, 700);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        sendMessage(input);
    }

    return (
        <div className="portfolio-chatbot">
            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="chat-launcher"
                    aria-label="Open portfolio chatbot"
                >
                    <MessageCircle size={19} />
                    <span>Ask me anything</span>
                    <span className="chat-launcher-pulse" />
                </button>
            )}

            {isOpen && (
                <section
                    className="chat-window"
                    aria-label="Portfolio chatbot"
                >
                    <header className="chat-header">
                        <div className="flex items-center gap-3">
                            <div className="chat-avatar">
                                <Bot size={21} />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold">
                                    Isahak&apos;s Assistant
                                </h3>

                                <p className="chat-status">
                                    <span />
                                    Online · Portfolio assistant
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="chat-close"
                            aria-label="Close chatbot"
                        >
                            <X size={19} />
                        </button>
                    </header>

                    <div className="chat-messages">
                        <div className="chat-date-label">TODAY</div>

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`chat-message-row ${message.role === "user"
                                        ? "chat-message-user"
                                        : "chat-message-bot"
                                    }`}
                            >
                                {message.role === "bot" && (
                                    <div className="chat-message-avatar">
                                        <Bot size={15} />
                                    </div>
                                )}

                                <div className="chat-bubble">{message.text}</div>

                                {message.role === "user" && (
                                    <div className="chat-message-avatar user-avatar">
                                        <User size={15} />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="chat-message-row chat-message-bot">
                                <div className="chat-message-avatar">
                                    <Bot size={15} />
                                </div>

                                <div className="chat-bubble chat-typing">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    {messages.length === 1 && (
                        <div className="chat-suggestions">
                            <p>Try asking</p>

                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => sendMessage(suggestion)}
                                >
                                    <Sparkles size={13} />
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    <form
                        className="chat-input-form"
                        onSubmit={handleSubmit}
                    >
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Type your message..."
                            aria-label="Type your message"
                        />

                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            aria-label="Send message"
                        >
                            <ArrowUp size={19} />
                        </button>
                    </form>

                    <p className="chat-footer">
                        <Sparkles size={11} />
                        Powered by Isahak&apos;s portfolio
                    </p>
                </section>
            )}
        </div>
    );
}
