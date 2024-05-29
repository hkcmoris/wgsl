layout (location = 0) in vec3 position;
in vec2 uv;

uniform mat4 modelViewMatrix;                                                                                                                                                                                                  
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

out vec2 vUv;

//MY_VERTEX_SHADER
void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(sin(position), 1.0);
}