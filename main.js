import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";
import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/geometries/TextGeometry.js";

const canvas = document.querySelector("#cartelCanvas");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 20);

const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffaacc, 1.5, 100);
pointLight.position.set(10, 10, 20);
scene.add(pointLight);

// Cargar fuente
const loader = new FontLoader();
loader.load("https://threejs.org/examples/fonts/helvetiker_bold.typeface.json", (font) => {
  const geometry = new TextGeometry("¡NOS CASAMOS!", {
    font,
    size: 3.5,
    height: 0.8,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.08,
    bevelSegments: 5,
  });
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.25,
    emissive: 0x331122,
    emissiveIntensity: 0.4,
  });

  const textMesh = new THREE.Mesh(geometry, material);
  scene.add(textMesh);

  // Animación
  let time = 0;
  function animate() {
    time += 0.01;

    // Movimiento dinámico
    textMesh.rotation.y = Math.sin(time * 0.6) * 0.4;
    textMesh.rotation.x = Math.sin(time * 0.3) * 0.2;
    textMesh.position.y = Math.sin(time * 0.5) * 0.3;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
});

// Responsivo
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
