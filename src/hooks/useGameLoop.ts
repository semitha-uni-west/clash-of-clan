'use client'

import { useEffect } from 'react'
import { useGameStore } from '@/lib/gameStore'

export function useGameLoop() {
  const { updateResources, completeTroopTraining, buildings, completeBuildingUpgrade } = useGameStore()
  
  useEffect(() => {
    // Update resources every second
    const resourceInterval = setInterval(() => {
      updateResources()
    }, 1000)
    
    // Check for completed troop training every second
    const troopInterval = setInterval(() => {
      completeTroopTraining()
    }, 1000)
    
    // Check for completed building upgrades every second
    const buildingInterval = setInterval(() => {
      const now = Date.now()
      buildings.forEach(building => {
        if (building.isUpgrading && building.upgradeEndTime && building.upgradeEndTime <= now) {
          completeBuildingUpgrade(building.id)
        }
      })
    }, 1000)
    
    return () => {
      clearInterval(resourceInterval)
      clearInterval(troopInterval)
      clearInterval(buildingInterval)
    }
  }, [updateResources, completeTroopTraining, buildings, completeBuildingUpgrade])
}
