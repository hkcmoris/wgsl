import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import WebGL from "three/addons/capabilities/WebGL.js";
import { SDFGeometryGenerator } from "three/addons/geometries/SDFGeometryGenerator.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

import vs from ".././shaders/raw1.vert";
import fs from ".././shaders/raw1.frag";
import hm from ".././textures/map.png";

import { DG_Plane } from ".";

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
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        this.composer = new EffectComposer(this.renderer);

        // Set up the axis helper
        if (this.useAxisHelper) {
            this.axisHelper = new THREE.AxesHelper(this.axisHelperSize);
            this.scene.add(this.axisHelper);
        }

        // Set up the clock
        this.clock = new THREE.Clock();

        // Set up the stats
        const container = document.createElement("div");
        document.body.appendChild(container);
        this.stats = new Stats();
        container.appendChild(this.stats.dom);

        // Set up the camera
        this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000);
        this.camera.position.set(0, 16, 20);
        this.camera.lookAt(0, 0, 0);

        // Set up the controls
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;

        //window.addEventListener("resize", this.onWindowResize(this));
    }

    #onWindowResize(app) {
        if (!(app instanceof App)) {
            console.error("The app parameter must be an instance of App");
            return;
        }

        // const ASPECT_RATIO = window.innerWidth / window.innerHeight;
        // const WIDTH = window.innerWidth * window.devicePixelRatio;
        // const HEIGHT = window.innerHeight * window.devicePixelRatio;

        // app.aspect = ASPECT_RATIO;
        // if (app.camera) {
        //     if (app.camera.isPerspectiveCamera) {
        //         app.camera.aspect = ASPECT_RATIO;
        //         app.camera.updateProjectionMatrix();
        //     } else if (app.camera.isOrthographicCamera) {
        //         app.camera.left = 0;
        //         app.camera.right = WIDTH;
        //         app.camera.top = 0;
        //         app.camera.bottom = HEIGHT;
        //         app.camera.updateProjectionMatrix();
        //     }
        // }

        this.resizeRendererToDisplaySize(app.renderer);
    }

    #resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    start() {
        if (WebGL.isWebGLAvailable()) {
            // Initiate function or other initializations here
            this.running = true;
            this.#loadDefaultScene();
            this.#animate();
        } else {
            this.running = false;
            const warning = WebGL.getWebGLErrorMessage();
            const warningContainer = document.createElement("div");
            document.body.appendChild(warningContainer);
            warningContainer.appendChild(warning);
        }
    }

    #animate() {
        if (this.running == false) return;

        requestAnimationFrame(this.#animate.bind(this));

        const delta = this.clock.getDelta();

        if (this.#resizeRendererToDisplaySize(this.renderer)) {
            const canvas = renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        // update the uniforms
        // this.uniforms.iTime.value = this.clock.elapsedTime;
        // this.uniforms.iTimeDelta.value = delta;

        this.stats.update();
        this.renderer.render(this.scene, this.camera);
    }

    #loadDefaultScene() {
        const generator = new SDFGeometryGenerator(this.renderer);
        const sdf = /*glsl*/ `float dist(vec3 p) {return length(p) - 0.5;}`;
        const geometry = generator.generate(Math.pow(2, 6), sdf, 1); // ~> THREE.BufferGeometry
        let meshFromSDF;

        if (meshFromSDF) {
            // updates mesh

            meshFromSDF.geometry.dispose();
            meshFromSDF.geometry = geometry;
        } else {
            // inits meshFromSDF : THREE.Mesh

            meshFromSDF = new THREE.Mesh(
                geometry,
                new THREE.MeshStandardMaterial()
            );
            this.scene.add(meshFromSDF);

            const scale =
                (Math.min(window.innerWidth, window.innerHeight) * 1.618) / 2;
            meshFromSDF.scale.set(scale, scale, scale);
            meshFromSDF.position.set(0, 0, 0);

            meshFromSDF.material.dispose();
            meshFromSDF.material = new THREE.MeshDepthMaterial({
                // depthPacking: THREE.RGBADepthPacking,
                // map: new THREE.TextureLoader().load( hm ),
                // displacementMap: new THREE.TextureLoader().load( hm ),
                // displacementScale: 0.1,
                // displacementBias: -0.1,
                // depthTest: true,
                // depthWrite: true,
                // side: THREE.DoubleSide,
                // transparent: false,
                // wireframe: false
            });
        }
    }
}

export default App;
