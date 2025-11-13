'use client'

import { useGameStore } from '@/lib/gameStore'
import { TROOP_NAMES, TROOP_COSTS } from '@/lib/gameConstants'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Droplet, Clock, Users } from 'lucide-react'
import type { TroopType } from '@/lib/gameStore'

export function TroopTraining() {
  const { troops, trainingQueue, trainTroop, spendElixir } = useGameStore()
  
  const troopTypes: TroopType[] = ['barbarian', 'archer', 'giant']
  
  const handleTrainTroop = (type: TroopType) => {
    const cost = TROOP_COSTS[type]
    if (spendElixir(cost.elixir)) {
      trainTroop(type, cost.time * 1000)
    } else {
      alert('Not enough elixir!')
    }
  }
  
  const formatTime = (seconds: number) => {
    if (seconds >= 60) {
      return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
    }
    return `${seconds}s`
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Train Troops</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {troopTypes.map((type) => {
          const cost = TROOP_COSTS[type]
          const troopCount = troops.find(t => t.type === type)?.count || 0
          
          return (
            <Card key={type}>
              <CardHeader>
                <CardTitle>{TROOP_NAMES[type]}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Available: {troopCount}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Droplet className="w-4 h-4 text-purple-500" />
                  <span>{cost.elixir} Elixir</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(cost.time)}</span>
                </div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleTrainTroop(type)}
                >
                  Train
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      {trainingQueue.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Training Queue</CardTitle>
            <CardDescription>{trainingQueue.length} troops in training</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {trainingQueue.map((item, index) => {
                const remaining = Math.max(0, Math.floor((item.endTime - new Date().getTime()) / 1000))
                return (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-semibold">{TROOP_NAMES[item.type]}</span>
                    <span className="text-sm text-gray-600">{formatTime(remaining)}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
