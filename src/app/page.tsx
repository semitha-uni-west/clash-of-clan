'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Sword, Trophy, Users, Building } from 'lucide-react'

export default function Home() {
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
              Clash of Clans
            </motion.h1>
            <motion.p 
              className="text-gray-600 text-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Build, Train, Battle!
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
            <Link href="/village" className="block">
              <Button variant="primary" size="lg" className="w-full text-xl">
                Play Now
              </Button>
            </Link>
            
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
            <div className="font-semibold text-center">Features:</div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <li>✓ Build and upgrade buildings</li>
              <li>✓ Train troops (Barbarians, Archers, Giants)</li>
              <li>✓ Complete campaign missions</li>
              <li>✓ Resource management (Gold & Elixir)</li>
              <li>✓ Auto-save progress</li>
              <li>✓ Town Hall up to level 5</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
