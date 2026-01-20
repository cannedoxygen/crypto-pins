'use client'

import { FC } from 'react'
import { usePathname } from 'next/navigation'
import WalletButton from './WalletButton'

export const Navigation: FC = () => {
  const pathname = usePathname()

  return (
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
          <WalletButton />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
