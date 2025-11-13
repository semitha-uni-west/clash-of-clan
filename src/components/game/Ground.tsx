'use client'

import { useRef } from 'react'
import { Mesh } from 'three'

export function Ground() {
  const meshRef = useRef<Mesh>(null)
  
  return (
    <>
      {/* Main ground plane */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4a7c3c" />
      </mesh>
      
      {/* Grid helper for better visualization */}
      <gridHelper args={[100, 20, '#666666', '#888888']} position={[0, 0, 0]} />
      
      {/* Player territory indicator */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[20, 32]} />
        <meshStandardMaterial 
          color="#4a90e2" 
          transparent 
          opacity={0.2}
        />
      </mesh>
      
      {/* Enemy territory indicator */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[40, 0, -40]}>
        <circleGeometry args={[20, 32]} />
        <meshStandardMaterial 
          color="#e24a4a" 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </>
  )
}
