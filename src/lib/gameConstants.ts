import { BuildingType, TroopType } from './gameStore'

// Building upgrade costs (gold, elixir)
export const BUILDING_COSTS: Record<BuildingType, { gold: number; elixir: number }[]> = {
  townhall: [
    { gold: 0, elixir: 0 },      // Level 1 (initial)
    { gold: 1000, elixir: 0 },   // Level 2
    { gold: 2500, elixir: 0 },   // Level 3
    { gold: 5000, elixir: 0 },   // Level 4
    { gold: 10000, elixir: 0 },  // Level 5
  ],
  goldmine: [
    { gold: 150, elixir: 0 },    // Level 1
    { gold: 300, elixir: 0 },    // Level 2
    { gold: 600, elixir: 0 },    // Level 3
    { gold: 1200, elixir: 0 },   // Level 4
    { gold: 2400, elixir: 0 },   // Level 5
  ],
  elixircollector: [
    { gold: 0, elixir: 150 },    // Level 1
    { gold: 0, elixir: 300 },    // Level 2
    { gold: 0, elixir: 600 },    // Level 3
    { gold: 0, elixir: 1200 },   // Level 4
    { gold: 0, elixir: 2400 },   // Level 5
  ],
  armycamp: [
    { gold: 250, elixir: 0 },    // Level 1
    { gold: 500, elixir: 0 },    // Level 2
    { gold: 1000, elixir: 0 },   // Level 3
    { gold: 2000, elixir: 0 },   // Level 4
    { gold: 4000, elixir: 0 },   // Level 5
  ],
  barracks: [
    { gold: 200, elixir: 0 },    // Level 1
    { gold: 400, elixir: 0 },    // Level 2
    { gold: 800, elixir: 0 },    // Level 3
    { gold: 1600, elixir: 0 },   // Level 4
    { gold: 3200, elixir: 0 },   // Level 5
  ],
}

// Building upgrade times (in seconds)
export const BUILDING_UPGRADE_TIME: Record<BuildingType, number[]> = {
  townhall: [0, 120, 180, 240, 300],      // 2-5 minutes
  goldmine: [30, 60, 90, 120, 150],       // 30s-2.5 minutes
  elixircollector: [30, 60, 90, 120, 150],
  armycamp: [60, 90, 120, 150, 180],      // 1-3 minutes
  barracks: [60, 90, 120, 150, 180],
}

// Troop training costs and times
export const TROOP_COSTS: Record<TroopType, { elixir: number; time: number }> = {
  barbarian: { elixir: 25, time: 20 },   // 20 seconds
  archer: { elixir: 50, time: 25 },       // 25 seconds
  giant: { elixir: 250, time: 120 },      // 2 minutes
}

// Building display names
export const BUILDING_NAMES: Record<BuildingType, string> = {
  townhall: 'Town Hall',
  goldmine: 'Gold Mine',
  elixircollector: 'Elixir Collector',
  armycamp: 'Army Camp',
  barracks: 'Barracks',
}

// Troop display names
export const TROOP_NAMES: Record<TroopType, string> = {
  barbarian: 'Barbarian',
  archer: 'Archer',
  giant: 'Giant',
}

// Troop stats for combat
export const TROOP_STATS: Record<TroopType, { hp: number; damage: number; speed: number }> = {
  barbarian: { hp: 45, damage: 8, speed: 16 },
  archer: { hp: 20, damage: 7, speed: 24 },
  giant: { hp: 300, damage: 11, speed: 12 },
}

// Building requirements (minimum town hall level)
export const BUILDING_REQUIREMENTS: Record<BuildingType, number> = {
  townhall: 1,
  goldmine: 1,
  elixircollector: 1,
  armycamp: 2,
  barracks: 2,
}

// Max buildings per type (based on town hall level)
export const MAX_BUILDINGS: Record<BuildingType, number[]> = {
  townhall: [1, 1, 1, 1, 1],              // Always 1
  goldmine: [1, 2, 3, 4, 5],              // Increases with TH level
  elixircollector: [1, 2, 3, 4, 5],
  armycamp: [0, 1, 2, 3, 4],              // Unlocked at TH 2
  barracks: [0, 1, 2, 2, 3],              // Unlocked at TH 2
}

// Helper function to get upgrade cost
export function getUpgradeCost(type: BuildingType, currentLevel: number): { gold: number; elixir: number } | null {
  const costs = BUILDING_COSTS[type]
  if (currentLevel >= costs.length) return null
  return costs[currentLevel]
}

// Helper function to get upgrade time
export function getUpgradeTime(type: BuildingType, currentLevel: number): number | null {
  const times = BUILDING_UPGRADE_TIME[type]
  if (currentLevel >= times.length) return null
  return times[currentLevel]
}

// Helper function to check if building can be built
export function canBuildBuilding(type: BuildingType, townHallLevel: number, currentCount: number): boolean {
  // Check town hall requirement
  if (townHallLevel < BUILDING_REQUIREMENTS[type]) return false
  
  // Check max buildings limit
  const maxAllowed = MAX_BUILDINGS[type][townHallLevel - 1]
  return currentCount < maxAllowed
}
