"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

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

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl">
            <div className="container-custom flex h-[76px] items-center justify-between">
                {/* Logo */}
                <Link
                    href="#home"
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-bold tracking-[-0.08em]"
                >
                    Isahak<span className="text-[var(--primary-strong)]">.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-8 md:flex"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted transition hover:text-[var(--primary-strong)]"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    <a
                        href="#contact"
                        className="btn-primary hidden min-h-11 px-5 sm:inline-flex"
                    >
                        Let&apos;s Talk
                        <ArrowUpRight size={17} />
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] md:hidden"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="border-t border-[var(--border)] bg-[var(--background)] px-6 py-6 md:hidden">
                    <nav
                        aria-label="Mobile navigation"
                        className="container-custom flex flex-col gap-5"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-base font-medium text-muted transition hover:text-[var(--primary-strong)]"
                            >
                                {link.label}
                            </a>
                        ))}

                        <a
                            href="#contact"
                            onClick={() => setMenuOpen(false)}
                            className="btn-primary mt-2 w-full"
                        >
                            Let&apos;s Talk
                            <ArrowUpRight size={17} />
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}