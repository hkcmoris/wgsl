// in vec2 aPosition;
// in vec3 aColor;

// out vec3 vColor;
// uniform mat3 uProjectionMatrix;
// uniform mat3 uWorldTransformMatrix;

// uniform mat3 uTransformMatrix;

// void main() {

//     mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
//     gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);

//     vColor = aColor;
// }

uniform float elapsedTime; // we declare the uniform
varying vec2 vUv;

//MY_VERTEX_SHADER
void main(){
    vec4 _position = vec4(position, 1.0);
    // _position.x += position.x * sin(4.0 * cos(position.y) * elapsedTime) / 10.0;
    // _position.y += position.y * sin(4.0 * cos(position.x) * elapsedTime) / 10.0;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * _position;
}