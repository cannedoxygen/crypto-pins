'use client'

import { useState, useEffect } from 'react'

interface CollectibleFeature {
  id: number
  icon: string
  title: string
  description: string
}

interface MaterialSpec {
  material: string
  description: string
  icon: string
}

interface FlexMoment {
  id: number
  scenario: string
  icon: string
  reaction: string
}

const collectibleFeatures: CollectibleFeature[] = [
  {
    id: 1,
    icon: '🏆',
    title: 'Real-World Flex',
    description: 'Show off your crypto allegiance at meetups, conferences, and everyday life'
  },
  {
    id: 2,
    icon: '💎',
    title: 'Tangible Value',
    description: 'Something you can hold, display, and admire - not just pixels on a screen'
  },
  {
    id: 3,
    icon: '🔒',
    title: 'Permanent Ownership',
    description: 'No server shutdowns or lost passwords - these pins are yours forever'
  },
  {
    id: 4,
    icon: '🎯',
    title: 'Conversation Starter',
    description: 'Find your tribe in the wild - fellow crypto enthusiasts recognize the symbols'
  }
]

const materialSpecs: MaterialSpec[] = [
  {
    material: 'Hard Enamel',
    description: 'Smooth, glass-like finish that resists scratches and maintains color for years',
    icon: '✨'
  },
  {
    material: 'Die-Cast Metal',
    description: 'Premium zinc alloy with satisfying weight and durability',
    icon: '⚙️'
  },
  {
    material: 'Custom Plating',
    description: 'Gold, silver, rainbow, and black nickel options for each design',
    icon: '🪙'
  },
  {
    material: 'Rubber Clutches',
    description: 'Secure locking backs that keep your pins exactly where you want them',
    icon: '🔐'
  }
]

const flexMoments: FlexMoment[] = [
  {
    id: 1,
    scenario: 'At a crypto conference',
    icon: '🎪',
    reaction: '"Nice Solana pin! You a validator?"'
  },
  {
    id: 2,
    scenario: 'On your laptop bag',
    icon: '💼',
    reaction: '"Wait, is that Bonk? IYKYK"'
  },
  {
    id: 3,
    scenario: 'At a coffee shop',
    icon: '☕',
    reaction: '"Fellow degen spotted"'
  },
  {
    id: 4,
    scenario: 'On your jacket',
    icon: '🧥',
    reaction: '"That pin is fire, where\'d you get it?"'
  }
]

const exclusiveCollections = [
  {
    name: 'Genesis Collection',
    count: '100 pieces',
    status: 'Sold Out',
    icon: '🌟',
    gradient: 'from-yellow-500 to-amber-600'
  },
  {
    name: 'Solana Summer',
    count: '250 pieces',
    status: 'Limited',
    icon: '☀️',
    gradient: 'from-solana-purple to-solana-green'
  },
  {
    name: 'Meme Lords',
    count: '500 pieces',
    status: 'Available',
    icon: '👑',
    gradient: 'from-orange-500 to-pink-500'
  },
  {
    name: 'Diamond Hands',
    count: '50 pieces',
    status: 'Coming Soon',
    icon: '💎',
    gradient: 'from-cyan-400 to-blue-500'
  }
]

export default function CryptoCollectorShowcase() {
  const [mounted, setMounted] = useState(false)
  const [activeFlexMoment, setActiveFlexMoment] = useState(0)
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Rotate flex moments
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlexMoment((prev) => (prev + 1) % flexMoments.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-solana-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-solana-green/5 rounded-full blur-3xl" />
      </div>

      {/* Metallic grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-6">
            <span className="text-lg">🏅</span>
            <span className="text-sm font-medium text-amber-400">For the True Believers</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Own Crypto.</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Wear Crypto.
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            You believe in the technology. You&apos;ve been through the cycles. Now
            <span className="text-white font-semibold"> flex your conviction in the real world</span> with
            premium collectibles that match your portfolio.
          </p>
        </div>

        {/* Why physical matters section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {collectibleFeatures.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Two column layout: Materials + Flex Moments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Premium materials */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <span className="text-2xl">⚒️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Premium Craftsmanship</h3>
                <p className="text-sm text-gray-400">Built to match your standards</p>
              </div>
            </div>

            <div className="space-y-4">
              {materialSpecs.map((spec, index) => (
                <div
                  key={spec.material}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-amber-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{spec.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{spec.material}</h4>
                    <p className="text-sm text-gray-400">{spec.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quality badge */}
            <div className="mt-6 flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
              <span className="text-2xl">✓</span>
              <span className="text-sm font-medium text-amber-400">
                Same quality standards as your hardware wallet
              </span>
            </div>
          </div>

          {/* Flex moments carousel */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-solana-purple/20 flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">IRL Flex Moments</h3>
                <p className="text-sm text-gray-400">Where crypto meets real life</p>
              </div>
            </div>

            {/* Active flex moment display */}
            <div className="relative h-48 mb-6">
              {flexMoments.map((moment, index) => (
                <div
                  key={moment.id}
                  className={`
                    absolute inset-0 flex flex-col items-center justify-center text-center p-6 rounded-2xl
                    bg-gradient-to-br from-solana-purple/10 to-solana-green/10 border border-solana-purple/20
                    transition-all duration-500
                    ${index === activeFlexMoment ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                  `}
                >
                  <div className="text-6xl mb-4">{moment.icon}</div>
                  <div className="text-lg font-semibold text-white mb-2">{moment.scenario}</div>
                  <div className="text-sm text-solana-green italic">&ldquo;{moment.reaction}&rdquo;</div>
                </div>
              ))}
            </div>

            {/* Moment indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {flexMoments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFlexMoment(index)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${index === activeFlexMoment
                      ? 'bg-solana-green w-8'
                      : 'bg-white/20 hover:bg-white/40'
                    }
                  `}
                />
              ))}
            </div>

            {/* Supporting stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-white">47</div>
                <div className="text-xs text-gray-500">Countries</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-white">2.8k</div>
                <div className="text-xs text-gray-500">Collectors</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-xs text-gray-500">Events</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exclusive collections */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white mb-2">Limited Edition Collections</h3>
            <p className="text-gray-400">Rare pieces for serious collectors - once they&apos;re gone, they&apos;re gone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exclusiveCollections.map((collection, index) => (
              <div
                key={collection.name}
                className="relative group"
                onMouseEnter={() => setHoveredCollection(index)}
                onMouseLeave={() => setHoveredCollection(null)}
              >
                <div className={`
                  relative p-6 rounded-2xl border backdrop-blur-sm
                  transition-all duration-500 transform
                  ${hoveredCollection === index
                    ? 'bg-white/10 border-amber-500/50 scale-105'
                    : 'bg-white/5 border-white/10'
                  }
                `}>
                  {/* Status badge */}
                  <div className={`
                    absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold
                    ${collection.status === 'Sold Out'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : collection.status === 'Limited'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : collection.status === 'Available'
                      ? 'bg-solana-green/20 text-solana-green border border-solana-green/30'
                      : 'bg-solana-purple/20 text-solana-purple border border-solana-purple/30'
                    }
                  `}>
                    {collection.status}
                  </div>

                  {/* Collection icon */}
                  <div className={`
                    w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${collection.gradient}
                    flex items-center justify-center shadow-lg
                    ${hoveredCollection === index ? 'animate-bounce' : ''}
                  `}>
                    <span className="text-4xl">{collection.icon}</span>
                  </div>

                  <h4 className="text-xl font-bold text-white text-center mb-1">{collection.name}</h4>
                  <p className="text-sm text-gray-400 text-center">{collection.count}</p>

                  {/* Hover action */}
                  {hoveredCollection === index && (
                    <button className={`
                      mt-4 w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300
                      ${collection.status === 'Sold Out'
                        ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                        : collection.status === 'Coming Soon'
                        ? 'bg-solana-purple/20 text-solana-purple'
                        : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                      }
                    `}>
                      {collection.status === 'Sold Out'
                        ? 'Join Waitlist'
                        : collection.status === 'Coming Soon'
                        ? 'Get Notified'
                        : 'Collect Now'
                      }
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof for crypto enthusiasts */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/5 via-solana-purple/5 to-solana-green/5 border border-amber-500/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solana-purple/10 border border-solana-purple/20 mb-4">
                <span className="text-lg">🎤</span>
                <span className="text-xs font-bold text-solana-purple uppercase tracking-wider">Collector Voices</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-6">
                &ldquo;Finally, a way to rep my bags without checking my phone every 5 minutes&rdquo;
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-solana-purple to-solana-green flex items-center justify-center text-2xl">
                    🦧
                  </div>
                  <div>
                    <div className="text-white font-semibold">degen_collector.sol</div>
                    <div className="text-sm text-gray-400">&ldquo;Wore my Bonk pin to ETH Denver. Made 12 new frens.&rdquo;</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-2xl">
                    🐋
                  </div>
                  <div>
                    <div className="text-white font-semibold">whale_watcher.sol</div>
                    <div className="text-sm text-gray-400">&ldquo;The quality is insane. Better than my $500 hoodie.&rdquo;</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              {/* Visual display of pin collection */}
              <div className="relative w-64 h-64">
                {/* Center pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-solana-purple to-solana-green flex items-center justify-center text-5xl shadow-2xl shadow-solana-purple/50 z-10">
                  ⬢
                </div>

                {/* Orbiting pins */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-2xl shadow-lg animate-float">
                  🐕
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg animate-float" style={{ animationDelay: '-1.5s' }}>
                  🐵
                </div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl shadow-lg animate-float" style={{ animationDelay: '-3s' }}>
                  💎
                </div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl shadow-lg animate-float" style={{ animationDelay: '-4.5s' }}>
                  🦍
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-6 text-center">
                Build your collection. Show your conviction.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            You&apos;ve got the conviction. Now get the collectibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-xl font-bold text-lg text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50">
              Browse Physical Pins
            </button>
            <button className="px-10 py-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-bold text-lg text-white hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300">
              View Limited Editions
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
