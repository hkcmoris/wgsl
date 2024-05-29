import './styles/main.css';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

import vs from './shaders/myShader.vert';
import fs from './shaders/myShader.frag';

let fov = 45;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const container = document.createElement('div');
document.body.appendChild(container);
const stats = new Stats();
container.appendChild(stats.dom);

function generatePlaneGeometry(position, width, height, widthSegments, heightSegments) {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array((widthSegments + 1) * (heightSegments + 1) * 3);
    const indices = [];
    const uv0 = new Float32Array((widthSegments + 1) * (heightSegments + 1) * 2);

    function getQuadVertices(i, w, h) {
        let b = Math.floor(i / w) + i;
        return [
            b,
            b + 1,
            b + w + 2,
            b,
            b + w + 2,
            b + w + 1
        ]
    }

    for (let y = 0; y <= heightSegments; y++) {
        for (let x = 0; x <= widthSegments; x++) {
            const index = (x + y * (widthSegments + 1));

            vertices[index * 3] = position.x - (width / 2) + (width / widthSegments) * x;
            vertices[index * 3 + 1] = position.y - (height / 2) + (height / heightSegments) * y;
            vertices[index * 3 + 2] = position.z;

            //console.log(`v(${index},${widthSegments},${heightSegments}) = [${vertices[index * 3]},${vertices[index * 3 + 1]},${vertices[index * 3 + 2]}]`);
        }
    }

    for (let y = 0; y <= heightSegments; y++) {
        for (let x = 0; x <= widthSegments; x++) {
            const u = x / widthSegments; // 0-1
            const v = y / heightSegments; // 0-1
            const index = (x + y * (widthSegments + 1));

            uv0[index * 2] = u;
            uv0[index * 2 + 1] = v;

            indices.push(...getQuadVertices(index, widthSegments, heightSegments));

            //console.log(`f(${index},${widthSegments},${heightSegments}) = [${getQuadVertices(index, widthSegments, heightSegments).join(',')}]`);
        }
    }

    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3, false));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uv0, 2, false));
    
    return geometry;
}

const geometry = generatePlaneGeometry(new THREE.Vector3(0, 0, 0), 10, 10, 1, 1);

// This is the shader material
const uniforms = { 
    elapsedTime: { value: 0.0 },
    uColor: { value: new THREE.Color(1,0,1) },
    iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) }
} 

//first a couple of place holders
const MY_VERTEX_SHADER = vs;
const MY_FRAGMENT_SHADER = fs;
//the wrapper
const myMeshBasicMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: MY_VERTEX_SHADER,
    fragmentShader: MY_FRAGMENT_SHADER,
})


const plane = new THREE.Mesh(geometry, myMeshBasicMaterial);
scene.add(plane);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    uniforms.elapsedTime.value += delta;

    // TODO: Add your code here
    stats.update();

    renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

animate();