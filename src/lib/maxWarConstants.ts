import { MaxWarBuildingType, UnitType, Resources } from './maxWarStore'

// Building costs
export const BUILDING_COSTS: Record<MaxWarBuildingType, Resources> = {
  townhall: { wood: 0, food: 0, gold: 0, stone: 0 }, // Already built
  house: { wood: 50, food: 0, gold: 0, stone: 30 },
  barracks: { wood: 100, food: 0, gold: 50, stone: 50 },
  farm: { wood: 80, food: 0, gold: 0, stone: 20 },
  lumbermill: { wood: 60, food: 0, gold: 30, stone: 40 },
  mine: { wood: 100, food: 0, gold: 0, stone: 80 },
  storehouse: { wood: 120, food: 0, gold: 40, stone: 60 },
  wall: { wood: 10, food: 0, gold: 0, stone: 20 }
}

// Building construction times (in seconds)
export const BUILDING_CONSTRUCTION_TIME: Record<MaxWarBuildingType, number> = {
  townhall: 0,
  house: 30,
  barracks: 60,
  farm: 40,
  lumbermill: 45,
  mine: 50,
  storehouse: 35,
  wall: 10
}

// Building health
export const BUILDING_HEALTH: Record<MaxWarBuildingType, number> = {
  townhall: 1000,
  house: 500,
  barracks: 800,
  farm: 400,
  lumbermill: 600,
  mine: 700,
  storehouse: 600,
  wall: 300
}

// Building names
export const BUILDING_NAMES: Record<MaxWarBuildingType, string> = {
  townhall: 'Town Hall',
  house: 'House',
  barracks: 'Barracks',
  farm: 'Farm',
  lumbermill: 'Lumber Mill',
  mine: 'Mine',
  storehouse: 'Store House',
  wall: 'Wall'
}

// Building descriptions
export const BUILDING_DESCRIPTIONS: Record<MaxWarBuildingType, string> = {
  townhall: 'The heart of your civilization. Protects your people.',
  house: 'Provides housing for your population. +5 population capacity.',
  barracks: 'Train military units to defend and attack.',
  farm: 'Produces food over time. +1 food/second per level.',
  lumbermill: 'Produces wood over time. +1 wood/second per level.',
  mine: 'Produces gold and stone. +0.5 gold & stone/second per level.',
  storehouse: 'Stores resources and increases capacity.',
  wall: 'Defensive structure to protect your village.'
}

// Unit costs and training time
export const UNIT_COSTS: Record<UnitType, Resources & { time: number }> = {
  villager: { wood: 0, food: 50, gold: 0, stone: 0, time: 25 },
  soldier: { wood: 0, food: 60, gold: 40, stone: 0, time: 30 },
  archer: { wood: 25, food: 65, gold: 45, stone: 0, time: 35 },
  cavalry: { wood: 0, food: 100, gold: 80, stone: 0, time: 60 }
}

// Unit stats
export const UNIT_STATS: Record<UnitType, { 
  health: number
  damage: number
  speed: number
  range: number
  description: string
}> = {
  villager: {
    health: 40,
    damage: 2,
    speed: 1.5,
    range: 1,
    description: 'Gathers resources and constructs buildings.'
  },
  soldier: {
    health: 100,
    damage: 15,
    speed: 1.2,
    range: 1.5,
    description: 'Basic melee infantry unit with balanced stats.'
  },
  archer: {
    health: 60,
    damage: 12,
    speed: 1.3,
    range: 8,
    description: 'Ranged unit that attacks from a distance.'
  },
  cavalry: {
    health: 150,
    damage: 20,
    speed: 2.0,
    range: 1.5,
    description: 'Fast and powerful mounted unit.'
  }
}

// Unit names
export const UNIT_NAMES: Record<UnitType, string> = {
  villager: 'Villager',
  soldier: 'Soldier',
  archer: 'Archer',
  cavalry: 'Cavalry'
}

// Difficulty settings
export const DIFFICULTY_SETTINGS = {
  easy: {
    name: 'Easy',
    description: 'Relaxed gameplay with more resources and weaker enemies.',
    enemyAggressiveness: 0.3,
    enemyProductionSpeed: 1.5,
    playerResourceMultiplier: 1.5
  },
  medium: {
    name: 'Medium',
    description: 'Balanced challenge for most players.',
    enemyAggressiveness: 0.5,
    enemyProductionSpeed: 1.0,
    playerResourceMultiplier: 1.0
  },
  hard: {
    name: 'Hard',
    description: 'Difficult battles requiring strategy and planning.',
    enemyAggressiveness: 0.7,
    enemyProductionSpeed: 0.8,
    playerResourceMultiplier: 0.8
  },
  extreme: {
    name: 'Extreme',
    description: 'Only for the most skilled commanders!',
    enemyAggressiveness: 0.9,
    enemyProductionSpeed: 0.6,
    playerResourceMultiplier: 0.6
  }
}
