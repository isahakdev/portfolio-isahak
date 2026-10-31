
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    Menu,
    X,
} from "lucide-react";

import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header
            className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled
                    ? "border-[var(--border)] bg-[var(--background)]/90 shadow-sm backdrop-blur-2xl"
                    : "border-transparent bg-[var(--background)]/65 backdrop-blur-xl"
                }`}
        >
            <div className="container-custom flex h-[68px] items-center justify-between sm:h-[76px]">

                {/* Logo */}

                <Link
                    href="#home"
                    onClick={closeMenu}
                    className="group text-2xl font-bold tracking-[-0.08em] transition-transform duration-300 hover:scale-105"
                >
                    Isahak
                    <span className="text-[var(--primary-strong)]">
                        .
                    </span>
                </Link>

                {/* Desktop Navigation */}

                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-1 md:flex"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:bg-[var(--primary)]/10 hover:text-[var(--primary-strong)]"
                        >
                            {link.label}

                            <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[var(--primary-strong)] transition-all duration-300 group-hover:w-1/2" />
                        </a>
                    ))}
                </nav>

                {/* Actions */}

                <div className="flex items-center gap-2 sm:gap-3">

                    <ThemeToggle />

                    <a
                        href="#contact"
                        className="btn-primary hidden min-h-11 gap-2 px-5 transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex"
                    >
                        Let&apos;s Talk

                        <ArrowUpRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </a>

                    {/* Mobile Menu Button */}

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 hover:border-[var(--primary-strong)] hover:bg-[var(--primary)]/10 active:scale-90 md:hidden"
                    >
                        <span
                            className={`transition-transform duration-300 ${menuOpen ? "rotate-90" : "rotate-0"
                                }`}
                        >
                            {menuOpen ? (
                                <X size={20} />
                            ) : (
                                <Menu size={20} />
                            )}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}

            <div
                id="mobile-navigation"
                aria-hidden={!menuOpen}
                className={`grid overflow-hidden border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-2xl transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${menuOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] border-transparent opacity-0"
                    }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <nav
                        aria-label="Mobile navigation"
                        className="container-custom flex flex-col gap-1 px-6 py-4"
                    >
                        {navLinks.map((link, index) => (
                            <a
                                key={link.href}
                                href={link.href}
                                tabIndex={menuOpen ? 0 : -1}
                                onClick={closeMenu}
                                style={{
                                    transitionDelay: menuOpen
                                        ? `${index * 45}ms`
                                        : "0ms",
                                }}
                                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-muted transition-all duration-300 hover:bg-[var(--primary)]/10 hover:text-[var(--primary-strong)] ${menuOpen
                                        ? "translate-y-0 opacity-100"
                                        : "-translate-y-2 opacity-0"
                                    }`}
                            >
                                {link.label}

                                <ArrowUpRight
                                    size={16}
                                    className="opacity-50"
                                />
                            </a>
                        ))}

                        <a
                            href="#contact"
                            tabIndex={menuOpen ? 0 : -1}
                            onClick={closeMenu}
                            className="btn-primary mt-3 flex w-full justify-center gap-2"
                        >
                            Let&apos;s Talk

                            <ArrowUpRight size={17} />
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
