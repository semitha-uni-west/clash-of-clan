'use client'

import { useRef, useMemo } from 'react'
import { Mesh } from 'three'
import { Unit } from '@/lib/maxWarStore'
import { Text } from '@react-three/drei'

interface Unit3DProps {
  unit: Unit
}

export function Unit3D({ unit }: Unit3DProps) {
  const meshRef = useRef<Mesh>(null)
  
  const color = useMemo(() => {
    return unit.owner === 'player' ? '#4a90e2' : '#e24a4a'
  }, [unit.owner])
  
  const dimensions = useMemo(() => {
    switch (unit.type) {
      case 'villager':
        return { radius: 0.3, height: 1.2 }
      case 'soldier':
        return { radius: 0.4, height: 1.5 }
      case 'archer':
        return { radius: 0.35, height: 1.4 }
      case 'cavalry':
        return { radius: 0.5, height: 1.8 }
      default:
        return { radius: 0.3, height: 1.2 }
    }
  }, [unit.type])
  
  const healthPercentage = (unit.health / unit.maxHealth) * 100
  const healthColor = healthPercentage > 60 ? '#4ade80' : healthPercentage > 30 ? '#fbbf24' : '#ef4444'
  
  return (
    <group position={unit.position}>
      {/* Body */}
      <mesh
        ref={meshRef}
        position={[0, dimensions.height / 2, 0]}
        castShadow
      >
        <capsuleGeometry args={[dimensions.radius, dimensions.height - dimensions.radius * 2, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Head */}
      <mesh
        position={[0, dimensions.height + dimensions.radius * 0.5, 0]}
        castShadow
      >
        <sphereGeometry args={[dimensions.radius * 0.8, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Weapon indicator for military units */}
      {unit.type !== 'villager' && (
        <mesh
          position={[dimensions.radius * 1.2, dimensions.height / 2, 0]}
          rotation={[0, 0, Math.PI / 4]}
          castShadow
        >
          <boxGeometry args={[0.1, dimensions.height * 0.6, 0.1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      )}
      
      {/* Health bar */}
      <group position={[0, dimensions.height + dimensions.radius + 0.5, 0]}>
        <mesh>
          <planeGeometry args={[1, 0.1]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        <mesh position={[-(1 - healthPercentage / 100) / 2, 0, 0.01]}>
          <planeGeometry args={[healthPercentage / 100, 0.08]} />
          <meshBasicMaterial color={healthColor} />
        </mesh>
      </group>
      
      {/* Unit type label */}
      <Text
        position={[0, dimensions.height + dimensions.radius + 0.8, 0]}
        fontSize={0.3}
        color={unit.owner === 'player' ? '#4a90e2' : '#e24a4a'}
        anchorX="center"
        anchorY="middle"
      >
        {unit.type.toUpperCase()}
      </Text>
    </group>
  )
}
