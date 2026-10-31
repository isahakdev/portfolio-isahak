
"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `#version 300 es
precision highp float;

out vec2 vUv;

void main() {
  vec2 position = vec2(
    float((gl_VertexID << 1) & 2),
    float(gl_VertexID & 2)
  );

  vUv = position * 0.5;
  gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}
`;

const simulationFragmentSource = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform vec2 uResolution;
uniform float uTime;
uniform float uActive;

vec3 palette(float t) {
  vec3 cyan = vec3(0.42, 0.94, 0.91);
  vec3 pink = vec3(1.00, 0.48, 0.78);
  vec3 mint = vec3(0.56, 0.94, 0.72);
  vec3 lavender = vec3(0.70, 0.61, 1.00);
  vec3 yellow = vec3(1.00, 0.91, 0.55);

  float p = mod(t, 5.0);

  if (p < 1.0) return mix(cyan, pink, p);
  if (p < 2.0) return mix(pink, mint, p - 1.0);
  if (p < 3.0) return mix(mint, lavender, p - 2.0);
  if (p < 4.0) return mix(lavender, yellow, p - 3.0);

  return mix(yellow, cyan, p - 4.0);
}

void main() {
  vec2 uv = vUv;

  vec2 aspect = vec2(
    uResolution.x / max(uResolution.y, 1.0),
    1.0
  );

  vec2 difference = (uv - uMouse) * aspect;
  float distanceToMouse = length(difference);

  float influence = exp(-distanceToMouse * 15.0) * uActive;

  vec2 direction = uVelocity;
  float speed = length(direction);

  vec2 swirl = vec2(-difference.y, difference.x);
  vec2 flow = direction * 0.012 + swirl * 0.0018;

  vec2 backtrace = uv - flow * influence;

  vec4 previous = texture(uTexture, backtrace);

  previous.rgb *= 0.993;
  previous.a *= 0.992;

  float ink = exp(-distanceToMouse * 27.0) * uActive;
  float softInk = exp(-distanceToMouse * 12.0) * uActive;

  vec3 color = palette(uTime * 0.32 + speed * 0.15);

  float colorVariation = sin(
    distanceToMouse * 42.0 - uTime * 1.8
  ) * 0.5 + 0.5;

  color = mix(
    color,
    palette(uTime * 0.32 + 2.2),
    colorVariation * 0.28
  );

  float injection = ink * (0.16 + min(speed * 0.035, 0.22));

  previous.rgb += color * injection;
  previous.rgb += color * softInk * 0.018;
  previous.a = max(previous.a, ink * 0.75);

  outColor = vec4(clamp(previous.rgb, 0.0, 1.0), previous.a);
}
`;

const displayFragmentSource = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uTexture;

void main() {
  vec4 fluid = texture(uTexture, vUv);

  float alpha = clamp(fluid.a, 0.0, 0.75);
  vec3 color = fluid.rgb;

  outColor = vec4(color, alpha);
}
`;

function createShader(
    gl: WebGL2RenderingContext,
    type: number,
    source: string
): WebGLShader {
    const shader = gl.createShader(type);

    if (!shader) {
        throw new Error("Could not create WebGL shader.");
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(message || "Shader compilation failed.");
    }

    return shader;
}

function createProgram(
    gl: WebGL2RenderingContext,
    vertexSource: string,
    fragmentSource: string
): WebGLProgram {
    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    const program = gl.createProgram();

    if (!program) {
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        throw new Error("Could not create WebGL program.");
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    gl.deleteShader(vertex);
    gl.deleteShader(fragment);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const message = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(message || "WebGL program linking failed.");
    }

    return program;
}

type RenderTarget = {
    texture: WebGLTexture;
    framebuffer: WebGLFramebuffer;
};

function createRenderTarget(
    gl: WebGL2RenderingContext,
    width: number,
    height: number
): RenderTarget | null {
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();

    if (!texture || !framebuffer) {
        if (texture) gl.deleteTexture(texture);
        if (framebuffer) gl.deleteFramebuffer(framebuffer);
        return null;
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA8,
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
    );

    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
    );

    const complete =
        gl.checkFramebufferStatus(gl.FRAMEBUFFER) ===
        gl.FRAMEBUFFER_COMPLETE;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    if (!complete) {
        gl.deleteTexture(texture);
        gl.deleteFramebuffer(framebuffer);
        return null;
    }

    return { texture, framebuffer };
}

export default function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvasElement = canvasRef.current;

        if (!canvasElement) return;

        // Explicit non-null canvas reference for TypeScript
        const canvas: HTMLCanvasElement = canvasElement;

        const motionPreference = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        const touchDevice = window.matchMedia("(pointer: coarse)");

        if (motionPreference.matches || touchDevice.matches) {
            return;
        }

        const glContext = canvas.getContext("webgl2", {
            alpha: true,
            antialias: false,
            depth: false,
            stencil: false,
            powerPreference: "low-power",
            premultipliedAlpha: false,
        });

        if (!glContext) {
            console.warn("WebGL2 is not available in this browser.");
            return;
        }

        // Explicit non-null WebGL reference for TypeScript closures
        const gl: WebGL2RenderingContext = glContext;

        let simulationProgram: WebGLProgram;
        let displayProgram: WebGLProgram;
        let vao: WebGLVertexArrayObject;

        let targets: [RenderTarget, RenderTarget] | null = null;
        let readIndex = 0;

        let width = 1;
        let height = 1;

        let animationFrame = 0;
        let lastTime = 0;
        let elapsed = 0;

        let mouseX = -10;
        let mouseY = -10;

        let previousMouseX = -10;
        let previousMouseY = -10;

        let velocityX = 0;
        let velocityY = 0;
        let active = 0;

        try {
            simulationProgram = createProgram(
                gl,
                vertexShaderSource,
                simulationFragmentSource
            );

            displayProgram = createProgram(
                gl,
                vertexShaderSource,
                displayFragmentSource
            );

            const createdVao = gl.createVertexArray();

            if (!createdVao) {
                throw new Error("Could not create WebGL vertex array.");
            }

            vao = createdVao;
            gl.bindVertexArray(vao);

            const simTexture = gl.getUniformLocation(
                simulationProgram,
                "uTexture"
            );

            const simMouse = gl.getUniformLocation(
                simulationProgram,
                "uMouse"
            );

            const simVelocity = gl.getUniformLocation(
                simulationProgram,
                "uVelocity"
            );

            const simResolution = gl.getUniformLocation(
                simulationProgram,
                "uResolution"
            );

            const simTime = gl.getUniformLocation(
                simulationProgram,
                "uTime"
            );

            const simActive = gl.getUniformLocation(
                simulationProgram,
                "uActive"
            );

            const displayTexture = gl.getUniformLocation(
                displayProgram,
                "uTexture"
            );

            function resize() {
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

                width = Math.max(1, Math.floor(window.innerWidth * dpr));
                height = Math.max(1, Math.floor(window.innerHeight * dpr));

                canvas.width = width;
                canvas.height = height;

                gl.viewport(0, 0, width, height);

                if (targets) {
                    for (const target of targets) {
                        gl.deleteTexture(target.texture);
                        gl.deleteFramebuffer(target.framebuffer);
                    }
                }

                const first = createRenderTarget(gl, width, height);
                const second = createRenderTarget(gl, width, height);

                if (!first || !second) {
                    if (first) {
                        gl.deleteTexture(first.texture);
                        gl.deleteFramebuffer(first.framebuffer);
                    }

                    if (second) {
                        gl.deleteTexture(second.texture);
                        gl.deleteFramebuffer(second.framebuffer);
                    }

                    targets = null;
                    return;
                }

                targets = [first, second];
                readIndex = 0;

                for (const target of targets) {
                    gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
                    gl.clearColor(0, 0, 0, 0);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                }

                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }

            function handlePointerMove(event: PointerEvent) {
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

                const nextX = (event.clientX * dpr) / width;
                const nextY = 1 - (event.clientY * dpr) / height;

                if (mouseX < 0 || mouseY < 0) {
                    previousMouseX = nextX;
                    previousMouseY = nextY;
                } else {
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }

                mouseX = nextX;
                mouseY = nextY;

                velocityX = (mouseX - previousMouseX) * 60;
                velocityY = (mouseY - previousMouseY) * 60;

                active = 1;
            }

            function render(time: number) {
                if (!targets) return;

                const delta = lastTime
                    ? Math.min((time - lastTime) / 1000, 0.033)
                    : 0.016;

                lastTime = time;
                elapsed += delta;

                velocityX *= 0.94;
                velocityY *= 0.94;
                active *= 0.992;

                const writeIndex = 1 - readIndex;

                const readTarget = targets[readIndex];
                const writeTarget = targets[writeIndex];

                gl.bindVertexArray(vao);

                // Simulation pass
                gl.useProgram(simulationProgram);

                gl.bindFramebuffer(
                    gl.FRAMEBUFFER,
                    writeTarget.framebuffer
                );

                gl.viewport(0, 0, width, height);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, readTarget.texture);

                gl.uniform1i(simTexture, 0);
                gl.uniform2f(simMouse, mouseX, mouseY);
                gl.uniform2f(simVelocity, velocityX, velocityY);
                gl.uniform2f(simResolution, width, height);
                gl.uniform1f(simTime, elapsed);
                gl.uniform1f(simActive, active);

                gl.drawArrays(gl.TRIANGLES, 0, 3);

                readIndex = writeIndex;

                // Display pass
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.viewport(0, 0, width, height);

                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                gl.useProgram(displayProgram);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(
                    gl.TEXTURE_2D,
                    targets[readIndex].texture
                );

                gl.uniform1i(displayTexture, 0);

                gl.drawArrays(gl.TRIANGLES, 0, 3);

                animationFrame = requestAnimationFrame(render);
            }

            resize();

            window.addEventListener("resize", resize);

            window.addEventListener(
                "pointermove",
                handlePointerMove,
                { passive: true }
            );

            if (targets) {
                animationFrame = requestAnimationFrame(render);
            }

            return () => {
                cancelAnimationFrame(animationFrame);

                window.removeEventListener("resize", resize);
                window.removeEventListener(
                    "pointermove",
                    handlePointerMove
                );

                if (targets) {
                    for (const target of targets) {
                        gl.deleteTexture(target.texture);
                        gl.deleteFramebuffer(target.framebuffer);
                    }
                }

                gl.deleteProgram(simulationProgram);
                gl.deleteProgram(displayProgram);
                gl.deleteVertexArray(vao);
            };
        } catch (error) {
            console.error(
                "Fluid background initialization failed:",
                error
            );

            return;
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fluid-background"
        />
    );
}
