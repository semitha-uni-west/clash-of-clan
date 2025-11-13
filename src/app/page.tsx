'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Sword, Trophy, Users, Building, Flame } from 'lucide-react'
import { DifficultySelector } from '@/components/game/DifficultySelector'
import { useState } from 'react'

export default function Home() {
  const [showMaxWar, setShowMaxWar] = useState(false)
  
  if (showMaxWar) {
    return <DifficultySelector />
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <motion.h1 
              className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Game Portal
            </motion.h1>
            <motion.p 
              className="text-gray-600 text-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Choose Your Adventure!
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg">
              <Building className="w-8 h-8 mx-auto mb-2 text-yellow-700" />
              <div className="text-sm font-semibold text-yellow-800">Build</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-700" />
              <div className="text-sm font-semibold text-blue-800">Train</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
              <Sword className="w-8 h-8 mx-auto mb-2 text-red-700" />
              <div className="text-sm font-semibold text-red-800">Attack</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-700" />
              <div className="text-sm font-semibold text-purple-800">Win</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* MaxWar - New 3D Game */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-xl border-2 border-orange-300">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="w-10 h-10 text-orange-600" />
                <div>
                  <h2 className="text-2xl font-bold text-orange-800">MaxWar</h2>
                  <p className="text-sm text-orange-600">3D Real-Time Strategy</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Build your empire, train armies, and conquer enemies in stunning 3D! 
                Inspired by Age of Empires with multiple difficulty levels.
              </p>
              <Button 
                onClick={() => setShowMaxWar(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                size="lg"
              >
                Play MaxWar (NEW!)
              </Button>
            </div>
            
            {/* Original Clash of Clans */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-800 mb-2">Classic Clash of Clans</h3>
              <p className="text-xs text-gray-600 mb-3">
                The original 2D strategy game with campaign missions
              </p>
              <Link href="/village" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Play Classic Mode
                </Button>
              </Link>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              Your progress is automatically saved
            </div>
          </motion.div>
          
          <motion.div
            className="border-t pt-4 space-y-2 text-sm text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="font-semibold text-center">MaxWar Features:</div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <li>✓ Full 3D Graphics with Three.js</li>
              <li>✓ Real-time strategy gameplay</li>
              <li>✓ 4 Difficulty levels</li>
              <li>✓ Build houses, barracks, farms & more</li>
              <li>✓ Train soldiers, archers & cavalry</li>
              <li>✓ Enemy AI and battles</li>
              <li>✓ Resource management system</li>
              <li>✓ Population mechanics</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
