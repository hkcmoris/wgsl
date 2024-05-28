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

const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const container = document.createElement( 'div' );
document.body.appendChild( container );
const stats = new Stats();
container.appendChild( stats.dom );

const geometry = new THREE.PlaneGeometry( 64, 64, 8, 8 );
// This is the default material
const material = new THREE.MeshBasicMaterial( {color: 0xff00ff, side: THREE.FrontSide} );


//first a couple of place holders
const MY_VERTEX_SHADER = vs;
const MY_FRAGMENT_SHADER = fs;
//the wrapper
const myMeshBasicMaterial = new THREE.ShaderMaterial({
  vertexShader: MY_VERTEX_SHADER,
  fragmentShader: MY_FRAGMENT_SHADER,
})


const plane = new THREE.Mesh( geometry, myMeshBasicMaterial );
scene.add( plane );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function animate() {
	requestAnimationFrame( animate );

    const delta = clock.getDelta();

    // TODO: Add your code here
    stats.update();

    renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {
	// Initiate function or other initializations here
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}

animate();