import React, {useState, useRef, Suspense } from 'react';
import { useSpring, a } from 'react-spring/three';
import {OrbitControls, Torus} from 'drei';
import {TextureLoader} from 'three';
import {Controls, useControl,ControlsProvider} from 'react-three-gui';
import {Canvas, useThree,extend, useFrame, useLoader} from 'react-three-fiber';
import imageUrl from './logo.svg';
import './App.css';


 

function Sphere(props){
  const [isBig, setBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  const {size,x,y,z} = useSpring({
    size: isBig ? [2,2,2]:[1,1,1], 
    x: isHovered && Math.random()> 0.5 ?  2:0,
    y: isHovered && Math.random()> 0.5 ? 2:0,
    z: isHovered && Math.random()> 0.5 ? 2:0,
  
  });
  const color = isHovered ?'pink':'salmon';
    useFrame(()=>{
    ref.current.rotation.x+=0.01;
  });
  return (
    <a.mesh {...props}
    ref={ref}
    position-x={x}
    position-y={y}
    position-z={z}
    scale ={ size}
    onPointerOver={()=> setIsHovered(true)}
    onPointerOut={()=> setIsHovered(false)}
    
    onClick={()=>setBig(!isBig)}
    >
      <sphereBufferGeometry attach="geometry" args={[1,32,32]}/>
      <meshStandardMaterial attach="material" color={color}/>
    </a.mesh>
  )
}

function Cube(props){
  const [isBig, setBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  const positionX = useControl('position X',{type: 'number'});

  const texture =useLoader(TextureLoader, imageUrl);
  const {size,x,y,z} = useSpring({
    size: isBig ? [2,2,2]:[1,1,1], 
    x: isHovered && Math.random()> 0.5 ?  2:0,
    y: isHovered && Math.random()> 0.5 ? 2:0,
    z: isHovered && Math.random()> 0.5 ? 2:0,
  
  });
  const color = isHovered ?'pink':'salmon';
    useFrame(()=>{
    ref.current.rotation.x+=0.01;
  });
  return (
    <a.mesh {...props}
    ref={ref}
    position-x={positionX}
    position-y={y}
    position-z={z}
    scale ={ size}
    onPointerOver={()=> setIsHovered(true)}
    onPointerOut={()=> setIsHovered(false)}
    
    onClick={()=>setBig(!isBig)}
    >
      <boxBufferGeometry attach="geometry" args={[1,1,1,20,20,20]}/>
      <meshStandardMaterial 
      map={texture}
      attach="material" color={color}/>
    </a.mesh>
  )
}

function Scene(){
   return (<>
  <ambientLight/>
  <spotLight castShadow={true} intensity={0.6} position={[0,4,10]}/>
  <pointLight position={[1,2,4]}/>
  <Suspense fallback={null}>
  <Cube/>
  </Suspense>
  <Torus args={[ 1,0.2,3,32]} position={[1,2,2]}>
    <meshPhongMaterial 
    roughness={1} 
    metalness={0.5} 
    shininess={100}
    color="blue"
    attach="material"
    />
  </Torus>
    </>);
}
function App() {
  return (
    <ControlsProvider>
    <Canvas >
      <Scene/> 
    </Canvas>
  <Controls/>
  </ControlsProvider>
  );
}

export default App;
