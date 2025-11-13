'use client'

import { useGameStore, Building } from '@/lib/gameStore'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BuildingCard } from './BuildingCard'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { BUILDING_NAMES, canBuildBuilding, BUILDING_COSTS } from '@/lib/gameConstants'
import { Plus, Coins, Droplet } from 'lucide-react'
import type { BuildingType } from '@/lib/gameStore'

export function VillageGrid() {
  const { buildings, townHallLevel, addBuilding, spendGold, spendElixir, completeBuildingUpgrade } = useGameStore()
  const [showBuildMenu, setShowBuildMenu] = useState(false)
  
  const buildingTypes: BuildingType[] = ['goldmine', 'elixircollector', 'armycamp', 'barracks']
  
  const handleBuildNew = (type: BuildingType) => {
    const currentCount = buildings.filter(b => b.type === type).length
    
    if (!canBuildBuilding(type, townHallLevel, currentCount)) {
      alert('Cannot build this building yet. Check requirements.')
      return
    }
    
    const cost = BUILDING_COSTS[type][0]
    const goldSuccess = cost.gold === 0 || spendGold(cost.gold)
    const elixirSuccess = cost.elixir === 0 || spendElixir(cost.elixir)
    
    if (goldSuccess && elixirSuccess) {
      const timestamp = new Date().getTime()
      // Position values use Math.random for simple random placement
      const x = Math.floor(Math.random() * 8)
      const y = Math.floor(Math.random() * 8)
      
      const newBuilding: Building = {
        id: `${type}-${timestamp}`,
        type,
        level: 1,
        x,
        y,
        isUpgrading: false
      }
      addBuilding(newBuilding)
      setShowBuildMenu(false)
    } else {
      alert('Not enough resources!')
    }
  }
  
  const handleUpgradeComplete = (building: Building) => {
    // Auto-complete upgrades after time
    if (building.upgradeEndTime) {
      setTimeout(() => {
        completeBuildingUpgrade(building.id)
      }, building.upgradeEndTime - Date.now())
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Village</h2>
        <Button 
          variant="primary"
          onClick={() => setShowBuildMenu(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Build
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {buildings.map((building) => (
            <BuildingCard 
              key={building.id} 
              building={building}
              onUpgrade={handleUpgradeComplete}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {buildings.length === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300"
        >
          <p className="text-lg text-blue-700">
            Welcome to your village! Click the <strong>Build</strong> button to construct new buildings.
          </p>
        </motion.div>
      )}
      
      <Dialog open={showBuildMenu} onOpenChange={setShowBuildMenu}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Build New Building</DialogTitle>
            <DialogDescription>Choose a building to construct in your village</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 mt-4">
            {buildingTypes.map((type) => {
              const currentCount = buildings.filter(b => b.type === type).length
              const canBuild = canBuildBuilding(type, townHallLevel, currentCount)
              const cost = BUILDING_COSTS[type][0]
              
              return (
                <button
                  key={type}
                  onClick={() => canBuild && handleBuildNew(type)}
                  disabled={!canBuild}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    canBuild 
                      ? 'hover:border-blue-500 hover:bg-blue-50 cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed bg-gray-100'
                  }`}
                >
                  <div className="font-semibold text-lg">{BUILDING_NAMES[type]}</div>
                  <div className="flex gap-3 mt-2 text-sm">
                    {cost.gold > 0 && (
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span>{cost.gold}</span>
                      </div>
                    )}
                    {cost.elixir > 0 && (
                      <div className="flex items-center gap-1">
                        <Droplet className="w-4 h-4 text-purple-500" />
                        <span>{cost.elixir}</span>
                      </div>
                    )}
                  </div>
                  {!canBuild && (
                    <div className="text-xs text-red-600 mt-1">
                      Requires Town Hall level {type === 'armycamp' || type === 'barracks' ? '2' : '1'} or max buildings reached
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
