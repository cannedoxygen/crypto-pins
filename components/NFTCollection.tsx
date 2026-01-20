'use client'

import { useState, useEffect } from 'react'

const collections = [
  {
    id: 1,
    name: 'Genesis Collection',
    description: 'First-ever Solana pin NFTs with exclusive profit-sharing',
    totalSupply: 1000,
    minted: 847,
    floorPrice: '2.5 SOL',
    icon: '👑',
    gradient: 'from-yellow-500 via-orange-500 to-red-500'
  },
  {
    id: 2,
    name: 'Meme Legends',
    description: 'Iconic Solana meme coins immortalized as collectible pins',
    totalSupply: 2000,
    minted: 1456,
    floorPrice: '1.8 SOL',
    icon: '🔥',
    gradient: 'from-pink-500 via-purple-500 to-indigo-500'
  },
  {
    id: 3,
    name: 'Ecosystem Heroes',
    description: 'Celebrating projects building on Solana',
    totalSupply: 1500,
    minted: 892,
    floorPrice: '3.2 SOL',
    icon: '⚡',
    gradient: 'from-cyan-500 via-blue-500 to-purple-500'
  }
]

export default function NFTCollection() {
  const [activeCollection, setActiveCollection] = useState(0)
  const [stats, setStats] = useState({ holders: 2847, volume: 15234, rewards: 8956 })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        holders: prev.holders + Math.floor(Math.random() * 3),
        volume: prev.volume + Math.floor(Math.random() * 50),
        rewards: prev.rewards + Math.floor(Math.random() * 20)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,149,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,149,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-solana-purple/20 to-solana-blue/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-solana-green/20 to-solana-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solana-purple/10 border border-solana-purple/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-solana-purple">NFT Collections</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-solana-green via-solana-blue to-solana-purple bg-clip-text text-transparent">
            Own. Trade. Earn.
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Buy NFT pins and receive automatic profit-sharing from every physical pin sale.
            <span className="text-solana-green font-semibold"> Real utility. Real rewards.</span>
          </p>
        </div>

        {/* Live stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm uppercase tracking-wide">Total Holders</span>
              <div className="w-2 h-2 bg-solana-green rounded-full animate-pulse" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-solana-green to-solana-blue bg-clip-text text-transparent">
              {stats.holders.toLocaleString()}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm uppercase tracking-wide">Trading Volume</span>
              <div className="w-2 h-2 bg-solana-blue rounded-full animate-pulse" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-solana-blue to-solana-purple bg-clip-text text-transparent">
              {stats.volume.toLocaleString()} SOL
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm uppercase tracking-wide">Rewards Paid</span>
              <div className="w-2 h-2 bg-solana-purple rounded-full animate-pulse" />
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent">
              {stats.rewards.toLocaleString()} SOL
            </div>
          </div>
        </div>

        {/* Collections carousel */}
        <div className="space-y-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`
                relative p-8 rounded-3xl border backdrop-blur-sm cursor-pointer
                transition-all duration-500 transform
                ${activeCollection === index
                  ? 'bg-white/10 border-solana-green scale-105 shadow-2xl shadow-solana-green/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                }
              `}
              onClick={() => setActiveCollection(index)}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                {/* Icon */}
                <div className="relative">
                  <div className={`
                    w-24 h-24 rounded-2xl bg-gradient-to-br ${collection.gradient}
                    flex items-center justify-center text-5xl
                    ${activeCollection === index ? 'animate-glow' : ''}
                  `}>
                    {collection.icon}
                  </div>
                  {activeCollection === index && (
                    <div className="absolute -inset-2 bg-gradient-to-br from-solana-green/30 to-solana-blue/30 rounded-2xl blur-xl -z-10 animate-pulse" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-2">{collection.name}</h3>
                  <p className="text-gray-400 mb-4">{collection.description}</p>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Minted</span>
                      <span className="text-white font-semibold">
                        {collection.minted} / {collection.totalSupply}
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${collection.gradient} rounded-full transition-all duration-1000`}
                        style={{ width: `${(collection.minted / collection.totalSupply) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stats & CTA */}
                <div className="flex flex-col gap-4">
                  <div className="text-center p-4 rounded-xl bg-black/30 border border-white/10">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Floor Price</div>
                    <div className="text-2xl font-bold text-white">{collection.floorPrice}</div>
                  </div>
                  <button className={`
                    px-6 py-3 rounded-lg font-semibold
                    transition-all duration-300 transform
                    ${activeCollection === index
                      ? 'bg-gradient-to-r from-solana-green to-solana-blue text-black shadow-lg shadow-solana-green/50'
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}>
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-solana-purple/10 via-solana-blue/10 to-solana-green/10 border border-solana-purple/20 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Start Earning Today</h3>
              <p className="text-gray-400">Connect your wallet and mint your first profit-sharing NFT pin</p>
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-solana-purple to-solana-blue rounded-lg font-semibold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-solana-purple/50">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
