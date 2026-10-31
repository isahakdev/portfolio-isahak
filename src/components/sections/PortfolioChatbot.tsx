
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
    MessageCircle,
    X,
    Send,
    Bot,
    Maximize2,
    Minimize2,
} from "lucide-react";

type Message = {
    from: "bot" | "user";
    text: string;
};

type Topic =
    | "general"
    | "greeting"
    | "mood"
    | "contact"
    | "email"
    | "whatsapp"
    | "projects"
    | "skills"
    | "about"
    | "experience"
    | "help"
    | "joke"
    | "complaint"
    | "goodbye";

const initialMessages: Message[] = [
    {
        from: "bot",
        text: "Hey there! 👋 Welcome to my portfolio. How can I help you?",
    },
];

const replies: Record<string, string[]> = {
    greeting: [
        "Hey! 😊 Great to see you here. What's going on?",
        "Hello! 👋 How's your day going?",
        "Hi there! Nice to meet you!",
        "Hey buddy! 😄 What are we talking about today?",
        "Hello again! What's up?",
    ],
    fine: [
        "That's wonderful! 😊 What are you doing today?",
        "Glad to hear that! 💚 Anything interesting happening?",
        "Awesome! 😄 So, what brings you here?",
        "Great! Hope your day keeps getting better!",
    ],
    badMood: [
        "Oh no! 😟 What happened? Want to talk about it?",
        "I'm sorry to hear that. I'm listening. 💚",
        "Having a bad day? Feel free to talk to me.",
        "That's not good. Is there anything I can do to help?",
    ],
    casual: [
        "Haha! 😄 Tell me more.",
        "Interesting! I'm listening. 👀",
        "Oh really? What happened next?",
        "That's interesting! Tell me more.",
        "I'm listening. 😊 Go on!",
        "Alright! What's else on your mind?",
        "Sounds interesting! Keep going.",
        "Really? I'd love to hear more.",
        "Okay! And then?",
        "Haha, I see! Tell me more.",
    ],
    joke: [
        "Why do programmers prefer dark mode? Because light attracts bugs! 😂",
        "A programmer's life: Eat, sleep, code, debug, repeat! 😆",
        "I tried to write a joke about JavaScript, but it didn't work! 😂",
        "Why was the computer cold? Because it left its Windows open! 😄",
    ],
    problem: [
        "What's wrong? Tell me about it. 😊",
        "No worries! Tell me what's going on.",
        "I'm listening. Let's figure it out together.",
        "Tell me what happened. I'll try my best to help.",
    ],
    confused: [
        "Could you explain what you mean?",
        "Hmm! I might be missing something. Tell me a little more.",
        "I didn't quite catch that. Could you rephrase it?",
        "I'm listening! Give me a little more context.",
    ],
    thanks: [
        "You're most welcome! 💚",
        "Anytime! Happy to help. 😊",
        "My pleasure!",
        "You're welcome! Let me know if you need anything else.",
    ],
    goodbye: [
        "See you later! Take care. 💚",
        "Goodbye! Thanks for visiting!",
        "It was nice chatting with you. Come back anytime!",
    ],
    apology: [
        "No worries! 😊 It's totally okay.",
        "That's alright. Let's keep chatting!",
        "Don't worry about it!",
    ],
    compliment: [
        "Aww! Thank you so much! 😊",
        "That's really sweet of you!",
        "Haha, you're making me blush! 😄",
        "You're very kind. Thank you!",
    ],
    angry: [
        "Hey, easy there! 😅 What's going on?",
        "Sorry if I annoyed you. Tell me what went wrong.",
        "I'm listening. Let's keep things friendly!",
    ],
    repeat: [
        "Sorry about that! 😅 I'll try a different response.",
        "You're right! I shouldn't keep repeating myself.",
        "Got it! Let me respond differently this time.",
    ],
};

function normalize(value: string): string {
    return value
        .toLowerCase()
        .replace(/[?!.,;:'"()[\]{}]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function has(text: string, words: string[]): boolean {
    return words.some((word) => text.includes(word));
}

function exact(text: string, words: string[]): boolean {
    return words.includes(text);
}

function randomReply(key: string): string {
    const list = replies[key] || replies.casual;
    return list[Math.floor(Math.random() * list.length)];
}

function getReply(
    input: string,
    previousTopic: Topic,
    lastBotReply: string
): { text: string; topic: Topic } {
    const text = normalize(input);

    const result = (message: string, topic: Topic = "general") => ({
        text: message,
        topic,
    });

    if (!text) {
        return result("Please type something so we can chat! 😊");
    }

    if (
        has(text, [
            "speak english",
            "talk in english",
            "english e bolo",
            "english e kotha bolo",
            "engrejite bol",
            "english please",
            "only english",
            "sudhu english",
        ]) ||
        exact(text, ["english"])
    ) {
        return result("Of course! I'll speak only English from now on. 😊");
    }

    if (
        has(text, [
            "same answer",
            "same reply",
            "same response",
            "ekoi uttor",
            "ekoi kotha",
            "same kotha",
            "repeat korcho",
            "বারবার একই",
            "একই উত্তর",
        ])
    ) {
        return result(randomReply("repeat"), "complaint");
    }

    if (
        has(text, [
            "not email",
            "no email",
            "dont want email",
            "don't want email",
            "email chai na",
            "mail chai na",
        ])
    ) {
        return result(
            "No problem! 😊 I won't share the email. Would you prefer WhatsApp or something else?",
            "contact"
        );
    }

    if (exact(text, ["only email", "email only", "just email", "only mail", "just mail"])) {
        return result(
            "Sure! Here is only Isahak's email address:\n\n📧 mdisahakali354@gmail.com",
            "email"
        );
    }

    if (
        exact(text, ["whatsapp", "whatapp", "whats app", "wa"]) ||
        has(text, ["whatsapp number", "whatsapp no", "whatsapp contact", "whatsapp dao"])
    ) {
        return result(
            "Sure! 😊 You can contact Isahak on WhatsApp:\n\n📱 01328613789",
            "whatsapp"
        );
    }

    if (
        exact(text, ["email", "mail", "e mail"]) ||
        has(text, ["email address", "email id", "his email", "your email", "email dao", "email please"])
    ) {
        return result(
            "You can email Isahak here:\n\n📧 mdisahakali354@gmail.com",
            "email"
        );
    }

    if (
        previousTopic === "email" &&
        has(text, ["i got email", "got email", "got it", "received email", "i have email"])
    ) {
        return result(
            "Great! 😊 Were you able to contact Isahak successfully?",
            "email"
        );
    }

    if (
        previousTopic === "whatsapp" &&
        has(text, ["got it", "saved", "number saved"])
    ) {
        return result(
            "Great! 😄 You can message Isahak whenever you need.",
            "whatsapp"
        );
    }

    if (
        exact(text, ["contact"]) ||
        has(text, ["contact details", "phone number", "mobile number", "contact info", "number dao"])
    ) {
        return result(
            "Here are Isahak's contact details:\n\n📱 WhatsApp: 01328613789\n📧 Email: mdisahakali354@gmail.com",
            "contact"
        );
    }

    if (
        /^(hi+|hai+|hello+|helo+|hey+|heyy+)$/.test(text) ||
        exact(text, ["good morning", "good afternoon", "good evening", "salam", "assalamu alaikum"])
    ) {
        return result(randomReply("greeting"), "greeting");
    }

    if (has(text, ["how are you", "how r u", "how are u", "how you doing"])) {
        return result("I'm doing great! 😊 Thanks for asking. How about you?", "mood");
    }

    if (
        has(text, [
            "i am fine",
            "im fine",
            "i m fine",
            "i am good",
            "im good",
            "i am okay",
            "fine thanks",
        ])
    ) {
        return result(randomReply("fine"), "mood");
    }

    if (has(text, ["i am sad", "im sad", "feeling sad", "not good", "bad day"])) {
        return result(randomReply("badMood"), "mood");
    }

    if (has(text, ["what are you doing", "what r u doing", "what do you do"])) {
        return result(
            "I'm here chatting with you and helping visitors explore Isahak's portfolio! 😄 What about you?"
        );
    }

    if (has(text, ["why did you say", "why you gave", "why did you give"])) {
        return result(
            "Sorry! 😅 I misunderstood what you wanted. Could you tell me what you were expecting?",
            "complaint"
        );
    }

    if (has(text, ["like me", "love you", "miss you", "i like you", "you are nice"])) {
        return result(randomReply("compliment"));
    }

    if (has(text, ["joke", "funny", "make me laugh"])) {
        return result(randomReply("joke"), "joke");
    }

    if (has(text, ["bal", "pagol", "stupid", "idiot", "shut up", "ajob"])) {
        return result(randomReply("angry"), "complaint");
    }

    if (has(text, ["i didn't ask", "i did not ask", "not what i asked", "i don't want that"])) {
        return result(
            "Sorry about that! I misunderstood you. Tell me what you actually wanted, and I'll try to help.",
            "complaint"
        );
    }

    if (has(text, ["sorry", "my bad", "apologize"])) {
        return result(randomReply("apology"));
    }

    if (has(text, ["your name", "who are you"])) {
        return result(
            "I'm the portfolio assistant! 🤖 I'm here to help you learn about Isahak and have a friendly chat."
        );
    }

    if (has(text, ["what can you do", "how can you help", "what can i ask"])) {
        return result(
            "You can ask me about Isahak's projects, skills, experience, services and contact details. Or we can just have a casual chat! 😊",
            "help"
        );
    }

    if (has(text, ["bazar dor", "bazardor"])) {
        return result(
            "Bazar Dor is one of Isahak's featured projects. 🚀 You can explore it in the Projects section.",
            "projects"
        );
    }

    if (text.includes("lexilearn")) {
        return result(
            "LexiLearn is one of Isahak's featured projects. You can explore it in the Projects section. 😊",
            "projects"
        );
    }

    if (has(text, ["project", "projects", "portfolio"])) {
        return result(
            "Isahak's featured projects include:\n\n1. Bazar Dor\n2. LexiLearn\n3. Personal Portfolio\n\n🚀 Check out the Projects section!",
            "projects"
        );
    }

    if (has(text, ["skill", "skills", "technology", "tech stack", "react", "nextjs", "next js", "javascript", "typescript", "python", "mongodb", "tailwind"])) {
        return result(
            "Isahak's technology stack includes:\n\n💻 Frontend: HTML, CSS, Tailwind CSS, JavaScript, TypeScript, React and Next.js.\n\n⚙️ Backend: Node.js and Python.\n\n🗄️ Database: MongoDB.\n\n🛠️ Tools: Git, GitHub, VS Code and Figma.",
            "skills"
        );
    }

    if (has(text, ["experience", "career", "freelancer", "freelance", "how many years", "years of experience"])) {
        return result(
            "Isahak is a Full Stack Web Developer and freelancer with 2+ years of experience. 🚀",
            "experience"
        );
    }

    if (has(text, ["about", "who is isahak", "introduce", "tell me about isahak"])) {
        return result(
            "Isahak Ali is a Full Stack Web Developer and freelancer with 2+ years of experience. He enjoys building modern, responsive and meaningful digital experiences. 👋",
            "about"
        );
    }

    if (has(text, ["service", "services", "hire", "hiring", "available", "web development", "website", "developer"])) {
        return result(
            "Isahak works with modern web technologies and can discuss your website or full-stack development requirements. You can contact him at 01328613789.",
            "general"
        );
    }

    if (has(text, ["problem", "problems", "issue", "issues", "trouble", "help", "support"])) {
        return result(randomReply("problem"), "help");
    }

    if (has(text, ["thanks", "thank you", "thnx", "thx"])) {
        return result(randomReply("thanks"));
    }

    if (has(text, ["bye", "goodbye", "see you"])) {
        return result(randomReply("goodbye"), "goodbye");
    }

    if (exact(text, ["more", "more details", "tell me more", "explain", "and then", "then"])) {
        const followUps: Record<Topic, string> = {
            general: "Sure! What would you like to know more about? 😊",
            greeting: "So, tell me about yourself! How is your day going?",
            mood: "That's nice! What are you up to today?",
            contact: "You can contact Isahak by WhatsApp at 01328613789 or email at mdisahakali354@gmail.com.",
            email: "Isahak's email is mdisahakali354@gmail.com.",
            whatsapp: "Isahak's WhatsApp number is 01328613789.",
            projects: "Isahak's featured projects include Bazar Dor, LexiLearn and Personal Portfolio.",
            skills: "Isahak works with React, Next.js, TypeScript, Node.js, Python and MongoDB.",
            about: "Isahak Ali is a Full Stack Web Developer and freelancer.",
            experience: "Isahak has 2+ years of experience as a Full Stack Web Developer.",
            help: "You can ask about projects, skills, experience, services or contact details.",
            joke: randomReply("joke"),
            complaint: "I'm listening. Tell me what you'd like me to do differently.",
            goodbye: "Feel free to come back anytime!",
        };

        return result(followUps[previousTopic], previousTopic);
    }

    if (exact(text, ["ok", "okay", "hmm", "hm", "acha", "accha", "alright"])) {
        return result(randomReply("casual"));
    }

    if (exact(text, ["what", "how", "who", "why", "when"])) {
        return result("What would you like to know? 😊 Give me a little more detail and I'll do my best to help.");
    }

    const fallback = [
        "I'm listening! 😊 Could you tell me a little more?",
        "That's interesting! What happened next?",
        "Hmm! Tell me more so I can understand.",
        "I see! What do you think about it?",
        "Oh really? I'd love to hear more.",
        "Could you explain that in another way?",
        "Interesting! What's on your mind?",
        "I'm here! Feel free to tell me anything.",
        "Okay! I'd like to hear more about that.",
        "Go on! I'm listening.",
    ];

    let nextReply = randomReply("casual");

    for (let attempt = 0; attempt < 10; attempt++) {
        const candidate = fallback[Math.floor(Math.random() * fallback.length)];
        if (candidate !== lastBotReply) {
            nextReply = candidate;
            break;
        }
    }

    return result(nextReply);
}

export default function PortfolioChatbot() {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    const previousTopicRef = useRef<Topic>("general");
    const lastBotReplyRef = useRef("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, typing]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";

            const focusTimer = setTimeout(() => {
                inputRef.current?.focus();
            }, 150);

            return () => {
                clearTimeout(focusTimer);
                document.body.style.overflow = "";
            };
        }

        document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    function sendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const userText = input.trim();
        if (!userText || typing) return;

        setMessages((prev) => [...prev, { from: "user", text: userText }]);
        setInput("");
        setTyping(true);

        const reply = getReply(userText, previousTopicRef.current, lastBotReplyRef.current);
        previousTopicRef.current = reply.topic;
        lastBotReplyRef.current = reply.text;

        timerRef.current = setTimeout(() => {
            setMessages((prev) => [...prev, { from: "bot", text: reply.text }]);
            setTyping(false);
            timerRef.current = null;
        }, 450 + Math.random() * 300);
    }

    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Close chat backdrop"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-[998] cursor-default bg-black/30 backdrop-blur-[2px] sm:hidden"
                />
            )}

            <div
                className={`fixed z-[999] flex flex-col transition-all duration-300
                    ${
                        open
                            ? expanded
                                ? "inset-0 h-[100dvh] w-full rounded-none sm:inset-4 sm:h-[calc(100dvh-2rem)] sm:w-[min(720px,calc(100vw-2rem))] sm:ml-auto sm:rounded-2xl"
                                : "inset-x-0 bottom-0 h-[min(680px,88dvh)] w-full rounded-t-3xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(620px,calc(100dvh-3rem))] sm:w-[min(390px,calc(100vw-3rem))] sm:rounded-2xl"
                            : "bottom-5 right-4 h-14 w-14 sm:bottom-6 sm:right-6"
                    }`}
            >
                {open ? (
                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-950 sm:rounded-2xl">
                        {/* Header */}
                        <div className="flex shrink-0 items-center justify-between bg-zinc-900 px-4 py-3.5 text-white sm:px-5">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="shrink-0 rounded-full bg-lime-400 p-2 text-black">
                                    <Bot size={21} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-semibold">
                                        Hello Assistant
                                    </h3>
                                    <p className="flex items-center gap-1.5 text-xs text-lime-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                                        Online
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setExpanded(!expanded)}
                                    aria-label={expanded ? "Minimize chat" : "Expand chat"}
                                    className="hidden rounded-lg p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white sm:inline-flex"
                                >
                                    {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    aria-label="Close chat"
                                    className="rounded-lg p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                                >
                                    <X size={21} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-zinc-50 p-3 dark:bg-zinc-900 sm:p-4">
                            {messages.map((message, index) => (
                                <div
                                    key={`${index}-${message.from}`}
                                    className={`flex ${
                                        message.from === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[88%] break-words rounded-2xl px-3.5 py-3 text-[13px] leading-relaxed sm:max-w-[85%] sm:px-4 sm:text-sm ${
                                            message.from === "user"
                                                ? "rounded-br-sm bg-lime-400 text-black"
                                                : "rounded-bl-sm bg-white text-zinc-800 shadow-sm dark:bg-zinc-800 dark:text-white"
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}

                            {typing && (
                                <div className="flex justify-start">
                                    <div className="rounded-2xl bg-white px-4 py-3 text-sm text-zinc-500 shadow-sm dark:bg-zinc-800">
                                        <span className="inline-flex items-center gap-1">
                                            Typing
                                            <span className="animate-pulse">...</span>
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={sendMessage}
                            className="flex shrink-0 items-center gap-2 border-t border-zinc-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-zinc-700 dark:bg-zinc-950 sm:p-3"
                        >
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                aria-label="Type your message"
                                autoComplete="off"
                                className="min-w-0 flex-1 rounded-full bg-zinc-100 px-4 py-3 text-base text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:ring-2 focus:ring-lime-400 dark:bg-zinc-800 dark:text-white sm:text-sm"
                                disabled={typing}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || typing}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Send message"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-label="Open chatbot"
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-black shadow-xl transition hover:scale-110"
                    >
                        <MessageCircle size={25} />
                    </button>
                )}
            </div>
        </>
    );
}
