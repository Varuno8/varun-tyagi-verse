
import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

// 3D Code Cube component without using drei
const CodeCube = ({ position, size = 1, color = 'white', speed = 1 }: { position: [number, number, number], size?: number, color?: string, speed?: number }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2 * speed) * 0.2;
    mesh.current.rotation.y += 0.01 * speed;
    
    // Add floating animation manually
    mesh.current.position.y += Math.sin(state.clock.getElapsedTime() * speed) * 0.002;
  });
  
  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial 
        wireframe 
        transparent
        opacity={0.7}
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Connected lines between cubes
const Lines = ({ points }: { points: [number, number, number][] }) => {
  const lineRef = useRef<THREE.LineSegments>(null!);
  
  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y += 0.001;
  });
  
  // Create geometry with vertices from points
  const geometry = new THREE.BufferGeometry();
  const vertices: number[] = [];
  
  // Connect each point to every other point
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      vertices.push(...points[i], ...points[j]);
    }
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial 
        attach="material"
        color="#8B5CF6"
        opacity={0.2}
        transparent
      />
    </lineSegments>
  );
};

const ThreeDBackground = () => {
  // Define positions for cubes
  const positions: [number, number, number][] = [
    [-4, 2, -2],
    [4, -2, 3],
    [-2, -3, -5],
    [3, 3, -3],
    [-5, 0, 2],
    [5, -1, -4],
    [0, 4, 5],
  ];

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={0.2} />
        
        {/* 3D cubes */}
        {positions.map((position, idx) => (
          <CodeCube 
            key={idx} 
            position={position} 
            size={1 + Math.random()} 
            color={
              idx % 3 === 0 ? "#8B5CF6" : // purple
              idx % 3 === 1 ? "#00E5FF" : // cyan
                              "#06D6A0"    // teal
            }
            speed={0.5 + Math.random()}
          />
        ))}
        
        {/* Connected lines */}
        <Lines points={positions} />
        
        {/* Manual camera controls */}
        <group>
          {/* This empty group replaces OrbitControls */}
        </group>
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
