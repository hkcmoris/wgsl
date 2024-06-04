layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;
in vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
// uniform vec3 cameraPosition;
uniform float iTime;
uniform sampler2D iChannel0;

out vec2 vUV;
out vec4 vNorm;

//MY_VERTEX_SHADER
void main(){
    vUV = uv;
    vec4 p = vec4(position, 1.0);
    
    // normals
    vec3 n = normal * normalMatrix;

    p.y = texture(iChannel0, vUV).r * 1.618 + sin(p.x + iTime * 1.618) * cos(p.z + iTime * 1.618) * 0.5 + 0.5;
    
    gl_Position = projectionMatrix * modelViewMatrix * p;
}