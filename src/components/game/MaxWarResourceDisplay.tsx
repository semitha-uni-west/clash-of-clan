'use client'

import { useMaxWarStore } from '@/lib/maxWarStore'
import { Coins, Wheat, TreePine, Mountain, Users } from 'lucide-react'

export function MaxWarResourceDisplay() {
  const { resources, currentPopulation, populationCap } = useMaxWarStore()
  
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-lg">
        <Coins className="w-5 h-5 text-amber-600" />
        <span className="font-bold text-amber-800">{resources.gold}</span>
      </div>
      
      <div className="flex items-center gap-2 bg-orange-100 px-3 py-2 rounded-lg">
        <Wheat className="w-5 h-5 text-orange-600" />
        <span className="font-bold text-orange-800">{resources.food}</span>
      </div>
      
      <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg">
        <TreePine className="w-5 h-5 text-green-600" />
        <span className="font-bold text-green-800">{resources.wood}</span>
      </div>
      
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Mountain className="w-5 h-5 text-gray-600" />
        <span className="font-bold text-gray-800">{resources.stone}</span>
      </div>
      
      <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-lg">
        <Users className="w-5 h-5 text-purple-600" />
        <span className="font-bold text-purple-800">
          {currentPopulation}/{populationCap}
        </span>
      </div>
    </div>
  )
}
