import * as THREE from '../threejs/build/three.module.js';
//import { GUI } from 'dat.gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color( 0xefd1b5 );
//scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const height = loader.load('../images/seed_882_00009.png');
const texture = loader.load('../images/seed_882_00009.png');
//const alpha = loader.load('/alpha.png');
//'#201e1d'
const geometry = new THREE.PlaneGeometry(3,3, 64,  64);
const material = new THREE.MeshStandardMaterial({ map: texture, displacementMap: height });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

plane.rotation.x = -1;

camera.position.z = 5;

const pointLight = new THREE.PointLight(0xffffff,2);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

function animate() {
    requestAnimationFrame(animate);
    /*

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
    */
  renderer.render(scene, camera);
}

animate();