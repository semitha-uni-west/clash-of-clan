'use client'

import { VillageGrid } from '@/components/game/VillageGrid'
import { ResourceDisplay } from '@/components/game/ResourceDisplay'
import { useGameLoop } from '@/hooks/useGameLoop'
import { useGameStore } from '@/lib/gameStore'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Users, Trophy, Crown } from 'lucide-react'

export default function VillagePage() {
  useGameLoop()
  const { townHallLevel } = useGameStore()
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Village</h1>
                <p className="text-gray-600">Town Hall Level {townHallLevel}</p>
              </div>
            </div>
            <ResourceDisplay />
          </div>
          
          {/* Navigation */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/troops">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Train Troops
              </Button>
            </Link>
            <Link href="/campaign">
              <Button variant="outline" size="sm">
                <Trophy className="w-4 h-4 mr-2" />
                Campaign
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Village Grid */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <VillageGrid />
        </div>
      </div>
    </div>
  )
}
