import * as THREE from 'three';
import React, {useState, useRef, Suspense } from 'react';
import {OrbitControls ,Box} from 'drei';
import {TextureLoader} from 'three';
 import {Canvas, useThree,extend, useFrame, useLoader} from 'react-three-fiber';
import imageUrl from './logo.svg';
import './App.css';


  
 
const tempObject = new THREE.Object3D();
function Boxes(){
  const ref = useRef();
  useFrame((state)=>{
    const time = state.clock.getElapsedTime();
    let i = 0;
    const grow = Math.sin(time/1);
     for(let x = 0; x<10;x ++){ 
      for(let y = 0; y<10;y++){
      
        for(let z = 0; z<10;z++){
          const id = i++;
           tempObject.position.set(5-x*grow,5-y*grow,5-z*grow);
          tempObject.updateMatrix();
          ref.current.setMatrixAt(id, tempObject.matrix);
         }
      }
    }
    ref.current.instanceMatrix.needsUpdate = true; 
  })
  return (
    <instancedMesh
    ref={ref}
    args={[null, null, 1000]}
    frustumCulled={false}
  >
    <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]} />
    <meshStandardMaterial attach="material" color="teal" />
  </instancedMesh>
  )
}

function Scene(){
   return (<>
  <ambientLight/>
  <spotLight castShadow={true} intensity={0.6} position={[0,4,10]}/>
  <pointLight position={[1,2,4]}/>
  <Box>
    <meshBasicMaterial attach="material"/>
  </Box>
  <Boxes/>
  <OrbitControls/>
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
