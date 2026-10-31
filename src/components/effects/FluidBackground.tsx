
"use client";

import { useEffect, useRef } from "react";

const vertexShader = `#version 300 es
precision highp float;

out vec2 vUv;

void main() {
    vec2 position = vec2(
        float((gl_VertexID << 1) & 2),
        float(gl_VertexID & 2)
    );

    vUv = position * 0.5;
    gl_Position = vec4(position - 1.0, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;

in vec2 vUv;

out vec4 outColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(
        mix(a, b, f.x),
        mix(c, d, f.x),
        f.y
    );
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(
        u_resolution.x / max(u_resolution.y, 1.0),
        1.0
    );

    vec2 p = (uv - 0.5) * aspect;

    float time = u_time * 0.12;

    vec2 movement = vec2(
        sin(time * 1.2),
        cos(time * 0.8)
    ) * 0.15;

    vec2 fluid = p * 2.5 + movement;

    float n1 = fbm(fluid + time);
    float n2 = fbm(fluid * 1.4 - time * 0.7);

    float pattern = fbm(
        fluid + vec2(n1, n2) * 1.5
    );

    float wave = sin(
        pattern * 8.0 + time * 2.0
    );

    vec3 dark = vec3(0.015, 0.025, 0.020);
    vec3 lime = vec3(0.55, 1.0, 0.12);
    vec3 cyan = vec3(0.05, 0.75, 0.65);
    vec3 purple = vec3(0.48, 0.22, 0.75);

    vec3 color = mix(
        dark,
        lime,
        smoothstep(0.35, 0.85, pattern)
    );

    color = mix(
        color,
        cyan,
        smoothstep(0.55, 0.95, n1) * 0.45
    );

    color = mix(
        color,
        purple,
        smoothstep(0.65, 1.0, n2) * 0.25
    );

    float mouseDistance = distance(
        p,
        (u_mouse - 0.5) * aspect
    );

    float mouseGlow = exp(-mouseDistance * 3.0) * 0.25;

    color += lime * mouseGlow;

    float glow = smoothstep(
        0.15,
        0.85,
        wave * 0.5 + 0.5
    );

    color *= 0.65 + glow * 0.45;

    float vignette = 1.0 - smoothstep(
        0.35,
        1.15,
        length(p)
    );

    color *= vignette;

    outColor = vec4(color, 1.0);
}
`;

function createShader(
    gl: WebGL2RenderingContext,
    type: number,
    source: string
): WebGLShader | null {
    const shader = gl.createShader(type);

    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
            "Shader compilation error:",
            gl.getShaderInfoLog(shader)
        );

        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createProgram(
    gl: WebGL2RenderingContext
): WebGLProgram | null {
    const vertex = createShader(
        gl,
        gl.VERTEX_SHADER,
        vertexShader
    );

    const fragment = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShader
    );

    if (!vertex || !fragment) {
        if (vertex) gl.deleteShader(vertex);
        if (fragment) gl.deleteShader(fragment);
        return null;
    }

    const program = gl.createProgram();

    if (!program) {
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        return null;
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    gl.deleteShader(vertex);
    gl.deleteShader(fragment);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(
            "Program linking error:",
            gl.getProgramInfoLog(program)
        );

        gl.deleteProgram(program);
        return null;
    }

    return program;
}

export default function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const isTouchDevice = window.matchMedia(
            "(pointer: coarse)"
        ).matches;

        if (reducedMotion || isTouchDevice) return;

        const gl = canvas.getContext("webgl2", {
            alpha: true,
            antialias: false,
            powerPreference: "low-power",
        });

        if (!gl) {
            console.warn("WebGL2 is not supported.");
            return;
        }

        const program = createProgram(gl);

        if (!program) return;

        const vao = gl.createVertexArray();

        if (!vao) {
            gl.deleteProgram(program);
            return;
        }

        gl.bindVertexArray(vao);
        gl.useProgram(program);

        const resolutionLocation = gl.getUniformLocation(
            program,
            "u_resolution"
        );

        const mouseLocation = gl.getUniformLocation(
            program,
            "u_mouse"
        );

        const timeLocation = gl.getUniformLocation(
            program,
            "u_time"
        );

        let animationFrame = 0;
        let startTime = 0;

        let mouseX = 0.5;
        let mouseY = 0.5;

        let targetMouseX = 0.5;
        let targetMouseY = 0.5;

        let isVisible = true;
        let isDisposed = false;

        const resize = () => {
            const dpr = Math.min(
                window.devicePixelRatio || 1,
                1.5
            );

            const width = Math.max(
                1,
                Math.floor(canvas.clientWidth * dpr)
            );

            const height = Math.max(
                1,
                Math.floor(canvas.clientHeight * dpr)
            );

            if (
                canvas.width !== width ||
                canvas.height !== height
            ) {
                canvas.width = width;
                canvas.height = height;
            }

            gl.viewport(0, 0, width, height);

            if (resolutionLocation) {
                gl.uniform2f(
                    resolutionLocation,
                    width,
                    height
                );
            }
        };

        const handlePointerMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();

            targetMouseX =
                (event.clientX - rect.left) /
                Math.max(rect.width, 1);

            targetMouseY =
                1 -
                (event.clientY - rect.top) /
                Math.max(rect.height, 1);
        };

        const render = (timestamp: number) => {
            if (isDisposed || !isVisible) return;

            if (!startTime) startTime = timestamp;

            const elapsed = (timestamp - startTime) / 1000;

            mouseX += (targetMouseX - mouseX) * 0.06;
            mouseY += (targetMouseY - mouseY) * 0.06;

            gl.useProgram(program);
            gl.bindVertexArray(vao);

            if (timeLocation) {
                gl.uniform1f(timeLocation, elapsed);
            }

            if (mouseLocation) {
                gl.uniform2f(
                    mouseLocation,
                    mouseX,
                    mouseY
                );
            }

            gl.drawArrays(gl.TRIANGLES, 0, 3);

            animationFrame = requestAnimationFrame(render);
        };

        const handleVisibilityChange = () => {
            isVisible = !document.hidden;

            if (isVisible && !isDisposed) {
                cancelAnimationFrame(animationFrame);
                animationFrame = requestAnimationFrame(render);
            } else {
                cancelAnimationFrame(animationFrame);
            }
        };

        resize();

        window.addEventListener("resize", resize);
        canvas.addEventListener("pointermove", handlePointerMove);
        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        animationFrame = requestAnimationFrame(render);

        return () => {
            isDisposed = true;

            cancelAnimationFrame(animationFrame);

            window.removeEventListener("resize", resize);

            canvas.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );

            gl.bindVertexArray(null);
            gl.deleteVertexArray(vao);
            gl.deleteProgram(program);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fluid-background"
        />
    );
}
