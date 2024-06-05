layout (location = 0) in vec3 position;
//layout (location = 1) in vec3 normal;
in vec2 uv;

out vec2 vUv;
out vec3 vPosition;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
//uniform mat3 normalMatrix;
// uniform vec3 cameraPosition;
//uniform float iTime;
//uniform sampler2D iChannel0;

void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0f);
    gl_Position = projectionMatrix * modelViewPosition;
			// gl_Position = vec4(position, 1);

    vUv = uv;
    vPosition = position;
}