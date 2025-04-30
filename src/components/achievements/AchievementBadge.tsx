
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface AchievementBadgeProps {
  position: [number, number, number];
  color: string;
  value: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ position, color, value }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const planeMaterialRef = useRef<THREE.MeshBasicMaterial>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  
  const colorObj = new THREE.Color(color);
  const whiteColor = new THREE.Color("white");
  
  // Set material properties directly in useEffect
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.wireframe = true;
      materialRef.current.transparent = true;
      materialRef.current.opacity = 0.7;
      materialRef.current.color = colorObj;
      materialRef.current.emissive = colorObj;
      materialRef.current.emissiveIntensity = 0.5;
    }
    
    if (planeMaterialRef.current) {
      planeMaterialRef.current.color = whiteColor;
      planeMaterialRef.current.transparent = true;
      planeMaterialRef.current.opacity = 0.9;
      planeMaterialRef.current.depthWrite = false;
    }
  }, [color]);
  
  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial ref={materialRef} />
      
      {/* Number display as basic geometry */}
      <mesh position={[0, 0, 1]} scale={0.5}>
        <planeGeometry args={[1, 0.3]} />
        <meshBasicMaterial ref={planeMaterialRef} />
      </mesh>
    </mesh>
  );
};

export default AchievementBadge;
