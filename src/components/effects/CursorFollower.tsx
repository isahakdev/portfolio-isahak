"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (
            window.matchMedia("(pointer: coarse)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) return;

        const ring = ringRef.current;
        const dot = dotRef.current;

        if (!ring || !dot) return;

        let x = -100;
        let y = -100;
        let rx = -100;
        let ry = -100;
        let frame = 0;

        const move = (e: PointerEvent) => {
            x = e.clientX;
            y = e.clientY;

            dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            if (!frame) frame = requestAnimationFrame(animate);
        };

        function animate() {
            rx += (x - rx) * 0.2;
            ry += (y - ry) * 0.2;

            ring!.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

            if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) {
                frame = requestAnimationFrame(animate);
            } else {
                frame = 0;
            }
        }

        const hover = (e: PointerEvent) => {
            const target = e.target;
            const interactive =
                target instanceof Element &&
                !!target.closest("a, button, input, textarea");

            ring.classList.toggle("cursor-hover", interactive);
        };

        window.addEventListener("pointermove", move);
        document.addEventListener("pointerover", hover);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", move);
            document.removeEventListener("pointerover", hover);
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className="custom-cursor-ring" />
            <div ref={dotRef} className="custom-cursor-dot" />
        </>
    );
}