import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import vs from '.././shaders/raw1.vert';
import fs from '.././shaders/raw1.frag';
import hm from '.././textures/map.png';

import { DG_Plane } from '.';

class App {
    
    constructor(antialias = true, axisHelper = false) {
        this.bg_color = 0x110022;
        this.antialias = antialias;
        this.useAxisHelper = axisHelper;
        this.axisHelperSize = 10;
        this.aspect = window.innerWidth / window.innerHeight;
        this.running = false;
        this.init();
    }

    init() {
        // Set up the scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.bg_color);

        // Set up the renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: this.antialias });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Set up the axis helper
        if (this.useAxisHelper) {
            this.axisHelper = new THREE.AxesHelper(this.axisHelperSize);
            this.scene.add(this.axisHelper);
        };
        
        // Set up the clock
        this.clock = new THREE.Clock();

        // Set up the stats
        const container = document.createElement('div');
        document.body.appendChild(container);
        this.stats = new Stats();
        container.appendChild(this.stats.dom);

        // Set up the camera
        this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000);
        this.camera.position.set(0, 16, 20);
        this.camera.lookAt(0, 0, 0);

        // Set up the controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };

    start() {
        if (WebGL.isWebGLAvailable()) {
            // Initiate function or other initializations here
            this.running = true;
            this.#loadDefaultScene();
            this.#animate();
        } else {
            this.running = false;
            const warning = WebGL.getWebGLErrorMessage();
            const warningContainer = document.createElement('div');
            document.body.appendChild(warningContainer);
            warningContainer.appendChild(warning);
        }
    }

    #animate() {        
        if (this.running == false) return;

        requestAnimationFrame(this.#animate.bind(this));

        const delta = this.clock.getDelta();
        
        // update the uniforms
        this.uniforms.iTime.value += delta;
        this.uniforms.iTimeDelta.value = delta;

        this.stats.update();
        this.renderer.render(this.scene, this.camera);
    }

    #loadDefaultScene() {
        // Set up the geometry
        const scale = new THREE.Vector2(16, 16);
        const dgPlane = new DG_Plane(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(scale.x / 2, 0, scale.y / 2),
            scale,
            new THREE.Vector2(1024, 1024)
        );
        const geometry = dgPlane.geometry;
        geometry.dynamic = true;

        // This is the uniforms
        this.uniforms = { 
            iTime: { value: 0.0 },
            iTimeDelta: { value: 0.0 },
            iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
            uvScale: { value: new THREE.Vector2(1, 1) },
            iChannel0: { type: 't', value: new THREE.TextureLoader().load(hm) }
        } 

        // This is the shader material
        const myMeshBasicMaterial = new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vs,
            fragmentShader: fs,
            glslVersion: THREE.GLSL3
        })

        const plane = new THREE.Mesh(geometry, myMeshBasicMaterial);
        this.scene.add(plane);
    }
}

export default App;