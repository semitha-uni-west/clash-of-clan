import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Difficulty levels
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'extreme'

// Building types for MaxWar
export type MaxWarBuildingType = 
  | 'townhall' 
  | 'house' 
  | 'barracks' 
  | 'farm'
  | 'lumbermill'
  | 'mine'
  | 'storehouse'
  | 'wall'

// Unit types
export type UnitType = 'soldier' | 'archer' | 'cavalry' | 'villager'

// Resource types
export interface Resources {
  wood: number
  food: number
  gold: number
  stone: number
}

// Building interface
export interface MaxWarBuilding {
  id: string
  type: MaxWarBuildingType
  level: number
  position: [number, number, number] // x, y, z
  owner: 'player' | 'enemy'
  health: number
  maxHealth: number
  isConstructing: boolean
  constructionEndTime?: number
}

// Unit interface
export interface Unit {
  id: string
  type: UnitType
  position: [number, number, number]
  owner: 'player' | 'enemy'
  health: number
  maxHealth: number
  target?: string // target unit/building id
}

// Game state
interface MaxWarGameState {
  // Game settings
  difficulty: DifficultyLevel | null
  gameStarted: boolean
  
  // Resources
  resources: Resources
  populationCap: number
  currentPopulation: number
  
  // Buildings
  playerBuildings: MaxWarBuilding[]
  enemyBuildings: MaxWarBuilding[]
  
  // Units
  playerUnits: Unit[]
  enemyUnits: Unit[]
  
  // Training queue
  trainingQueue: { type: UnitType; endTime: number }[]
  
  // Time tracking
  lastUpdate: number
  
  // Actions
  setDifficulty: (difficulty: DifficultyLevel) => void
  startGame: () => void
  resetGame: () => void
  
  // Resource actions
  addResources: (resources: Partial<Resources>) => void
  spendResources: (resources: Partial<Resources>) => boolean
  
  // Building actions
  addBuilding: (building: MaxWarBuilding) => void
  removeBuilding: (buildingId: string) => void
  upgradeBuildingHealth: (buildingId: string, amount: number) => void
  
  // Unit actions
  trainUnit: (type: UnitType, duration: number) => void
  completeUnitTraining: () => void
  addUnit: (unit: Unit) => void
  removeUnit: (unitId: string) => void
  moveUnit: (unitId: string, position: [number, number, number]) => void
  
  // Update loop
  updateGame: () => void
}

// Initial resources
const getInitialResources = (difficulty: DifficultyLevel): Resources => {
  const resourceMap = {
    easy: { wood: 500, food: 500, gold: 300, stone: 200 },
    medium: { wood: 300, food: 300, gold: 200, stone: 100 },
    hard: { wood: 200, food: 200, gold: 100, stone: 50 },
    extreme: { wood: 100, food: 100, gold: 50, stone: 25 }
  }
  return resourceMap[difficulty]
}

// Create enemy village based on difficulty
const createEnemyVillage = (difficulty: DifficultyLevel): MaxWarBuilding[] => {
  const baseBuildings: MaxWarBuilding[] = [
    {
      id: 'enemy-townhall',
      type: 'townhall',
      level: 1,
      position: [40, 0, -40],
      owner: 'enemy',
      health: 1000,
      maxHealth: 1000,
      isConstructing: false
    }
  ]
  
  // Add more buildings based on difficulty
  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2,
    extreme: 3
  }[difficulty]
  
  const numHouses = Math.floor(2 * difficultyMultiplier)
  const numBarracks = Math.floor(1 * difficultyMultiplier)
  
  for (let i = 0; i < numHouses; i++) {
    baseBuildings.push({
      id: `enemy-house-${i}`,
      type: 'house',
      level: 1,
      position: [35 + i * 5, 0, -35],
      owner: 'enemy',
      health: 500,
      maxHealth: 500,
      isConstructing: false
    })
  }
  
  for (let i = 0; i < numBarracks; i++) {
    baseBuildings.push({
      id: `enemy-barracks-${i}`,
      type: 'barracks',
      level: 1,
      position: [45 + i * 5, 0, -45],
      owner: 'enemy',
      health: 800,
      maxHealth: 800,
      isConstructing: false
    })
  }
  
  return baseBuildings
}

// Initial state
const initialState = {
  difficulty: null,
  gameStarted: false,
  resources: { wood: 0, food: 0, gold: 0, stone: 0 },
  populationCap: 5,
  currentPopulation: 0,
  playerBuildings: [],
  enemyBuildings: [],
  playerUnits: [],
  enemyUnits: [],
  trainingQueue: [],
  lastUpdate: Date.now()
}

export const useMaxWarStore = create<MaxWarGameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setDifficulty: (difficulty) => set({ difficulty }),
      
      startGame: () => {
        const state = get()
        if (!state.difficulty) return
        
        const resources = getInitialResources(state.difficulty)
        const enemyBuildings = createEnemyVillage(state.difficulty)
        
        // Create player starting buildings
        const playerBuildings: MaxWarBuilding[] = [
          {
            id: 'player-townhall',
            type: 'townhall',
            level: 1,
            position: [0, 0, 0],
            owner: 'player',
            health: 1000,
            maxHealth: 1000,
            isConstructing: false
          }
        ]
        
        set({
          gameStarted: true,
          resources,
          playerBuildings,
          enemyBuildings,
          lastUpdate: Date.now()
        })
      },
      
      resetGame: () => set(initialState),
      
      addResources: (newResources) => set((state) => ({
        resources: {
          wood: state.resources.wood + (newResources.wood || 0),
          food: state.resources.food + (newResources.food || 0),
          gold: state.resources.gold + (newResources.gold || 0),
          stone: state.resources.stone + (newResources.stone || 0)
        }
      })),
      
      spendResources: (cost) => {
        const state = get()
        const canAfford = 
          (state.resources.wood >= (cost.wood || 0)) &&
          (state.resources.food >= (cost.food || 0)) &&
          (state.resources.gold >= (cost.gold || 0)) &&
          (state.resources.stone >= (cost.stone || 0))
        
        if (canAfford) {
          set({
            resources: {
              wood: state.resources.wood - (cost.wood || 0),
              food: state.resources.food - (cost.food || 0),
              gold: state.resources.gold - (cost.gold || 0),
              stone: state.resources.stone - (cost.stone || 0)
            }
          })
          return true
        }
        return false
      },
      
      addBuilding: (building) => set((state) => {
        const buildings = building.owner === 'player' 
          ? [...state.playerBuildings, building]
          : [...state.enemyBuildings, building]
        
        // Update population cap if it's a house
        let newPopCap = state.populationCap
        if (building.type === 'house' && building.owner === 'player') {
          newPopCap += 5
        }
        
        return building.owner === 'player'
          ? { playerBuildings: buildings, populationCap: newPopCap }
          : { enemyBuildings: buildings }
      }),
      
      removeBuilding: (buildingId) => set((state) => {
        const isPlayer = state.playerBuildings.some(b => b.id === buildingId)
        
        if (isPlayer) {
          const building = state.playerBuildings.find(b => b.id === buildingId)
          let newPopCap = state.populationCap
          if (building && building.type === 'house') {
            newPopCap = Math.max(5, newPopCap - 5)
          }
          
          return {
            playerBuildings: state.playerBuildings.filter(b => b.id !== buildingId),
            populationCap: newPopCap
          }
        } else {
          return {
            enemyBuildings: state.enemyBuildings.filter(b => b.id !== buildingId)
          }
        }
      }),
      
      upgradeBuildingHealth: (buildingId, amount) => set((state) => {
        const updateBuilding = (building: MaxWarBuilding) => 
          building.id === buildingId 
            ? { ...building, health: Math.min(building.maxHealth, building.health + amount) }
            : building
        
        return {
          playerBuildings: state.playerBuildings.map(updateBuilding),
          enemyBuildings: state.enemyBuildings.map(updateBuilding)
        }
      }),
      
      trainUnit: (type, duration) => set((state) => ({
        trainingQueue: [...state.trainingQueue, { type, endTime: Date.now() + duration }]
      })),
      
      completeUnitTraining: () => set((state) => {
        const now = Date.now()
        const completed = state.trainingQueue.filter(t => t.endTime <= now)
        const remaining = state.trainingQueue.filter(t => t.endTime > now)
        
        const newUnits: Unit[] = []
        completed.forEach((training, idx) => {
          const unit: Unit = {
            id: `player-unit-${now}-${idx}`,
            type: training.type,
            position: [5, 0, 5],
            owner: 'player',
            health: 100,
            maxHealth: 100
          }
          newUnits.push(unit)
        })
        
        return {
          playerUnits: [...state.playerUnits, ...newUnits],
          trainingQueue: remaining,
          currentPopulation: state.currentPopulation + completed.length
        }
      }),
      
      addUnit: (unit) => set((state) => {
        const units = unit.owner === 'player'
          ? [...state.playerUnits, unit]
          : [...state.enemyUnits, unit]
        
        return unit.owner === 'player'
          ? { playerUnits: units, currentPopulation: state.currentPopulation + 1 }
          : { enemyUnits: units }
      }),
      
      removeUnit: (unitId) => set((state) => {
        const isPlayer = state.playerUnits.some(u => u.id === unitId)
        
        return isPlayer
          ? { 
              playerUnits: state.playerUnits.filter(u => u.id !== unitId),
              currentPopulation: Math.max(0, state.currentPopulation - 1)
            }
          : { enemyUnits: state.enemyUnits.filter(u => u.id !== unitId) }
      }),
      
      moveUnit: (unitId, position) => set((state) => ({
        playerUnits: state.playerUnits.map(u =>
          u.id === unitId ? { ...u, position } : u
        ),
        enemyUnits: state.enemyUnits.map(u =>
          u.id === unitId ? { ...u, position } : u
        )
      })),
      
      updateGame: () => set((state) => {
        const now = Date.now()
        const timeDiff = (now - state.lastUpdate) / 1000 // seconds
        
        // Resource generation from buildings
        let woodPerSecond = 0
        let foodPerSecond = 0
        let goldPerSecond = 0
        let stonePerSecond = 0
        
        state.playerBuildings.forEach(building => {
          if (!building.isConstructing) {
            switch (building.type) {
              case 'lumbermill':
                woodPerSecond += building.level * 1
                break
              case 'farm':
                foodPerSecond += building.level * 1
                break
              case 'mine':
                goldPerSecond += building.level * 0.5
                stonePerSecond += building.level * 0.5
                break
            }
          }
        })
        
        const newResources = {
          wood: state.resources.wood + Math.floor(woodPerSecond * timeDiff),
          food: state.resources.food + Math.floor(foodPerSecond * timeDiff),
          gold: state.resources.gold + Math.floor(goldPerSecond * timeDiff),
          stone: state.resources.stone + Math.floor(stonePerSecond * timeDiff)
        }
        
        return {
          resources: newResources,
          lastUpdate: now
        }
      })
    }),
    {
      name: 'maxwar-game-storage'
    }
  )
)
