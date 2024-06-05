#include <packing>
precision highp sampler3D;

in vec2 vUV;

layout(location = 0) out vec4 diffuseColor;

float sphereSDF(vec3 p) {
    return length(p) - 1.0;
}

void main() {
    diffuseColor = sphereSDF(vec3(vUV, 0)) * vec4(1.0, 0.0, 0.0, 1.0);
}

// RAYMARCHING ALGORITHM FOR SDF (SPHEREMARCHING)
// float depth = start;
// for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
//     float dist = sceneSDF(eye + depth * viewRayDirection);
//     if (dist < EPSILON) {
//         // We're inside the scene surface!
//         return depth;
//     }
//     // Move along the view ray
//     depth += dist;

//     if (depth >= end) {
//         // Gone too far; give up
//         return end;
//     }
// }
// return end;