'use client'

import { useGameStore, Mission as MissionType } from '@/lib/gameStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useState } from 'react'
import { Coins, Droplet, Trophy, CheckCircle, Swords, Users } from 'lucide-react'
import { BUILDING_NAMES, TROOP_STATS } from '@/lib/gameConstants'
import { motion } from 'framer-motion'

export function CampaignMode() {
  const { missions, troops, completeMission, addGold, addElixir, deployTroops } = useGameStore()
  const [selectedMission, setSelectedMission] = useState<MissionType | null>(null)
  const [battleResult, setBattleResult] = useState<{ won: boolean; stars: number } | null>(null)
  
  const handleStartBattle = (mission: MissionType) => {
    setSelectedMission(mission)
    setBattleResult(null)
  }
  
  const simulateBattle = () => {
    if (!selectedMission) return
    
    // Simple combat simulation
    let playerPower = 0
    troops.forEach(troop => {
      const stats = TROOP_STATS[troop.type]
      playerPower += (stats.hp + stats.damage) * troop.count
    })
    
    const enemyPower = selectedMission.enemyBuildings.reduce((acc, building) => {
      return acc + (building.level * 50)
    }, 0)
    
    const powerRatio = playerPower / enemyPower
    const won = powerRatio > 1.2
    const stars = won ? Math.min(3, Math.ceil(powerRatio)) : 0
    
    if (won) {
      completeMission(selectedMission.id)
      addGold(selectedMission.goldReward)
      addElixir(selectedMission.elixirReward)
      
      // Deploy all troops
      deployTroops(troops)
    }
    
    setBattleResult({ won, stars })
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">Campaign</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missions.map((mission) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mission.id * 0.1 }}
          >
            <Card className={mission.completed ? 'border-green-500 bg-green-50' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{mission.name}</CardTitle>
                    <CardDescription>Difficulty: {mission.difficulty}/5</CardDescription>
                  </div>
                  {mission.completed && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="text-sm font-semibold">Rewards:</div>
                  <div className="flex gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span>{mission.goldReward}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplet className="w-4 h-4 text-purple-500" />
                      <span>{mission.elixirReward}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm font-semibold">Enemy Base:</div>
                  <div className="text-xs text-gray-600">
                    {mission.enemyBuildings.map((b, i) => (
                      <div key={i}>
                        {BUILDING_NAMES[b.type]} Lv.{b.level}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant={mission.completed ? "outline" : "primary"}
                  size="sm" 
                  className="w-full"
                  onClick={() => handleStartBattle(mission)}
                  disabled={mission.completed}
                >
                  <Swords className="w-4 h-4 mr-2" />
                  {mission.completed ? 'Completed' : 'Attack'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <Dialog open={selectedMission !== null} onOpenChange={() => setSelectedMission(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMission?.name}</DialogTitle>
            <DialogDescription>
              {battleResult ? 'Battle Results' : 'Deploy your troops'}
            </DialogDescription>
          </DialogHeader>
          
          {battleResult ? (
            <div className="space-y-4 text-center py-4">
              <div className={`text-4xl font-bold ${battleResult.won ? 'text-green-600' : 'text-red-600'}`}>
                {battleResult.won ? 'Victory!' : 'Defeat'}
              </div>
              {battleResult.won && (
                <>
                  <div className="flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Trophy 
                        key={i} 
                        className={`w-8 h-8 ${i < battleResult.stars ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill={i < battleResult.stars ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-yellow-500" />
                        <span className="font-bold">+{selectedMission?.goldReward}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplet className="w-5 h-5 text-purple-500" />
                        <span className="font-bold">+{selectedMission?.elixirReward}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <Button onClick={() => setSelectedMission(null)} className="w-full">
                Close
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="font-semibold">Your Army:</div>
                {troops.length > 0 ? (
                  <div className="space-y-1">
                    {troops.map((troop, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="capitalize">{troop.type}</span>
                        </div>
                        <span className="font-bold">{troop.count}x</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded">
                    No troops available. Train some troops first!
                  </div>
                )}
              </div>
              
              <Button 
                variant="primary" 
                className="w-full"
                onClick={simulateBattle}
                disabled={troops.length === 0}
              >
                Start Battle
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
