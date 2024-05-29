import './styles/main.css';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

import vs from './shaders/raw.vert';
import fs from './shaders/raw.frag';

import * as utils from './utils';

// Set up the camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

// Set up the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Set up the clock
const clock = new THREE.Clock();

// Set up the stats
const container = document.createElement('div');
document.body.appendChild(container);
const stats = new Stats();
container.appendChild(stats.dom);

// Set up the geometry
const geometry = utils.generatePlaneGeometry(
  new THREE.Vector3(0, 0, 0), // position
  10, // width
  10, // height
  1, // widthSegments
  1 // heightSegments
);

// This is the shader material
const uniforms = { 
    iTime: { value: 0.0 },
    iTimeDelta: { value: 0.0 },
    iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) }
} 

//first a couple of place holders
const MY_VERTEX_SHADER = vs;
const MY_FRAGMENT_SHADER = fs;
//the wrapper
const myMeshBasicMaterial = new THREE.RawShaderMaterial({
    uniforms: uniforms,
    vertexShader: MY_VERTEX_SHADER,
    fragmentShader: MY_FRAGMENT_SHADER,
    glslVersion: THREE.GLSL3
})


const plane = new THREE.Mesh(geometry, myMeshBasicMaterial);
scene.add(plane);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    uniforms.iTime.value += delta;
    uniforms.iTimeDelta.value = delta;

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