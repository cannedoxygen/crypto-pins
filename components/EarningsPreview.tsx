'use client'

import { useState, useEffect } from 'react'

export default function EarningsPreview() {
  const [currentEarnings, setCurrentEarnings] = useState(8956.42)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Simulate real-time earnings accumulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEarnings(prev => prev + (Math.random() * 0.5 + 0.1))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative py-20 px-6 bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(153,69,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(153,69,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Gradient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-solana-purple/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-solana-green/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-solana-purple/10 via-black to-solana-green/10 border border-white/10 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solana-green/10 border border-solana-green/20 mb-4">
                <div className="w-2 h-2 bg-solana-green rounded-full animate-pulse" />
                <span className="text-xs font-medium text-solana-green uppercase tracking-wide">Live Earnings</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                NFT Holders Have Earned
              </h2>

              <p className="text-gray-400 max-w-md">
                Join thousands of collectors earning passive income from physical pin sales.
                Real utility. Real rewards.
              </p>
            </div>

            {/* Earnings counter */}
            <div className="text-center">
              <div className="p-6 rounded-2xl bg-black/50 border border-solana-green/30 backdrop-blur-sm">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-solana-green via-solana-blue to-solana-purple bg-clip-text text-transparent mb-2 tabular-nums">
                  {currentEarnings.toFixed(2)}
                </div>
                <div className="text-xl text-gray-400 mb-4">SOL Distributed</div>

                <a
                  href="/earnings"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-solana-green to-solana-blue rounded-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-solana-green/50"
                >
                  View Your Earnings
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2,847</div>
              <div className="text-sm text-gray-500">Active Earners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-solana-green">3.2%</div>
              <div className="text-sm text-gray-500">Avg. APY</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-solana-blue">$892K</div>
              <div className="text-sm text-gray-500">Pin Sales Volume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-solana-purple">15,234</div>
              <div className="text-sm text-gray-500">Claims Processed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
