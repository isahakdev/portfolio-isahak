
"use client";

import { useEffect, useRef } from "react";

export default function CursorFollower() {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (isTouchDevice || prefersReducedMotion) return;

        const ring = ringRef.current;
        const dot = dotRef.current;

        if (!ring || !dot) return;

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;

        let animationFrame = 0;
        let isVisible = false;
        let isHovering = false;

        const followSpeed = 0.16;

        const animate = () => {
            ringX += (mouseX - ringX) * followSpeed;
            ringY += (mouseY - ringY) * followSpeed;

            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

            const distance = Math.hypot(mouseX - ringX, mouseY - ringY);

            if (distance > 0.1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                animationFrame = 0;
            }
        };

        const move = (event: PointerEvent) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            if (!isVisible) {
                isVisible = true;
                ring.classList.add("cursor-visible");
                dot.classList.add("cursor-visible");
                ringX = mouseX;
                ringY = mouseY;
                ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            }

            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            if (!animationFrame) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        const handleHover = (event: PointerEvent) => {
            const target = event.target;

            const interactive =
                target instanceof Element &&
                !!target.closest(
                    "a, button, input, textarea, select, [role='button'], [data-cursor='hover']"
                );

            if (interactive !== isHovering) {
                isHovering = interactive;
                ring.classList.toggle("cursor-hover", interactive);
                dot.classList.toggle("cursor-hover", interactive);
            }
        };

        const handleLeave = () => {
            isVisible = false;
            ring.classList.remove("cursor-visible", "cursor-hover");
            dot.classList.remove("cursor-visible", "cursor-hover");
            isHovering = false;
        };

        const handleEnter = () => {
            isVisible = true;
            ring.classList.add("cursor-visible");
            dot.classList.add("cursor-visible");
        };

        window.addEventListener("pointermove", move, { passive: true });
        window.addEventListener("pointerout", (event) => {
            if (!event.relatedTarget) handleLeave();
        });
        window.addEventListener("pointerover", handleEnter);
        document.addEventListener("pointerover", handleHover);

        return () => {
            cancelAnimationFrame(animationFrame);

            window.removeEventListener("pointermove", move);
            document.removeEventListener("pointerover", handleHover);

            ring.classList.remove("cursor-visible", "cursor-hover");
            dot.classList.remove("cursor-visible", "cursor-hover");
        };
    }, []);

    return (
        <>
            <div
                ref={ringRef}
                aria-hidden="true"
                className="custom-cursor-ring"
            />

            <div
                ref={dotRef}
                aria-hidden="true"
                className="custom-cursor-dot"
            />
        </>
    );
}
