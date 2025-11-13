import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Building types
export type BuildingType = 'townhall' | 'goldmine' | 'elixircollector' | 'armycamp' | 'barracks'

export interface Building {
  id: string
  type: BuildingType
  level: number
  x: number
  y: number
  isUpgrading: boolean
  upgradeEndTime?: number
}

// Troop types
export type TroopType = 'barbarian' | 'archer' | 'giant'

export interface Troop {
  type: TroopType
  count: number
}

// Mission/Campaign types
export interface Mission {
  id: number
  name: string
  difficulty: number
  goldReward: number
  elixirReward: number
  completed: boolean
  enemyBuildings: { type: BuildingType; level: number }[]
}

// Game state interface
interface GameState {
  // Resources
  gold: number
  elixir: number
  
  // Village
  townHallLevel: number
  buildings: Building[]
  
  // Troops
  troops: Troop[]
  trainingQueue: { type: TroopType; endTime: number }[]
  
  // Campaign
  missions: Mission[]
  
  // Last resource update timestamp
  lastUpdate: number
  
  // Actions
  addGold: (amount: number) => void
  addElixir: (amount: number) => void
  spendGold: (amount: number) => boolean
  spendElixir: (amount: number) => boolean
  
  // Building actions
  addBuilding: (building: Building) => void
  upgradeBuilding: (buildingId: string) => void
  completeBuildingUpgrade: (buildingId: string) => void
  
  // Troop actions
  trainTroop: (type: TroopType, duration: number) => void
  completeTroopTraining: () => void
  deployTroops: (troops: Troop[]) => void
  
  // Campaign actions
  completeMission: (missionId: number) => void
  
  // Resource generation
  updateResources: () => void
  
  // Reset game
  resetGame: () => void
}

// Initial state
const initialState = {
  gold: 500,
  elixir: 500,
  townHallLevel: 1,
  buildings: [
    {
      id: 'th-1',
      type: 'townhall' as BuildingType,
      level: 1,
      x: 5,
      y: 5,
      isUpgrading: false
    }
  ],
  troops: [],
  trainingQueue: [],
  missions: [
    {
      id: 1,
      name: 'Tutorial Village',
      difficulty: 1,
      goldReward: 100,
      elixirReward: 100,
      completed: false,
      enemyBuildings: [
        { type: 'townhall' as BuildingType, level: 1 },
        { type: 'goldmine' as BuildingType, level: 1 }
      ]
    },
    {
      id: 2,
      name: 'Goblin Outpost',
      difficulty: 2,
      goldReward: 200,
      elixirReward: 200,
      completed: false,
      enemyBuildings: [
        { type: 'townhall' as BuildingType, level: 2 },
        { type: 'goldmine' as BuildingType, level: 2 },
        { type: 'elixircollector' as BuildingType, level: 1 }
      ]
    },
    {
      id: 3,
      name: 'Barbarian Camp',
      difficulty: 3,
      goldReward: 300,
      elixirReward: 300,
      completed: false,
      enemyBuildings: [
        { type: 'townhall' as BuildingType, level: 3 },
        { type: 'goldmine' as BuildingType, level: 2 },
        { type: 'elixircollector' as BuildingType, level: 2 },
        { type: 'barracks' as BuildingType, level: 1 }
      ]
    },
    {
      id: 4,
      name: 'Giant Stronghold',
      difficulty: 4,
      goldReward: 500,
      elixirReward: 500,
      completed: false,
      enemyBuildings: [
        { type: 'townhall' as BuildingType, level: 4 },
        { type: 'goldmine' as BuildingType, level: 3 },
        { type: 'elixircollector' as BuildingType, level: 3 },
        { type: 'barracks' as BuildingType, level: 2 },
        { type: 'armycamp' as BuildingType, level: 2 }
      ]
    },
    {
      id: 5,
      name: 'Dragon Fortress',
      difficulty: 5,
      goldReward: 1000,
      elixirReward: 1000,
      completed: false,
      enemyBuildings: [
        { type: 'townhall' as BuildingType, level: 5 },
        { type: 'goldmine' as BuildingType, level: 4 },
        { type: 'elixircollector' as BuildingType, level: 4 },
        { type: 'barracks' as BuildingType, level: 3 },
        { type: 'armycamp' as BuildingType, level: 3 }
      ]
    }
  ],
  lastUpdate: Date.now()
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      addGold: (amount) => set((state) => ({ gold: state.gold + amount })),
      addElixir: (amount) => set((state) => ({ elixir: state.elixir + amount })),
      
      spendGold: (amount) => {
        const state = get()
        if (state.gold >= amount) {
          set({ gold: state.gold - amount })
          return true
        }
        return false
      },
      
      spendElixir: (amount) => {
        const state = get()
        if (state.elixir >= amount) {
          set({ elixir: state.elixir - amount })
          return true
        }
        return false
      },
      
      addBuilding: (building) => set((state) => ({
        buildings: [...state.buildings, building]
      })),
      
      upgradeBuilding: (buildingId) => set((state) => ({
        buildings: state.buildings.map(b => 
          b.id === buildingId 
            ? { ...b, isUpgrading: true, upgradeEndTime: Date.now() + 60000 } // 1 minute upgrade
            : b
        )
      })),
      
      completeBuildingUpgrade: (buildingId) => set((state) => {
        const buildings = state.buildings.map(b => 
          b.id === buildingId 
            ? { ...b, level: b.level + 1, isUpgrading: false, upgradeEndTime: undefined }
            : b
        )
        
        // Update town hall level if town hall was upgraded
        const townHall = buildings.find(b => b.type === 'townhall' && b.id === buildingId)
        const townHallLevel = townHall ? townHall.level : state.townHallLevel
        
        return { buildings, townHallLevel }
      }),
      
      trainTroop: (type, duration) => set((state) => ({
        trainingQueue: [...state.trainingQueue, { type, endTime: Date.now() + duration }]
      })),
      
      completeTroopTraining: () => set((state) => {
        const now = Date.now()
        const completed = state.trainingQueue.filter(t => t.endTime <= now)
        const remaining = state.trainingQueue.filter(t => t.endTime > now)
        
        // Add completed troops to inventory
        const troopCounts: Record<TroopType, number> = { barbarian: 0, archer: 0, giant: 0 }
        completed.forEach(t => troopCounts[t.type]++)
        
        const updatedTroops = [...state.troops]
        Object.entries(troopCounts).forEach(([type, count]) => {
          if (count > 0) {
            const existingTroop = updatedTroops.find(t => t.type === type as TroopType)
            if (existingTroop) {
              existingTroop.count += count
            } else {
              updatedTroops.push({ type: type as TroopType, count })
            }
          }
        })
        
        return { troops: updatedTroops, trainingQueue: remaining }
      }),
      
      deployTroops: (troops) => set((state) => {
        const updatedTroops = [...state.troops]
        troops.forEach(deployedTroop => {
          const troopIndex = updatedTroops.findIndex(t => t.type === deployedTroop.type)
          if (troopIndex !== -1) {
            updatedTroops[troopIndex].count -= deployedTroop.count
            if (updatedTroops[troopIndex].count <= 0) {
              updatedTroops.splice(troopIndex, 1)
            }
          }
        })
        return { troops: updatedTroops }
      }),
      
      completeMission: (missionId) => set((state) => ({
        missions: state.missions.map(m => 
          m.id === missionId ? { ...m, completed: true } : m
        )
      })),
      
      updateResources: () => set((state) => {
        const now = Date.now()
        const timeDiff = (now - state.lastUpdate) / 1000 // seconds
        
        // Calculate resource generation
        let goldPerSecond = 0
        let elixirPerSecond = 0
        
        state.buildings.forEach(building => {
          if (building.type === 'goldmine') {
            goldPerSecond += building.level * 0.5 // 0.5 gold per second per level
          } else if (building.type === 'elixircollector') {
            elixirPerSecond += building.level * 0.5 // 0.5 elixir per second per level
          }
        })
        
        const goldGenerated = Math.floor(goldPerSecond * timeDiff)
        const elixirGenerated = Math.floor(elixirPerSecond * timeDiff)
        
        return {
          gold: state.gold + goldGenerated,
          elixir: state.elixir + elixirGenerated,
          lastUpdate: now
        }
      }),
      
      resetGame: () => set(initialState)
    }),
    {
      name: 'clash-game-storage'
    }
  )
)
