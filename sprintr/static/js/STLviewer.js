
import * as THREE from './threejs/three.module.js';
import { STLLoader } from './threejs/STLLoader.js';
import { OrbitControls } from './threejs/OrbitControls.js';


var container, camera, scene, renderer, controls;

function init() {

    console.log("Initializing STL viewer...")
    container = document.getElementById('container');

    // create camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 3);

    // create scene
    scene = new THREE.Scene();
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // create controls
    // controls = new THREE.OrbitControls(camera, container);
    controls = new OrbitControls(camera, container);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;

    // create STL loader
    // var loader = new THREE.STLLoader();
    var loader = new STLLoader();
    var model = "{{url_for('static', filename='/3dmodels/Just_arrow.stl') }}";
    loader.load(model, function(geometry) {
        var material = new THREE.MeshPhongMaterial({
            color: 0xAAAAAA,
            specular: 0x111111,
            shininess: 200
        });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    });

    // create renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();