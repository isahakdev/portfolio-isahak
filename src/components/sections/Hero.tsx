"use client";

import Image from "next/image";
import {
    Smile,
    BriefcaseBusiness,
    Layers3,
    PartyPopper,
    UserRound,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const shortcuts = [
    { label: "Me", icon: Smile, href: "#about", color: "#26a6a1" },
    { label: "Projects", icon: BriefcaseBusiness, href: "#projects", color: "#35a65b" },
    { label: "Skills", icon: Layers3, href: "#skills", color: "#8b6cf0" },
    { label: "Fun", icon: PartyPopper, href: "#experience", color: "#df79b5" },
    { label: "Contact", icon: UserRound, href: "#contact", color: "#d49a36" },
];

export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex min-h-[calc(100svh-76px)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute left-1/2 top-[15%] h-[430px] w-[430px] -translate-x-1/2 rounded-full bg-[#c8f8ed]/25 blur-[110px]" />
                <div className="absolute left-[8%] top-[28%] h-[280px] w-[280px] rounded-full bg-[#a7dfff]/20 blur-[100px]" />
                <div className="absolute right-[8%] top-[25%] h-[320px] w-[320px] rounded-full bg-[#ff9ce5]/20 blur-[110px]" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">

                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#a3e635]/60 bg-white/80 px-4 py-2 text-xs font-semibold text-[#527c27] shadow-sm backdrop-blur-md dark:border-lime-400/30 dark:bg-zinc-900/80 dark:text-lime-300">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500" />
                    </span>
                    Available for freelance projects
                </div>

                <div className="mb-2 flex items-center justify-center gap-2 text-base font-medium text-zinc-600 dark:text-zinc-300 sm:text-lg">
                    Hey, I&apos;m Isahak 👋
                </div>

                <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.08] tracking-[-0.065em] text-zinc-950 dark:text-white sm:text-6xl md:text-7xl lg:text-[82px]">
                    Full Stack
                    <span className="block gradient-text">Web Developer.</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-8">
                    I&apos;m a Full Stack Web Developer with 2+ years of
                    experience, passionate about creating modern,
                    responsive and meaningful digital products.
                </p>

                <div className="relative mt-9 flex h-44 w-44 items-center justify-center sm:mt-10 sm:h-52 sm:w-52">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#75f5ed] via-[#c8b8ff] to-[#ff9ce5] p-[3px] shadow-[0_15px_45px_rgba(110,160,150,0.18)]">
                        <div className="h-full w-full rounded-full bg-white p-[5px] dark:bg-zinc-900">
                            <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                                <Image
                                    src="/images/profil.png"
                                    alt="Md Isahak Ali"
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 176px, 208px"
                                    className="object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="absolute -right-3 top-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white bg-white/90 text-[#75c94a] shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                        <Sparkles size={19} />
                    </div>
                </div>

                <p className="mt-5 text-lg font-bold text-zinc-900 dark:text-white">
                    Md Isahak Ali
                </p>

                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Full Stack Web Developer
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:-translate-y-1 hover:bg-[#b5f58a]"
                    >
                        Explore Projects <ArrowRight size={17} />
                    </a>

                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:-translate-y-1 hover:border-lime-400 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-white"
                    >
                        Contact Me
                    </a>
                </div>

                <nav
                    aria-label="Quick navigation"
                    className="mt-7 grid w-full max-w-[620px] grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3"
                >
                    {shortcuts.map((item) => {
                        const Icon = item.icon;

                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                className="group flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-200/90 bg-white/75 px-3 py-3 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-lime-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/75"
                            >
                                <Icon
                                    size={18}
                                    style={{ color: item.color }}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                                    {item.label}
                                </span>
                            </a>
                        );
                    })}
                </nav>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-9 left-1/2 -z-0 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.09em] text-zinc-900/[0.035] dark:text-white/[0.035]"
            >
                IS AHAK
            </div>
        </section>
    );
}