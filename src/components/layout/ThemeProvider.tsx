"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

import FluidBackground from "@/components/effects/FluidBackground";
import CursorFollower from "@/components/effects/CursorFollower";

type Props = {
    children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <FluidBackground />
            <CursorFollower />

            {children}
        </NextThemesProvider>
    );
}