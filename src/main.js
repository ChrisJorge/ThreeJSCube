import * as Three from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'dat.gui';

const gui = new GUI();
const scene = new Three.Scene();

const cubeGeometry = new Three.BoxGeometry(1,1,1);
let cubeColor = new Three.Color("#787FE8");
let cubeMaterial = new Three.MeshBasicMaterial({color: cubeColor});
let cubeMesh = new Three.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

let parameters = {
 cubeColor: cubeColor.getHex(),
}

let rotationParameters = {
 x: false,
 y: false,
 z: false
}
let rotationAxis = 'None';

let cubeRotation = gui.addFolder("Cube Rotation");
cubeRotation.add(cubeMesh.rotation, 'x', 0, 5).name('Rotate X Axis');
cubeRotation.add(cubeMesh.rotation, 'y', 0, 5).name('Rotate Y Axis');
cubeRotation.add(cubeMesh.rotation, 'z', 0, 5).name('Rotate Z Axis');

let cubeScale = gui.addFolder("Cube Scale");
cubeScale.add(cubeMesh.scale, 'x', 0, 2).name('Scale X Axis');
cubeScale.add(cubeMesh.scale, 'y', 0, 2).name('Scale Y Axis');
cubeScale.add(cubeMesh.scale, 'z', 0, 2).name('Scale Z Axis');

gui.addColor(parameters, 'cubeColor').onChange((value) => {
  cubeMesh.material.color.set(value);
})

let autoRotation = gui.addFolder("Auto Rotation");
autoRotation.add(rotationParameters, 'x').name("X").listen().onChange(()=> {setChecked('x')});
autoRotation.add(rotationParameters, 'y').name("Y").listen().onChange(()=> {setChecked('y')});
autoRotation.add(rotationParameters, 'z').name("Z").listen().onChange(()=> {setChecked('z')});

const setChecked = (checkedAxis) => {
  if(checkedAxis == rotationAxis)
  {
    rotationParameters[checkedAxis] = false;
    rotationAxis = 'None';
  }
  else{
    for(let key in rotationParameters)
      {
        rotationParameters[key] = false;
      }
    rotationParameters[checkedAxis] = true;
    rotationAxis = checkedAxis;
  }
}

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30);

window.innerWidth > 800 ? camera.position.z = 2 : camera.position.z = 3;

scene.add(camera);

const canvas = document.querySelector('.threeJS');

const renderer = new Three.WebGLRenderer({canvas : canvas});

const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;

renderer.setSize(window.innerWidth, window.innerHeight);
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Gets the aspect ratio of the application
  camera.updateProjectionMatrix(); // Update the projection to maintain the aspect ratio 
  renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the window being rendered
})

window.addEventListener('orientationchange', () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Gets the aspect ratio of the application
  camera.updateProjectionMatrix(); // Update the projection to maintain the aspect ratio 
  renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the window being rendered
})

const renderLoop = () => {
  switch(rotationAxis){
    case 'x':
      cubeMesh.rotation.x += 0.015;
      break;
    case 'y':
      cubeMesh.rotation.y += 0.015;
      break;
    case 'z':
      cubeMesh.rotation.z += 0.015;
      break;
    default:
      break; 
  }
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();