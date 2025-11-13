'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useMaxWarStore, DifficultyLevel } from '@/lib/maxWarStore'
import { DIFFICULTY_SETTINGS } from '@/lib/maxWarConstants'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Shield, Swords, Skull, Flame } from 'lucide-react'

const difficultyIcons = {
  easy: Shield,
  medium: Swords,
  hard: Skull,
  extreme: Flame
}

const difficultyColors = {
  easy: 'from-green-500 to-emerald-600',
  medium: 'from-blue-500 to-indigo-600',
  hard: 'from-orange-500 to-red-600',
  extreme: 'from-red-600 to-purple-600'
}

export function DifficultySelector() {
  const router = useRouter()
  const { setDifficulty, startGame } = useMaxWarStore()
  
  const handleDifficultySelect = (difficulty: DifficultyLevel) => {
    setDifficulty(difficulty)
    startGame()
    router.push('/maxwar')
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full"
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            MaxWar
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Choose Your Difficulty
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(DIFFICULTY_SETTINGS) as DifficultyLevel[]).map((difficulty, idx) => {
            const Icon = difficultyIcons[difficulty]
            const settings = DIFFICULTY_SETTINGS[difficulty]
            const colorClass = difficultyColors[difficulty]
            
            return (
              <motion.div
                key={difficulty}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer h-full"
                  onClick={() => handleDifficultySelect(difficulty)}
                >
                  <div className={`bg-gradient-to-br ${colorClass} p-4 rounded-lg mb-4`}>
                    <Icon className="w-12 h-12 text-white mx-auto" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                    {settings.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 text-center min-h-[60px]">
                    {settings.description}
                  </p>
                  
                  <div className="space-y-2 text-xs text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>Starting Resources:</span>
                      <span className="font-semibold">
                        {Math.floor(settings.playerResourceMultiplier * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enemy Strength:</span>
                      <span className="font-semibold">
                        {Math.floor(settings.enemyAggressiveness * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    Select
                  </Button>
                </Card>
              </motion.div>
            )
          })}
        </div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50">
            <h3 className="font-bold text-gray-800 mb-2">Game Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>✓ 3D Graphics</div>
              <div>✓ Real-time Strategy</div>
              <div>✓ Resource Management</div>
              <div>✓ Unit Training</div>
              <div>✓ Building Construction</div>
              <div>✓ Enemy AI</div>
              <div>✓ Population System</div>
              <div>✓ Epic Battles</div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
