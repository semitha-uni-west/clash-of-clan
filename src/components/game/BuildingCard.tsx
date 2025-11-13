'use client'

import { useGameStore, Building as BuildingType } from '@/lib/gameStore'
import { BUILDING_NAMES, getUpgradeCost, getUpgradeTime } from '@/lib/gameConstants'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Coins, Droplet, Clock, TrendingUp } from 'lucide-react'

interface BuildingCardProps {
  building: BuildingType
  onUpgrade?: (building: BuildingType) => void
}

export function BuildingCard({ building, onUpgrade }: BuildingCardProps) {
  const { spendGold, spendElixir, upgradeBuilding } = useGameStore()
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  
  const upgradeCost = getUpgradeCost(building.type, building.level)
  const upgradeTime = getUpgradeTime(building.type, building.level)
  
  useEffect(() => {
    if (building.isUpgrading && building.upgradeEndTime) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, building.upgradeEndTime! - Date.now())
        setTimeRemaining(remaining)
        
        if (remaining === 0) {
          clearInterval(interval)
        }
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [building.isUpgrading, building.upgradeEndTime])
  
  const handleUpgrade = () => {
    if (!upgradeCost) return
    
    const goldSuccess = upgradeCost.gold === 0 || spendGold(upgradeCost.gold)
    const elixirSuccess = upgradeCost.elixir === 0 || spendElixir(upgradeCost.elixir)
    
    if (goldSuccess && elixirSuccess) {
      upgradeBuilding(building.id)
      if (onUpgrade) onUpgrade(building)
    }
  }
  
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`
    }
    return `${seconds}s`
  }
  
  const getBuildingColor = (type: string) => {
    switch (type) {
      case 'townhall': return 'from-amber-500 to-orange-600'
      case 'goldmine': return 'from-yellow-400 to-yellow-600'
      case 'elixircollector': return 'from-purple-500 to-pink-600'
      case 'armycamp': return 'from-red-500 to-red-700'
      case 'barracks': return 'from-blue-500 to-blue-700'
      default: return 'from-gray-500 to-gray-700'
    }
  }
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className={`w-full h-24 rounded-t-lg bg-gradient-to-br ${getBuildingColor(building.type)} flex items-center justify-center mb-2`}>
            <div className="text-white text-4xl font-bold">{building.level}</div>
          </div>
          <CardTitle>{BUILDING_NAMES[building.type]}</CardTitle>
          <CardDescription>Level {building.level}</CardDescription>
        </CardHeader>
        <CardContent>
          {building.isUpgrading ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">Upgrading...</span>
              </div>
              <div className="text-sm text-gray-600">
                Time remaining: {formatTime(timeRemaining)}
              </div>
            </div>
          ) : upgradeCost ? (
            <div className="space-y-3">
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-semibold">Upgrade to Level {building.level + 1}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{upgradeTime ? formatTime(upgradeTime * 1000) : 'N/A'}</span>
                </div>
              </div>
              <div className="flex gap-2 text-sm">
                {upgradeCost.gold > 0 && (
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span>{upgradeCost.gold}</span>
                  </div>
                )}
                {upgradeCost.elixir > 0 && (
                  <div className="flex items-center gap-1">
                    <Droplet className="w-4 h-4 text-purple-500" />
                    <span>{upgradeCost.elixir}</span>
                  </div>
                )}
              </div>
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full"
                onClick={handleUpgrade}
              >
                Upgrade
              </Button>
            </div>
          ) : (
            <div className="text-sm text-gray-500">Max Level</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
