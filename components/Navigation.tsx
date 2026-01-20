'use client'

import { FC, useState } from 'react'
import { usePathname } from 'next/navigation'
import WalletButton from './WalletButton'
import { NotificationBell, NotificationHistory } from './AvailabilityNotifications'
import { useAvailability } from '@/lib/AvailabilityProvider'

export const Navigation: FC = () => {
  const pathname = usePathname()
  const { events, unreadCount, markAsRead } = useAvailability()
  const [showHistory, setShowHistory] = useState(false)

  const handleBellClick = () => {
    setShowHistory(true)
    markAsRead()
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-solana-purple via-solana-blue to-solana-green bg-clip-text text-transparent"
          >
            Crypto Pins
          </a>

          <div className="flex items-center gap-6">
            <a
              href="/"
              className={`transition-colors ${
                pathname === '/'
                  ? 'text-solana-green font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </a>
            <a
              href="/earnings"
              className={`transition-colors ${
                pathname === '/earnings'
                  ? 'text-solana-green font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Earnings
            </a>
            <NotificationBell
              unreadCount={unreadCount}
              onClick={handleBellClick}
            />
            <WalletButton />
          </div>
        </div>
      </nav>

      <NotificationHistory
        events={events}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </>
  )
}

export default Navigation
