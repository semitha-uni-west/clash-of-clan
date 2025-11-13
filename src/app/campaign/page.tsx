'use client'

import { CampaignMode } from '@/components/game/CampaignMode'
import { ResourceDisplay } from '@/components/game/ResourceDisplay'
import { useGameLoop } from '@/hooks/useGameLoop'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Building, Users, Trophy } from 'lucide-react'

export default function CampaignPage() {
  useGameLoop()
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Campaign</h1>
                <p className="text-gray-600">Conquer enemy bases</p>
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
            <Link href="/village">
              <Button variant="outline" size="sm">
                <Building className="w-4 h-4 mr-2" />
                Village
              </Button>
            </Link>
            <Link href="/troops">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Train Troops
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Campaign Mode */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <CampaignMode />
        </div>
      </div>
    </div>
  )
}
