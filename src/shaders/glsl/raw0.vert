//#version 300 es
layout (location = 0) in vec3 position;
in vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat3 normalMatrix;
// uniform vec3 cameraPosition;
uniform float iTime;

out vec2 vUv;
out vec4 vID;

//MY_VERTEX_SHADER
void main(){
    vUv = uv;
    if (gl_VertexID == 0) vID = vec4(1.0, 0.0, 0.0, 0.0);
    else if (gl_VertexID == 1) vID = vec4(1.0, 1.0, 0.0, 0.0);
    else if (gl_VertexID == 2) vID = vec4(0.0, 1.0, 0.0, 0.0);
    else if (gl_VertexID == 3) vID = vec4(0.0, 1.0, 1.0, 0.0);
    else if (gl_VertexID == 4) vID = vec4(0.0, 0.0, 1.0, 0.0);
    else if (gl_VertexID == 5) vID = vec4(1.0, 0.0, 1.0, 0.0);
    else vID = vec4(0.0, 0.0, 0.0, 0.0);
    vec4 p = vec4(position, 1.0);
    p.y = sin(p.x + iTime * 1.618) * cos(p.z + iTime * 1.618) * 0.5 + 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * p;
}