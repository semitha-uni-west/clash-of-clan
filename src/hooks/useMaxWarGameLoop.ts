import { useEffect, useRef } from 'react'
import { useMaxWarStore } from '@/lib/maxWarStore'

export function useMaxWarGameLoop() {
  const updateGame = useMaxWarStore(state => state.updateGame)
  const completeUnitTraining = useMaxWarStore(state => state.completeUnitTraining)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    // Update game state every second
    intervalRef.current = setInterval(() => {
      updateGame()
      completeUnitTraining()
    }, 1000)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [updateGame, completeUnitTraining])
}
