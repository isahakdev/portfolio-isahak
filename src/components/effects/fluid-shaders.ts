export const fluidVertexShader = `#version 300 es
precision highp float;

in vec2 position;
out vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fluidSimulationShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uTime;
uniform float uSplat;
uniform float uHasHistory;

void main() {
  float aspect = uResolution.x / uResolution.y;

  vec2 drift = vec2(
    sin(vUv.y * 12.0 + uTime * 0.35),
    cos(vUv.x * 10.0 - uTime * 0.28)
  ) * 0.0012;

  vec2 backUV = vUv - uVelocity * 0.18 - drift;
  backUV = clamp(backUV, 0.001, 0.999);

  vec4 previous = vec4(0.0);

  if (uHasHistory > 0.5) {
    previous = texture(uTexture, backUV);
  }

  vec3 pigment = previous.rgb * 0.992;
  float alpha = previous.a * 0.993;

  vec2 direction = normalize(
    uVelocity * vec2(aspect, 1.0) + vec2(0.00001)
  );

  vec2 normal = vec2(-direction.y, direction.x);
  vec2 point = (vUv - uMouse) * vec2(aspect, 1.0);

  float along = dot(point, direction);
  float across = dot(point, normal);

  float speed = length(uVelocity);

  float radius = 0.012 + min(speed * 0.18, 0.035);
  float lengthTrail = radius * 1.8 + min(speed * 0.8, 0.09);

  float distanceField = sqrt(
    (along * along) / (lengthTrail * lengthTrail) +
    (across * across) / (radius * radius)
  );

  float ink = exp(-distanceField * distanceField * 3.0);
  ink *= uSplat;

  float glow = exp(-distanceField * 1.6) * uSplat;

  pigment += uColor * ink * 0.48;
  pigment += uColor * glow * 0.035;

  alpha = max(alpha, ink * 0.75);

  pigment = clamp(pigment, 0.0, 1.0);
  alpha = clamp(alpha, 0.0, 0.85);

  fragColor = vec4(pigment, alpha);
}
`;

export const fluidDisplayShader = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uTexture;
uniform vec2 uResolution;

void main() {
  vec2 texel = 1.0 / uResolution;

  vec4 center = texture(uTexture, vUv);

  vec3 blur = vec3(0.0);

  blur += texture(uTexture, vUv + vec2(texel.x, 0.0)).rgb;
  blur += texture(uTexture, vUv - vec2(texel.x, 0.0)).rgb;
  blur += texture(uTexture, vUv + vec2(0.0, texel.y)).rgb;
  blur += texture(uTexture, vUv - vec2(0.0, texel.y)).rgb;

  blur *= 0.25;

  vec3 color = center.rgb * 0.76 + blur * 0.24;

  float alpha = clamp(
    max(max(color.r, color.g), color.b) * 0.92,
    0.0,
    0.78
  );

  color = mix(color, vec3(1.0), 0.08 * alpha);

  fragColor = vec4(color, alpha);
}
`;