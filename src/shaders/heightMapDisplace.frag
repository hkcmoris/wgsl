precision mediump float;

in vec2 vUV;
in vec4 vNorm;

layout(location = 0) out vec4 diffuseColor;

//uniform vec2 iResolution;
uniform vec2 uvScale;
uniform sampler2D iChannel0;

void main() {
    vec2 nUV = vUV * uvScale;

    if (texture(iChannel0, nUV).r < 0.125) //discard;
        diffuseColor = vec4(0., 0.5, 1., 1.);
    else
        diffuseColor = vec4(nUV, 0., 1.) * texture(iChannel0, nUV);
}