precision mediump float;

in vec2 vUV;
in vec4 vNorm;

layout(location = 0) out vec4 diffuseColor;

//uniform vec2 iResolution;
uniform vec2 uvScale;
uniform sampler2D iChannel0;

void main() {
    vec2 nUV = vUV * uvScale;

    // float texel = 1.0 / 1024.0;
    // float texelSize = u_size / u_resolution;

    // vec3 center = texture(iChannel0, nUV).rgb;
    // vec3 right = vec3(texelSize, 0.0, 0.0) + texture2D(u_displacementMap, vUV + vec2(texel, 0.0)).rgb - center;
    // vec3 left = vec3(-texelSize, 0.0, 0.0) + texture2D(u_displacementMap, vUV + vec2(-texel, 0.0)).rgb - center;
    // vec3 top = vec3(0.0, 0.0, -texelSize) + texture2D(u_displacementMap, vUV + vec2(0.0, -texel)).rgb - center;
    // vec3 bottom = vec3(0.0, 0.0, texelSize) + texture2D(u_displacementMap, vUV + vec2(0.0, texel)).rgb - center;
    
    // vec3 topRight = cross(right, top);
    // vec3 topLeft = cross(top, left);
    // vec3 bottomLeft = cross(left, bottom);
    // vec3 bottomRight = cross(bottom, right);

    // gl_FragColor = vec4(normalize(topRight + topLeft + bottomLeft + bottomRight), 1.0);

    // if (nUV.x < 0. || nUV.x > 1.) nUV.x = mod(nUV.x, 1.0);
    // if (nUV.y < 0. || nUV.y > 1.) nUV.y = mod(nUV.y, 1.0);
    //diffuseColor = texture(iChannel0, nUV);
    if (texture(iChannel0, nUV).r < 0.125) //discard;
        diffuseColor = vec4(0., 0.5, 1., 1.);
    else
        diffuseColor = vec4(nUV, 0., 1.) * texture(iChannel0, nUV);
}