
"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowDown,
    ArrowRight,
    BriefcaseBusiness,
    Code2,
    Layers3,
    Mail,
    Sparkles,
    UserRound,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const shortcuts = [
    {
        label: "About Me",
        href: "#about",
        icon: UserRound,
    },
    {
        label: "Projects",
        href: "#projects",
        icon: Layers3,
    },
    {
        label: "Skills",
        href: "#skills",
        icon: Code2,
    },
    {
        label: "Experience",
        href: "#experience",
        icon: BriefcaseBusiness,
    },
];

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.12,
            },
        },
    };

    return (
        <section
            id="home"
            className="relative isolate min-h-screen overflow-hidden bg-[#090d0b] text-white"
        >
            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-lime-400/[0.09] blur-[130px]" />

                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.09] blur-[130px]" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:55px_55px]" />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#090d0b]" />
            </div>

            {/* Main Container */}
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-20 pt-32 sm:px-8 lg:px-12">

                <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

                    {/* Left Content */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="relative z-10"
                    >

                        {/* Availability Badge */}
                        <motion.div variants={fadeUp}>
                            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-lime-400/20 bg-lime-400/[0.07] px-4 py-2.5 backdrop-blur-md">

                                <span className="relative flex h-2.5 w-2.5">
                                    {!shouldReduceMotion && (
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-50" />
                                    )}

                                    <span className="relative h-2.5 w-2.5 rounded-full bg-lime-400" />
                                </span>

                                <span className="text-xs font-semibold tracking-wide text-lime-300 sm:text-sm">
                                    Available for Freelance Work
                                </span>
                            </div>
                        </motion.div>

                        {/* Introduction */}
                        <motion.p
                            variants={fadeUp}
                            className="mb-4 text-lg font-medium text-gray-400 sm:text-xl"
                        >
                            Hello, I&apos;m
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
                        >
                            Isahak
                            <span className="block bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
                                Ali.
                            </span>
                        </motion.h1>

                        {/* Profession */}
                        <motion.div variants={fadeUp}>
                            <h2 className="mt-7 text-2xl font-bold leading-snug text-white sm:text-3xl">
                                Full Stack Web Developer
                                <span className="text-lime-400">.</span>
                            </h2>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={fadeUp}
                            className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg"
                        >
                            I build modern, responsive, and user-friendly web applications.
                            With 1+ years of experience, I turn ideas into functional
                            digital experiences using modern web technologies.
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-9 flex flex-wrap items-center gap-4"
                        >
                            <Link
                                href="#projects"
                                className="group inline-flex items-center gap-3 rounded-xl bg-lime-400 px-7 py-4 text-sm font-bold text-black shadow-lg shadow-lime-400/10 transition-all duration-300 hover:-translate-y-1 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/20"
                            >
                                Explore My Work

                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>

                            <Link
                                href="#contact"
                                className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/50 hover:bg-lime-400/[0.08] hover:text-lime-300"
                            >
                                <Mail
                                    size={18}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />

                                Contact Me
                            </Link>
                        </motion.div>

                        {/* Quick Navigation */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-14 border-t border-white/[0.08] pt-7"
                        >
                            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
                                Explore More
                            </p>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {shortcuts.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="group flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:bg-lime-400/[0.07]"
                                        >
                                            <Icon
                                                size={18}
                                                className="shrink-0 text-lime-400 transition-transform duration-300 group-hover:scale-110"
                                            />

                                            <span className="text-sm font-semibold text-gray-300 transition-colors duration-300 group-hover:text-lime-300">
                                                {item.label}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Profile Image */}
                    <motion.div
                        initial={
                            shouldReduceMotion
                                ? false
                                : { opacity: 0, scale: 0.92, x: 30 }
                        }
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative mx-auto w-full max-w-[420px]"
                    >

                        {/* Image Glow */}
                        <div className="absolute inset-5 rounded-full bg-lime-400/20 blur-[90px]" />

                        {/* Decorative Ring */}
                        <div className="absolute inset-0 scale-[1.08] rounded-full border border-dashed border-lime-400/20" />

                        {/* Profile Frame */}
                        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-lime-400/25 bg-[#111914] p-3 shadow-2xl shadow-black/50">

                            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-[#18221b]">

                                <Image
                                    src="/images/profil.png"
                                    alt="Isahak Ali - Full Stack Web Developer"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 85vw, 420px"
                                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#090d0b]/60 via-transparent to-transparent" />
                            </div>
                        </div>

                        {/* Floating Developer Badge */}
                        <motion.div
                            animate={
                                shouldReduceMotion
                                    ? undefined
                                    : { y: [0, -9, 0] }
                            }
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -left-5 top-12 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151d17]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-10"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                                <Code2 size={22} />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-white">
                                    Clean Code
                                </p>

                                <p className="text-xs text-gray-400">
                                    Modern Development
                                </p>
                            </div>
                        </motion.div>

                        {/* Floating Experience Badge */}
                        <motion.div
                            animate={
                                shouldReduceMotion
                                    ? undefined
                                    : { y: [0, 10, 0] }
                            }
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -bottom-5 -right-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#151d17]/95 px-5 py-4 shadow-xl backdrop-blur-xl sm:-right-8"
                        >
                            <Sparkles size={25} className="text-lime-400" />

                            <div>
                                <p className="text-xl font-black text-white">
                                    1+ Years
                                </p>

                                <p className="text-xs font-medium text-gray-400">
                                    Experience
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.7 }}
                    className="mt-20 hidden items-center justify-center gap-3 text-gray-500 md:flex"
                >
                    <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                        Scroll to explore
                    </span>

                    <ArrowDown
                        size={16}
                        className="animate-bounce text-lime-400"
                    />
                </motion.div>
            </div>
        </section>
    );
}
