// Option 1: Import the entire three.js core library.
import * as THREE from './threejs/three.module.js';
import { STLLoader } from './threejs/STLLoader.js';
import { OrbitControls } from './threejs/OrbitControls.js';



function init() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd9dedb);
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const light = new THREE.SpotLight()
    light.position.set(20, 20, 20)
    scene.add(light)


    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    let object = new THREE.Object3D;

    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    camera.position.z = 5;
    camera.position.y = 0.8;

    function animate() {
        requestAnimationFrame( animate );

        // object.rotation.x += 0.01;
        // object.rotation.z += 0.01;

        renderer.render( scene, camera );
    };

    let loader = new STLLoader();

    // let file = "{{url_for('static', filename='/3dmodels/Just_arrow.stl') }}";
    // let file = '/././static/3dmodels/Just_Arrow.stl';
    window.stl = stl;

    let file = "/././static/3dmodels/" + stl + ".stl";

    console.log("File = " + file);

    // '././static/3dmodels/Just-Arrow.stl'
    loader.load(file, (model)=>{
        object = new THREE.Mesh(
            model, 
            new THREE.MeshLambertMaterial( { color: 0x00ff00 } )
            
        );
        
        object.scale.set(0.1, 0.1, 0.1);
        object.rotation.x = Math.PI/2;
        object.rotation.z = Math.PI/5;
        object.position.set(0,0,0);
        scene.add(object);
    });

    let control = new OrbitControls(camera, renderer.domElement);


    animate();
}

init();