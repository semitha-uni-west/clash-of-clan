'use client'

import { useGameStore } from '@/lib/gameStore'
import { Coins, Droplet } from 'lucide-react'

export function ResourceDisplay() {
  const { gold, elixir } = useGameStore()
  
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-full shadow-lg">
        <Coins className="w-5 h-5" />
        <span className="font-bold">{Math.floor(gold)}</span>
      </div>
      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg">
        <Droplet className="w-5 h-5" />
        <span className="font-bold">{Math.floor(elixir)}</span>
      </div>
    </div>
  )
}
