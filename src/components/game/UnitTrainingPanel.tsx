'use client'

import { useMaxWarStore, UnitType } from '@/lib/maxWarStore'
import { UNIT_COSTS, UNIT_NAMES, UNIT_STATS } from '@/lib/maxWarConstants'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { User } from 'lucide-react'

export function UnitTrainingPanel() {
  const { 
    spendResources, 
    trainUnit, 
    resources, 
    currentPopulation, 
    populationCap,
    trainingQueue,
    playerBuildings 
  } = useMaxWarStore()
  
  const trainableUnits: UnitType[] = ['villager', 'soldier', 'archer', 'cavalry']
  
  // Check if player has a barracks
  const hasBarracks = playerBuildings.some(b => b.type === 'barracks' && !b.isConstructing)
  
  const handleTrain = (type: UnitType) => {
    if (currentPopulation >= populationCap) {
      alert('Population cap reached! Build more houses.')
      return
    }
    
    const cost = UNIT_COSTS[type]
    
    if (spendResources(cost)) {
      trainUnit(type, cost.time * 1000)
    }
  }
  
  const canAfford = (type: UnitType) => {
    const cost = UNIT_COSTS[type]
    return resources.wood >= cost.wood &&
           resources.food >= cost.food &&
           resources.gold >= cost.gold &&
           resources.stone >= cost.stone
  }
  
  const canTrain = (type: UnitType) => {
    // Villagers can always be trained
    if (type === 'villager') return true
    // Military units need barracks
    return hasBarracks
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Train Units</h3>
        {trainingQueue.length > 0 && (
          <span className="text-sm text-gray-600">
            Training: {trainingQueue.length}
          </span>
        )}
      </div>
      
      {!hasBarracks && (
        <Card className="p-3 bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-800">
            ⚠️ Build a Barracks to train military units
          </p>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {trainableUnits.map((type) => {
          const cost = UNIT_COSTS[type]
          const stats = UNIT_STATS[type]
          const affordable = canAfford(type)
          const trainable = canTrain(type)
          const disabled = !affordable || !trainable || currentPopulation >= populationCap
          
          return (
            <Card
              key={type}
              className={`p-4 ${disabled ? 'opacity-50' : 'hover:shadow-lg transition-shadow'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-800">{UNIT_NAMES[type]}</h4>
                  <p className="text-xs text-gray-500">{stats.description}</p>
                </div>
                <User className="w-6 h-6 text-gray-600" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-red-600">{stats.health}</div>
                  <div className="text-gray-500">HP</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-orange-600">{stats.damage}</div>
                  <div className="text-gray-500">DMG</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">{stats.range}</div>
                  <div className="text-gray-500">Range</div>
                </div>
              </div>
              
              <div className="space-y-1 mb-3 text-xs">
                {cost.food > 0 && (
                  <div className="flex justify-between">
                    <span>Food:</span>
                    <span className={resources.food >= cost.food ? 'text-green-600' : 'text-red-600'}>
                      {cost.food}
                    </span>
                  </div>
                )}
                {cost.wood > 0 && (
                  <div className="flex justify-between">
                    <span>Wood:</span>
                    <span className={resources.wood >= cost.wood ? 'text-green-600' : 'text-red-600'}>
                      {cost.wood}
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
                <div className="flex justify-between text-gray-600">
                  <span>Time:</span>
                  <span>{cost.time}s</span>
                </div>
              </div>
              
              <Button
                onClick={() => handleTrain(type)}
                disabled={disabled}
                size="sm"
                className="w-full"
              >
                Train
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
