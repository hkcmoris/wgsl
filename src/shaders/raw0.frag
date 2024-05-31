//#version 300 es
precision highp float;

in vec2 vUv;
in vec4 vID;

layout(location = 0) out vec4 fragColor;

uniform vec2 iResolution;

void main() {
    // vec2 p = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.y, iResolution.x);
    
    // if near edge of uv, draw black
    // float edge = 0.01;
    // if (vUv.x < edge || vUv.x > 1.0 - edge || vUv.y < edge || vUv.y > 1.0 - edge) {
    //     fragColor = vec4(1.0, 1.0, 1.0, 1.0);
    //     return;
    // }
    // float edge = 0.01;
    // if (vUv.x <= edge || vUv.x >= 1.0 - edge || vUv.y <= edge || vUv.y >= 1.0 - edge || (vUv.x <= vUv.y + edge && vUv.x >= vUv.y - edge) || (vUv.x <= 1.0 - vUv.y + edge && vUv.x >= 1.0 - vUv.y - edge)) {
    //     fragColor = vec4(1.0, 0.0, 1.0, 1.0);
    //     return;
    // }

    fragColor = vec4(0.5f, 0.0f, 0.5f, 1.0f);;
    // vec2 clampedUV = vec2(vUv.x - floor(vUv.x), vUv.y - floor(vUv.y));
    // fragColor = vec4(clampedUV, 0.0, 1.0);
}