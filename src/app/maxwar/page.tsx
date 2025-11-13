'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMaxWarStore } from '@/lib/maxWarStore'
import { useMaxWarGameLoop } from '@/hooks/useMaxWarGameLoop'
import { GameScene } from '@/components/game/GameScene'
import { MaxWarResourceDisplay } from '@/components/game/MaxWarResourceDisplay'
import { BuildingPanel } from '@/components/game/BuildingPanel'
import { UnitTrainingPanel } from '@/components/game/UnitTrainingPanel'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, RotateCcw } from 'lucide-react'
import Link from 'next/link'

export default function MaxWarPage() {
  const router = useRouter()
  const { gameStarted, difficulty, resetGame } = useMaxWarStore()
  
  useMaxWarGameLoop()
  
  useEffect(() => {
    if (!gameStarted || !difficulty) {
      router.push('/')
    }
  }, [gameStarted, difficulty, router])
  
  const handleReset = () => {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
      resetGame()
      router.push('/')
    }
  }
  
  if (!gameStarted || !difficulty) {
    return null
  }
  
  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-[1800px] mx-auto space-y-4">
        {/* Header */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                MaxWar
              </h1>
              <p className="text-sm text-gray-600">
                Difficulty: <span className="font-semibold capitalize">{difficulty}</span>
              </p>
            </div>
            
            <MaxWarResourceDisplay />
            
            <div className="flex gap-2">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 3D Scene - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card className="p-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Battlefield</h2>
              <GameScene />
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-semibold text-blue-800 mb-1">Player Territory</div>
                  <div className="text-xs text-blue-600">Blue buildings and units</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="font-semibold text-red-800 mb-1">Enemy Territory</div>
                  <div className="text-xs text-red-600">Red buildings and units</div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Side Panel - Building and Training */}
          <div className="space-y-4">
            <Card className="p-4">
              <BuildingPanel />
            </Card>
            
            <Card className="p-4">
              <UnitTrainingPanel />
            </Card>
          </div>
        </div>
        
        {/* Game Tips */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-bold text-gray-800 mb-2">💡 Game Tips</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
            <li>• Build houses to increase population capacity</li>
            <li>• Construct resource buildings for steady income</li>
            <li>• Train soldiers and archers at the barracks</li>
            <li>• Use mouse to rotate and zoom the 3D view</li>
            <li>• Protect your Town Hall at all costs</li>
            <li>• Build walls to fortify your defenses</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
