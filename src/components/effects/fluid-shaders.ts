
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
  float aspect = uResolution.x / max(uResolution.y, 1.0);

  // Subtle organic fluid movement
  vec2 drift = vec2(
    sin(vUv.y * 11.0 + uTime * 0.32),
    cos(vUv.x * 9.0 - uTime * 0.25)
  ) * 0.0008;

  // Reproject previous fluid position
  vec2 backUV = vUv - uVelocity * 0.16 - drift;
  backUV = clamp(backUV, vec2(0.001), vec2(0.999));

  vec4 previous = vec4(0.0);

  if (uHasHistory > 0.5) {
    previous = texture(uTexture, backUV);
  }

  // Natural pigment fading
  vec3 pigment = previous.rgb * 0.991;
  float alpha = previous.a * 0.992;

  // Mouse velocity
  float speed = length(uVelocity);

  vec2 safeVelocity = uVelocity * vec2(aspect, 1.0);
  vec2 direction = safeVelocity / max(length(safeVelocity), 0.00001);

  vec2 normal = vec2(-direction.y, direction.x);

  // Mouse-relative coordinates
  vec2 point = (vUv - uMouse) * vec2(aspect, 1.0);

  float along = dot(point, direction);
  float across = dot(point, normal);

  // Dynamic fluid shape
  float radius = 0.010 + min(speed * 0.16, 0.028);
  float trailLength = radius * 1.7 + min(speed * 0.75, 0.085);

  float distanceField = sqrt(
    (along * along) / (trailLength * trailLength) +
    (across * across) / (radius * radius)
  );

  // Soft ink body
  float ink = exp(-distanceField * distanceField * 2.8);

  // Softer outer glow
  float glow = exp(-distanceField * 1.7);

  float splatStrength = clamp(uSplat, 0.0, 1.5);

  ink *= splatStrength;
  glow *= splatStrength;

  // Add smooth pigment
  pigment += uColor * ink * 0.46;
  pigment += uColor * glow * 0.045;

  // Preserve fluid transparency
  alpha = max(alpha, ink * 0.72);

  pigment = clamp(pigment, 0.0, 1.0);
  alpha = clamp(alpha, 0.0, 0.82);

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
  vec2 texel = 1.0 / max(uResolution, vec2(1.0));

  // Sample fluid texture
  vec4 center = texture(uTexture, vUv);

  vec3 blur = vec3(0.0);

  blur += texture(
    uTexture,
    vUv + vec2(texel.x, 0.0)
  ).rgb;

  blur += texture(
    uTexture,
    vUv - vec2(texel.x, 0.0)
  ).rgb;

  blur += texture(
    uTexture,
    vUv + vec2(0.0, texel.y)
  ).rgb;

  blur += texture(
    uTexture,
    vUv - vec2(0.0, texel.y)
  ).rgb;

  blur *= 0.25;

  // Soft fluid blending
  vec3 color = center.rgb * 0.78 + blur * 0.22;

  // Gentle highlight
  float brightness = max(
    max(color.r, color.g),
    color.b
  );

  float alpha = clamp(
    max(center.a, brightness * 0.88),
    0.0,
    0.78
  );

  color = mix(
    color,
    vec3(1.0),
    0.06 * alpha
  );

  fragColor = vec4(color, alpha);
}
`;
