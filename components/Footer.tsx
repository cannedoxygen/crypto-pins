'use client'

import { FC } from 'react'
import SocialLinks from './SocialLinks'

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-solana-purple to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-solana-purple via-solana-blue to-solana-green bg-clip-text text-transparent mb-4">
              Crypto Pins
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              The premier marketplace for Solana-themed enamel pins.
              Own physical collectibles or NFTs with real utility and profit-sharing.
            </p>
            <SocialLinks compact className="justify-start" />
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-solana-green transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#pins" className="text-gray-400 hover:text-solana-green transition-colors">
                  Browse Pins
                </a>
              </li>
              <li>
                <a href="#nfts" className="text-gray-400 hover:text-solana-green transition-colors">
                  NFT Collection
                </a>
              </li>
              <li>
                <a href="/earnings" className="text-gray-400 hover:text-solana-green transition-colors">
                  Earnings Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#faq" className="text-gray-400 hover:text-solana-green transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-solana-green transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/cryptopins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-solana-green transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-solana-green transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social links section (full width on mobile) */}
        <div className="py-8 border-t border-white/10 mb-8">
          <div className="text-center mb-6">
            <h4 className="text-white font-semibold mb-2">Join Our Community</h4>
            <p className="text-gray-400 text-sm">
              Follow us for updates, giveaways, and exclusive drops
            </p>
          </div>
          <SocialLinks />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Crypto Pins. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Built on</span>
            <span className="font-semibold bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent">
              Solana
            </span>
            <span className="text-xl">⚡</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
