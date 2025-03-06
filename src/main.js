import * as Three from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const validateNumber = (number) => {
  console.log(typeof(number))
  if (isNaN(number) == true)
    {
      return -1
    }
  else if (number < 0)
    {
      return 0
    }
  else if (number > 10)
    {
      return 10
    }
  else
  {
    return number
  }
}

const checkString = (string) => {

  for(let index = 0; index < string.length; index++)
  {
    if (string[index] == '.' && index == string.length - 1)
      {
        return true
      } 
  }
  return false
}

const validateScaleInput = (scaleInput) => {

  let containsPeriod = checkString(scaleInput)

  return containsPeriod ? -1 : validateNumber(parseFloat(scaleInput))

}

const scene = new Three.Scene();

const cubeGeometry = new Three.BoxGeometry(1,1,1)
let cubeColor = new Three.Color("#787FE8")
let cubeMaterial = new Three.MeshBasicMaterial({color: cubeColor})
let cubeMesh = new Three.Mesh(cubeGeometry, cubeMaterial)
let cubeXRotation = 0
let cubeYRotation = 0
let cubeZRotation = 0 

scene.add(cubeMesh)

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30)


window.innerWidth > 800 ? camera.position.z = 2 : camera.position.z = 3

scene.add(camera)

const canvas = document.querySelector('.threeJS')

const renderer = new Three.WebGLRenderer({canvas : canvas})

const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true

console.log(window.innerWidth, window.innerHeight)
renderer.setSize(window.innerWidth, window.innerHeight)
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio)

const colorInput = document.querySelector('.colorInput')

const xInputSlider = document.querySelector('.xSizeInputSlider')

const xTextBox = document.querySelector('.xSizeInputText')

const yInputSlider = document.querySelector('.ySizeInputSlider')

const yTextBox = document.querySelector('.ySizeInputText')

const zInputSlider = document.querySelector('.zSizeInputSlider')

const zTextBox = document.querySelector('.zSizeInputText')

let xSize = 1
let ySize = 1
let zSize = 1

let rotationAxis = 'None'

colorInput.addEventListener('input', () => {
  scene.remove(cubeMesh)
  cubeColor = new Three.Color(`${colorInput.value}`)
  let cubeMaterial = new Three.MeshBasicMaterial({color: cubeColor})
  cubeMesh = new Three.Mesh(cubeGeometry, cubeMaterial)
  cubeMesh.rotation.x = cubeXRotation
  cubeMesh.rotation.y = cubeYRotation
  cubeMesh.rotation.z = cubeZRotation
  cubeMesh.scale.x = xSize
  cubeMesh.scale.y = ySize
  cubeMesh.scale.z = zSize
  scene.add(cubeMesh)
})

xInputSlider.addEventListener('input', () => {
  xSize = xInputSlider.value
  cubeMesh.scale.x = xInputSlider.value
  xTextBox.value = xInputSlider.value
})

xTextBox.addEventListener('input', () => {
    let val = validateScaleInput(xTextBox.value)
    
    if(val == -1)
    {
      xSize = xTextBox.value
    }
    else
    {
      xSize = val
    }

    cubeMesh.scale.x = xSize
    xInputSlider.value = xSize
    xTextBox.value = xSize
  })

yInputSlider.addEventListener('input', () => {
  ySize = yInputSlider.value
  cubeMesh.scale.y = yInputSlider.value
  yTextBox.value = yInputSlider.value
})

yTextBox.addEventListener('input', () => {
  let val = validateScaleInput(yTextBox.value)

  if(val == -1)
  {
    ySize = yTextBox.value
  }
  else
  {
    ySize = val 
  }

  cubeMesh.scale.y = ySize 
  yInputSlider.value = ySize
  yTextBox.value = ySize
})

zInputSlider.addEventListener('input', () => {
  zSize = zInputSlider.value
  cubeMesh.scale.z = zInputSlider.value
  zTextBox.value = zInputSlider.value
})

zTextBox.addEventListener('input', () => {
  let val = validateScaleInput(zTextBox.value)

  if(val == -1)
  {
    zSize = zTextBox.value
  }
  else
  {
    zSize = val
  }

  cubeMesh.scale.z = zSize
  zInputSlider.value = zSize
  zTextBox.value = zSize
})

const rotateArr = document.querySelectorAll('.rotateRadio')

for(let i = 0; i < rotateArr.length; i ++)
{
  rotateArr[i].addEventListener('click', () => {
    let axis = rotateArr[i].id
    rotationAxis = axis
  })
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight // Gets the aspect ratio of the application
  camera.updateProjectionMatrix() // Update the projection to maintain the aspect ratio 
  renderer.setSize(window.innerWidth, window.innerHeight) // Set the size of the window being rendered
})

const renderLoop = () => {
  switch(rotationAxis){
    case 'x':
      cubeXRotation += 0.007
      cubeMesh.rotation.x = cubeXRotation
      break;
    case 'y':
      cubeYRotation += 0.007
      cubeMesh.rotation.y = cubeYRotation
      break;
    case 'z':
      cubeZRotation += 0.007
      cubeMesh.rotation.z = cubeZRotation
      break; 
  }
  renderer.setSize(window.innerWidth, window.innerHeight)
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderLoop)
}

renderLoop()