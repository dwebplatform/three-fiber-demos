import React, {useState, useRef } from 'react';
import { useSpring, a } from 'react-spring/three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {Canvas, useThree,extend, useFrame} from 'react-three-fiber';
import './App.css';


extend({OrbitControls});


function Cube(props){
  const [isBig, setBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  const {size} = useSpring({
    size: isBig ? [2,2,2]:[1,1,1] 
  })
  const color = isHovered ?'pink':'salmon';
    useFrame(()=>{
    ref.current.rotation.x+=0.01;
  });
  return (
    <a.mesh {...props}
    ref={ref}
    scale ={ size}
    onPointerOver={()=> setIsHovered(true)}
    onPointerOut={()=> setIsHovered(false)}
    
    onClick={()=>setBig(!isBig)}
    >
      <boxBufferGeometry attach="geometry" args={[1,1,1]}/>
      <meshStandardMaterial attach="material" color={color}/>
    </a.mesh>
  )
}

function Scene(){
  const {
    camera,
    gl:{
      domElement
    }
  } = useThree();
  return (<>
  <ambientLight/>
  <pointLight position={[-1,2,4]}/>
  <Cube  rotation={[1,2,10]} position={[0,0,0]}/>
  <orbitControls args={[camera, domElement]}/>
  </>);
}
function App() {
  return (
    <Canvas >
      <Scene/> 
    </Canvas>
  );
}

export default App;
