'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import { Ground } from './Ground'
import { Building3D } from './Building3D'
import { Unit3D } from './Unit3D'
import { useMaxWarStore } from '@/lib/maxWarStore'

export function GameScene() {
  const { playerBuildings, enemyBuildings, playerUnits, enemyUnits } = useMaxWarStore()
  
  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-sky-300 to-sky-100 rounded-xl overflow-hidden">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[30, 40, 30]} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={20}
            maxDistance={100}
            maxPolarAngle={Math.PI / 2.5}
          />
          
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[50, 50, 25]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={100}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />
          <hemisphereLight args={['#87CEEB', '#654321', 0.5]} />
          
          {/* Sky */}
          <Sky sunPosition={[100, 20, 100]} />
          
          {/* Ground */}
          <Ground />
          
          {/* Player Buildings */}
          {playerBuildings.map(building => (
            <Building3D key={building.id} building={building} />
          ))}
          
          {/* Enemy Buildings */}
          {enemyBuildings.map(building => (
            <Building3D key={building.id} building={building} />
          ))}
          
          {/* Player Units */}
          {playerUnits.map(unit => (
            <Unit3D key={unit.id} unit={unit} />
          ))}
          
          {/* Enemy Units */}
          {enemyUnits.map(unit => (
            <Unit3D key={unit.id} unit={unit} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}
