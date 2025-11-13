'use client'

import { useRef, useMemo } from 'react'
import { Mesh } from 'three'
import { MaxWarBuilding } from '@/lib/maxWarStore'
import { Text } from '@react-three/drei'

interface Building3DProps {
  building: MaxWarBuilding
}

export function Building3D({ building }: Building3DProps) {
  const meshRef = useRef<Mesh>(null)
  
  // Determine color based on owner and building type
  const color = useMemo(() => {
    if (building.owner === 'player') {
      return building.type === 'townhall' ? '#4a90e2' : '#5aa469'
    } else {
      return building.type === 'townhall' ? '#e24a4a' : '#c45a5a'
    }
  }, [building.owner, building.type])
  
  // Building dimensions based on type
  const dimensions = useMemo(() => {
    switch (building.type) {
      case 'townhall':
        return { width: 5, height: 6, depth: 5 }
      case 'house':
        return { width: 3, height: 3, depth: 3 }
      case 'barracks':
        return { width: 4, height: 3.5, depth: 4 }
      case 'farm':
        return { width: 4, height: 2, depth: 4 }
      case 'lumbermill':
        return { width: 3.5, height: 3, depth: 3.5 }
      case 'mine':
        return { width: 3, height: 2.5, depth: 3 }
      case 'storehouse':
        return { width: 3, height: 3, depth: 3 }
      case 'wall':
        return { width: 1, height: 2, depth: 1 }
      default:
        return { width: 2, height: 2, depth: 2 }
    }
  }, [building.type])
  
  const healthPercentage = (building.health / building.maxHealth) * 100
  const healthColor = healthPercentage > 60 ? '#4ade80' : healthPercentage > 30 ? '#fbbf24' : '#ef4444'
  
  return (
    <group position={building.position}>
      {/* Main building structure */}
      <mesh
        ref={meshRef}
        position={[0, dimensions.height / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Roof for houses and townhall */}
      {(building.type === 'house' || building.type === 'townhall') && (
        <mesh
          position={[0, dimensions.height + 0.5, 0]}
          rotation={[0, Math.PI / 4, 0]}
          castShadow
        >
          <coneGeometry args={[dimensions.width * 0.7, 1.5, 4]} />
          <meshStandardMaterial color={building.owner === 'player' ? '#8b4513' : '#654321'} />
        </mesh>
      )}
      
      {/* Health bar */}
      <group position={[0, dimensions.height + 1.5, 0]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[dimensions.width * 0.8, 0.2]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        <mesh position={[-(dimensions.width * 0.8) * (1 - healthPercentage / 100) / 2, 0, 0.01]}>
          <planeGeometry args={[(dimensions.width * 0.8) * healthPercentage / 100, 0.15]} />
          <meshBasicMaterial color={healthColor} />
        </mesh>
      </group>
      
      {/* Building label */}
      <Text
        position={[0, dimensions.height + 2, 0]}
        fontSize={0.5}
        color={building.owner === 'player' ? '#4a90e2' : '#e24a4a'}
        anchorX="center"
        anchorY="middle"
      >
        {building.type.toUpperCase()}
      </Text>
      
      {/* Construction indicator */}
      {building.isConstructing && (
        <mesh position={[0, dimensions.height / 2, 0]}>
          <boxGeometry args={[dimensions.width + 0.2, dimensions.height + 0.2, dimensions.depth + 0.2]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      )}
    </group>
  )
}
