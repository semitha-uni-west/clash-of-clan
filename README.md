# Game Portal - Strategy Games Collection

A collection of strategy games built with Next.js, TypeScript, TailwindCSS, Three.js, and Zustand.

## 🎮 Games

### MaxWar (NEW!) - 3D Real-Time Strategy
A fully 3D real-time strategy game inspired by Age of Empires, featuring:
- **3D Graphics**: Built with Three.js and React Three Fiber
- **Multiple Difficulty Levels**: Choose from Easy, Medium, Hard, or Extreme
- **Resource Management**: Manage Wood, Food, Gold, and Stone
- **Building System**: Construct Houses, Barracks, Farms, Lumber Mills, Mines, and more
- **Unit Training**: Train Villagers, Soldiers, Archers, and Cavalry
- **Population System**: Build houses to increase population capacity
- **Enemy AI**: Face AI-controlled enemy villages that scale with difficulty
- **Interactive 3D View**: Rotate, zoom, and explore the battlefield

### Clash of Clans (Classic)
A simplified Clash of Clans-style single-player strategy game with 2D gameplay.

## 🎮 Features

- **Village Building**: Build and upgrade buildings including Town Hall, Gold Mines, Elixir Collectors, Army Camps, and Barracks
- **Resource Management**: Collect Gold and Elixir automatically based on building levels
- **Troop Training**: Train Barbarians, Archers, and Giants to build your army
- **Campaign Mode**: Complete 5 missions with increasing difficulty
- **Combat System**: Simplified battle simulation with power calculations
- **Upgrade System**: Unlock new buildings and features as your Town Hall reaches level 5
- **Auto-Save**: All progress is automatically saved to browser localStorage
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/semitha-uni-west/clash-of-clan.git
cd clash-of-clan
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 MaxWar Game Features

### Difficulty Levels
- **Easy**: 150% starting resources, 30% enemy strength
- **Medium**: 100% starting resources, 50% enemy strength  
- **Hard**: 80% starting resources, 70% enemy strength
- **Extreme**: 60% starting resources, 90% enemy strength

### Building Types
- **Town Hall**: The heart of your civilization (starts built)
- **House**: Provides +5 population capacity
- **Barracks**: Required to train military units
- **Farm**: Generates food over time (+1/sec per level)
- **Lumber Mill**: Generates wood over time (+1/sec per level)
- **Mine**: Generates gold and stone (+0.5/sec per level each)
- **Store House**: Increases resource storage capacity
- **Wall**: Defensive structure

### Unit Types
- **Villager**: 40 HP, 2 DMG, gathers resources (costs: 50 food)
- **Soldier**: 100 HP, 15 DMG, basic melee infantry (costs: 60 food, 40 gold)
- **Archer**: 60 HP, 12 DMG, ranged unit with 8 range (costs: 65 food, 25 wood, 45 gold)
- **Cavalry**: 150 HP, 20 DMG, fast and powerful (costs: 100 food, 80 gold)

### Resources
- **Wood**: Used for construction and some units
- **Food**: Required for training all units
- **Gold**: Used for advanced buildings and military units
- **Stone**: Used for defensive structures and buildings

### Gameplay
1. Start by selecting your difficulty level
2. Begin with a Town Hall and starting resources
3. Build resource-generating buildings (Farm, Lumber Mill, Mine)
4. Construct houses to increase population capacity
5. Build a Barracks to train military units
6. Train an army to defend your village and attack enemies
7. Use the 3D view to monitor your village and enemy territory

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with game selection
│   ├── maxwar/            # MaxWar 3D game
│   ├── village/           # Classic Clash game
│   ├── troops/            # Troop training page
│   └── campaign/          # Campaign missions page
├── components/
│   ├── game/              # Game-specific components
│   │   ├── DifficultySelector.tsx
│   │   ├── GameScene.tsx       # 3D scene with Three.js
│   │   ├── Building3D.tsx      # 3D building models
│   │   ├── Unit3D.tsx          # 3D unit models
│   │   ├── Ground.tsx          # 3D terrain
│   │   ├── BuildingPanel.tsx
│   │   ├── UnitTrainingPanel.tsx
│   │   ├── MaxWarResourceDisplay.tsx
│   │   └── ... (Classic game components)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── maxWarStore.ts      # MaxWar Zustand state management
│   ├── maxWarConstants.ts  # MaxWar game configuration
│   ├── gameStore.ts        # Classic game state
│   ├── gameConstants.ts    # Classic game configuration
│   └── utils.ts            # Utility functions
└── hooks/
    ├── useMaxWarGameLoop.ts # MaxWar game loop
    └── useGameLoop.ts       # Classic game loop
```

## 🎯 Classic Clash of Clans Features

- **Village Building**: Build and upgrade buildings including Town Hall, Gold Mines, Elixir Collectors, Army Camps, and Barracks
- **Resource Management**: Collect Gold and Elixir automatically based on building levels
- **Troop Training**: Train Barbarians, Archers, and Giants to build your army
- **Campaign Mode**: Complete 5 missions with increasing difficulty
- **Combat System**: Simplified battle simulation with power calculations
- **Upgrade System**: Unlock new buildings and features as your Town Hall reaches level 5
- **Auto-Save**: All progress is automatically saved to browser localStorage
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technology Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **3D Graphics**: Three.js + React Three Fiber + Drei (for MaxWar)
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components inspired by shadcn/ui

## 🔮 Future Enhancements

### MaxWar Potential Features
- **Advanced AI**: Smarter enemy behavior and tactics
- **Multiplayer**: PvP battles and cooperative gameplay
- **More Units**: Siege weapons, special units, heroes
- **Technology Tree**: Research upgrades and improvements
- **Diplomacy**: Alliances and trade systems
- **Day/Night Cycle**: Dynamic lighting and gameplay changes
- **Weather System**: Environmental effects on battles
- **Sound & Music**: Immersive audio experience
- **Achievements**: Track player accomplishments
- **Replay System**: Watch and share battles

### Classic Mode Enhancements
- **Defense System**: Add defensive buildings (Cannons, Archer Towers, Walls)
- **More Troops**: Add spell units, healers, dragons
- **Multiplayer**: Add PvP battles and leaderboards
- **Clan System**: Create and join clans
- **Advanced Combat**: Real-time troop deployment with AI pathfinding
- **Sound Effects**: Add audio feedback for actions

## 💾 Data Persistence

Both games use Zustand's persist middleware with localStorage:
- Automatic saving on every state change
- Data survives browser refresh
- No backend required - fully client-side
- Separate storage for each game mode

## 🎨 Design Philosophy

- **Modern UI**: Clean, card-based layout with clear information hierarchy
- **Responsive**: Mobile-first design with breakpoints
- **Animations**: Smooth transitions using Framer Motion
- **Accessible**: Clear typography and color contrast
- **3D Immersion**: Interactive 3D graphics for MaxWar
- **Color Coding**: Blue for player, Red for enemy
- **Visual Feedback**: Health bars, construction indicators, resource displays

## 📝 Development Notes

### Adding New Buildings (MaxWar)
1. Add building type to `MaxWarBuildingType` in `maxWarStore.ts`
2. Define costs in `BUILDING_COSTS` in `maxWarConstants.ts`
3. Set construction time in `BUILDING_CONSTRUCTION_TIME`
4. Add health values in `BUILDING_HEALTH`
5. Add display name and description to `BUILDING_NAMES` and `BUILDING_DESCRIPTIONS`
6. Update 3D model in `Building3D.tsx`

### Adding New Units (MaxWar)
1. Add unit type to `UnitType` in `maxWarStore.ts`
2. Define costs and training time in `UNIT_COSTS`
3. Add stats to `UNIT_STATS`
4. Update 3D model in `Unit3D.tsx`

### Modifying Game Balance (MaxWar)
Edit values in `src/lib/maxWarConstants.ts`:
- Adjust resource generation rates
- Change construction costs and times
- Modify unit stats
- Tune difficulty settings

### Classic Game Modifications
Edit values in `src/lib/gameConstants.ts`:
- Adjust resource generation rates
- Change upgrade costs and times
- Modify troop stats
- Tune combat power calculations

## 🐛 Known Limitations

### MaxWar
- 3D scene performance may vary on lower-end devices
- Units don't move autonomously yet (planned for future)
- Enemy AI is basic (will be enhanced)
- No real-time combat yet (turn-based planning)

### Classic Mode
- Single-player only (no multiplayer)
- Simplified combat (no real-time battles)
- Limited building placement (no drag-and-drop)
- No visual representations of battles
- Browser storage only (no cloud sync)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## ⭐ Acknowledgments

Inspired by Supercell's Clash of Clans game mechanics and design.
