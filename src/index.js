import './styles/main.css';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import vs from './shaders/raw1.vert';
import fs from './shaders/raw1.frag';
import hm from './textures/map.png';

import * as utils from './utils';


// Set up the camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 16, 20);
camera.lookAt(0, 0, 0);

// Set up the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Set up the axis helper
var axisHelper = new THREE.AxesHelper(50);
scene.add(axisHelper);

// Set up the clock
const clock = new THREE.Clock();

// Set up the stats
const container = document.createElement('div');
document.body.appendChild(container);
const stats = new Stats();
container.appendChild(stats.dom);

// Set up the geometry
const scale = new THREE.Vector2(16, 16);
const dgPlane = new utils.DG_Plane(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(scale.x / 2, 0, scale.y / 2),
    scale,
    new THREE.Vector2(1024, 1024)
);
const geometry = dgPlane.geometry;
geometry.dynamic = true;

// This is the uniforms
const uniforms = { 
    iTime: { value: 0.0 },
    iTimeDelta: { value: 0.0 },
    iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
    uvScale: { value: new THREE.Vector2(1, 1) },
    iChannel0: { type: 't', value: new THREE.TextureLoader().load(hm) }
} 

// This is the shader material
const myMeshBasicMaterial = new THREE.RawShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    glslVersion: THREE.GLSL3
})

const plane = new THREE.Mesh(geometry, myMeshBasicMaterial);
scene.add(plane);
//scene.add(wireframe);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    uniforms.iTime.value += delta;
    uniforms.iTimeDelta.value = delta;

    // TODO: Add your code here
    stats.update();
    //plane.position.x += 0.01;

    plane.rotation.y += 0.005;

    renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}