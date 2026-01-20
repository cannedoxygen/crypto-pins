'use client'

import { useState, useEffect, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

interface EcosystemProject {
  id: number
  name: string
  icon: string
  category: 'defi' | 'nft' | 'meme' | 'infra'
  status: 'live' | 'coming_soon'
}

interface DegenStat {
  label: string
  value: string
  change: string
  isPositive: boolean
}

const ecosystemProjects: EcosystemProject[] = [
  { id: 1, name: 'Jupiter', icon: '🪐', category: 'defi', status: 'live' },
  { id: 2, name: 'Raydium', icon: '💫', category: 'defi', status: 'live' },
  { id: 3, name: 'Tensor', icon: '🔷', category: 'nft', status: 'live' },
  { id: 4, name: 'Bonk', icon: '🐕', category: 'meme', status: 'live' },
  { id: 5, name: 'Orca', icon: '🐋', category: 'defi', status: 'coming_soon' },
  { id: 6, name: 'Marinade', icon: '🥩', category: 'defi', status: 'coming_soon' },
  { id: 7, name: 'Mad Lads', icon: '😎', category: 'nft', status: 'coming_soon' },
  { id: 8, name: 'WIF', icon: '🐶', category: 'meme', status: 'live' },
]

const degenPhrases = [
  'LFG',
  'WAGMI',
  'APE IN',
  'NGMI if you miss this',
  'Diamond hands only',
  'To the moon',
  'Few understand',
]

export default function DegenZone() {
  const [mounted, setMounted] = useState(false)
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [stats, setStats] = useState<DegenStat[]>([
    { label: 'Floor Price', value: '2.1 SOL', change: '+12.4%', isPositive: true },
    { label: '24h Volume', value: '847 SOL', change: '+34.2%', isPositive: true },
    { label: 'Unique Holders', value: '2,847', change: '+156', isPositive: true },
    { label: 'Avg Hold Time', value: '47 days', change: '+5d', isPositive: true },
  ])
  const [recentActivity, setRecentActivity] = useState([
    { type: 'mint', user: 'degen.sol', item: 'Genesis #892', time: '2m ago' },
    { type: 'sale', user: 'whale.sol', item: 'Bonk Pin #156', time: '5m ago' },
    { type: 'mint', user: 'ape.sol', item: 'Meme Legends #1204', time: '8m ago' },
  ])

  const { connected } = useWallet()
  const { setVisible } = useWalletModal()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % degenPhrases.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        if (stat.label === '24h Volume') {
          const newValue = parseInt(stat.value) + Math.floor(Math.random() * 10)
          return { ...stat, value: `${newValue} SOL` }
        }
        if (stat.label === 'Unique Holders') {
          const newValue = parseInt(stat.value.replace(',', '')) + Math.floor(Math.random() * 3)
          return { ...stat, value: newValue.toLocaleString() }
        }
        return stat
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Simulate activity feed
  useEffect(() => {
    const activities = [
      { type: 'mint', users: ['degen.sol', 'sol_maxi.sol', 'bonk_lover.sol'], items: ['Genesis', 'Meme Legends', 'Ecosystem Heroes'] },
      { type: 'sale', users: ['whale.sol', 'flipper.sol', 'hodler.sol'], items: ['Bonk Pin', 'Solana Logo', 'Saga Monke'] },
    ]

    const interval = setInterval(() => {
      const activity = activities[Math.floor(Math.random() * activities.length)]
      const user = activity.users[Math.floor(Math.random() * activity.users.length)]
      const item = activity.items[Math.floor(Math.random() * activity.items.length)]
      const num = Math.floor(Math.random() * 2000)

      setRecentActivity(prev => [
        { type: activity.type, user, item: `${item} #${num}`, time: 'just now' },
        ...prev.slice(0, 2).map(a => ({
          ...a,
          time: a.time === 'just now' ? '1m ago' : a.time === '1m ago' ? '3m ago' : '5m ago'
        }))
      ])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const handleConnectWallet = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  const filteredProjects = ecosystemProjects.filter(
    project => activeCategory === 'all' || project.category === activeCategory
  )

  if (!mounted) return null

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(153,69,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(153,69,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-solana-purple/20 via-transparent to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-solana-green/20 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header with rotating phrases */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-solana-purple/20 to-solana-green/20 border border-solana-purple/30 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 bg-solana-green rounded-full animate-pulse" />
            <span className="text-sm font-bold text-solana-green uppercase tracking-wider">
              {degenPhrases[currentPhrase]}
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-solana-purple via-solana-blue to-solana-green bg-clip-text text-transparent">
              Built for Degens,
            </span>
            <br />
            <span className="text-white">by Degens</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Solana speed. Low fees. Real utility. If you're deep in the Solana ecosystem,
            <span className="text-solana-green font-semibold"> these pins are for you.</span>
          </p>
        </div>

        {/* Live stats ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-solana-purple/10 to-transparent rounded-bl-full" />
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</span>
                  <span className={`text-xs font-semibold ${stat.isPositive ? 'text-solana-green' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white group-hover:text-solana-green transition-colors">
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Ecosystem projects */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Ecosystem Pins</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 bg-solana-green rounded-full animate-pulse" />
                <span className="text-gray-400">Live trading</span>
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'defi', 'nft', 'meme', 'infra'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-solana-purple text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Project grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`
                    relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group
                    ${project.status === 'live'
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-solana-purple/50'
                      : 'bg-white/[0.02] border-white/5 opacity-60'
                    }
                  `}
                >
                  {project.status === 'coming_soon' && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-solana-purple/20 border border-solana-purple/30">
                      <span className="text-[10px] font-medium text-solana-purple">Soon</span>
                    </div>
                  )}
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <div className="text-sm font-semibold text-white">{project.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{project.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live activity feed */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Live Activity</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-solana-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-solana-green"></span>
                </span>
                <span className="text-xs text-gray-400">Real-time</span>
              </div>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center gap-4 p-4 rounded-xl border transition-all duration-500
                    ${index === 0 ? 'bg-solana-green/5 border-solana-green/20 animate-pulse' : 'bg-white/5 border-white/10'}
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center text-lg
                    ${activity.type === 'mint'
                      ? 'bg-solana-purple/20 text-solana-purple'
                      : 'bg-solana-green/20 text-solana-green'
                    }
                  `}>
                    {activity.type === 'mint' ? '✨' : '💸'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold truncate">{activity.user}</span>
                      <span className="text-gray-500 text-sm">
                        {activity.type === 'mint' ? 'minted' : 'sold'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 truncate">{activity.item}</div>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</div>
                </div>
              ))}
            </div>

            {/* Why degens love this */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-solana-purple/10 to-solana-green/10 border border-solana-purple/20">
              <h4 className="text-sm font-bold text-white mb-3">Why Degens Love This</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-solana-green">⚡</span>
                  <span className="text-gray-300">Sub-second transactions on Solana</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-solana-green">💸</span>
                  <span className="text-gray-300">Pennies in fees, not dollars</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-solana-green">📈</span>
                  <span className="text-gray-300">Real yield from physical sales</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-solana-green">🎯</span>
                  <span className="text-gray-300">Flex your bags IRL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Degen leaderboard teaser */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-solana-purple/10 via-black to-solana-green/10 border border-solana-purple/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-4">
                <span className="text-lg">🏆</span>
                <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Top Collectors</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Degen Leaderboard
              </h3>

              <p className="text-gray-400 mb-6">
                The biggest collectors get the biggest perks. Top 100 holders unlock exclusive drops,
                private Discord channels, and IRL event access.
              </p>

              <button
                onClick={handleConnectWallet}
                className="px-6 py-3 bg-gradient-to-r from-solana-purple to-solana-blue rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-solana-purple/50"
              >
                {connected ? 'View Leaderboard' : 'Connect to See Rankings'}
              </button>
            </div>

            <div className="space-y-3">
              {[
                { rank: 1, name: 'whale_szn.sol', count: 47, badge: '🐋' },
                { rank: 2, name: 'degen_king.sol', count: 34, badge: '👑' },
                { rank: 3, name: 'sol_maxi.sol', count: 28, badge: '💎' },
              ].map((holder) => (
                <div
                  key={holder.rank}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center font-bold
                    ${holder.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                      holder.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                      'bg-orange-500/20 text-orange-500'}
                  `}>
                    #{holder.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{holder.name}</span>
                      <span className="text-lg">{holder.badge}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{holder.count}</div>
                    <div className="text-xs text-gray-500">pins</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-2xl font-bold text-white mb-4">
            Ready to ape in? <span className="text-solana-green">WAGMI</span>
          </p>
          <button
            onClick={handleConnectWallet}
            className="px-10 py-5 bg-gradient-to-r from-solana-purple via-solana-blue to-solana-green rounded-xl font-bold text-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-solana-purple/50 animate-pulse"
          >
            {connected ? 'Start Collecting' : 'Connect Wallet & APE IN'}
          </button>
        </div>
      </div>
    </section>
  )
}
