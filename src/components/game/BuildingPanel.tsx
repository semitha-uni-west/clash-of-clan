'use client'

import { useMaxWarStore, MaxWarBuildingType } from '@/lib/maxWarStore'
import { BUILDING_COSTS, BUILDING_NAMES, BUILDING_DESCRIPTIONS, BUILDING_CONSTRUCTION_TIME, BUILDING_HEALTH } from '@/lib/maxWarConstants'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Building, Home, Shield, Wheat, TreePine, Mountain, Box } from 'lucide-react'
import { useState } from 'react'
import { LucideIcon } from 'lucide-react'

const buildingIcons: Record<MaxWarBuildingType, LucideIcon> = {
  townhall: Building,
  house: Home,
  barracks: Shield,
  farm: Wheat,
  lumbermill: TreePine,
  mine: Mountain,
  storehouse: Box,
  wall: Shield
}

export function BuildingPanel() {
  const { spendResources, addBuilding, resources } = useMaxWarStore()
  const [selectedBuilding, setSelectedBuilding] = useState<MaxWarBuildingType | null>(null)
  
  const buildableTypes: MaxWarBuildingType[] = [
    'house',
    'barracks',
    'farm',
    'lumbermill',
    'mine',
    'storehouse',
    'wall'
  ]
  
  const handleBuild = (type: MaxWarBuildingType) => {
    const cost = BUILDING_COSTS[type]
    
    if (spendResources(cost)) {
      const newBuilding = {
        id: `player-${type}-${Date.now()}`,
        type,
        level: 1,
        position: [
          Math.random() * 10 - 5,
          0,
          Math.random() * 10 - 5
        ] as [number, number, number],
        owner: 'player' as const,
        health: BUILDING_HEALTH[type],
        maxHealth: BUILDING_HEALTH[type],
        isConstructing: true,
        constructionEndTime: Date.now() + BUILDING_CONSTRUCTION_TIME[type] * 1000
      }
      
      addBuilding(newBuilding)
      setSelectedBuilding(null)
    }
  }
  
  const canAfford = (type: MaxWarBuildingType) => {
    const cost = BUILDING_COSTS[type]
    return resources.wood >= cost.wood &&
           resources.food >= cost.food &&
           resources.gold >= cost.gold &&
           resources.stone >= cost.stone
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Build</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {buildableTypes.map((type) => {
          const Icon = buildingIcons[type]
          const cost = BUILDING_COSTS[type]
          const affordable = canAfford(type)
          
          return (
            <Card
              key={type}
              className={`p-3 cursor-pointer transition-all ${
                affordable ? 'hover:shadow-lg' : 'opacity-50'
              } ${selectedBuilding === type ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => affordable && setSelectedBuilding(type)}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className="w-8 h-8 text-gray-700" />
                <div className="text-xs font-semibold text-center">
                  {BUILDING_NAMES[type]}
                </div>
                <div className="text-xs text-gray-500 space-y-1 w-full">
                  {cost.wood > 0 && (
                    <div className="flex justify-between">
                      <span>Wood:</span>
                      <span className={resources.wood >= cost.wood ? 'text-green-600' : 'text-red-600'}>
                        {cost.wood}
                      </span>
                    </div>
                  )}
                  {cost.food > 0 && (
                    <div className="flex justify-between">
                      <span>Food:</span>
                      <span className={resources.food >= cost.food ? 'text-green-600' : 'text-red-600'}>
                        {cost.food}
                      </span>
                    </div>
                  )}
                  {cost.gold > 0 && (
                    <div className="flex justify-between">
                      <span>Gold:</span>
                      <span className={resources.gold >= cost.gold ? 'text-green-600' : 'text-red-600'}>
                        {cost.gold}
                      </span>
                    </div>
                  )}
                  {cost.stone > 0 && (
                    <div className="flex justify-between">
                      <span>Stone:</span>
                      <span className={resources.stone >= cost.stone ? 'text-green-600' : 'text-red-600'}>
                        {cost.stone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      
      {selectedBuilding && (
        <Card className="p-4 bg-blue-50">
          <h4 className="font-bold text-gray-800 mb-2">
            {BUILDING_NAMES[selectedBuilding]}
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            {BUILDING_DESCRIPTIONS[selectedBuilding]}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => handleBuild(selectedBuilding)}
              disabled={!canAfford(selectedBuilding)}
              className="flex-1"
            >
              Build
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedBuilding(null)}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
