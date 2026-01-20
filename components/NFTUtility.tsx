'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

interface UtilityBenefit {
  id: number
  icon: string
  title: string
  description: string
  status: 'active' | 'coming_soon'
  gradient: string
}

const utilityBenefits: UtilityBenefit[] = [
  {
    id: 1,
    icon: '📦',
    title: 'Physical Pin Redemption',
    description: 'Redeem your NFT for a real enamel pin shipped anywhere in the world. Keep the NFT or burn it for exclusive variants.',
    status: 'active',
    gradient: 'from-solana-green to-solana-blue'
  },
  {
    id: 2,
    icon: '💰',
    title: 'Perpetual Revenue Share',
    description: 'Earn automatic SOL payouts from every physical pin sale in your collection. Real passive income, not speculation.',
    status: 'active',
    gradient: 'from-solana-purple to-solana-blue'
  },
  {
    id: 3,
    icon: '🎫',
    title: 'Holder Discounts',
    description: 'Get 20% off all physical pin purchases. Stack discounts with multiple NFT holdings for up to 50% off.',
    status: 'active',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 4,
    icon: '🚀',
    title: 'Priority Access',
    description: 'Be first in line for limited edition drops and exclusive collaborations. Genesis holders get guaranteed mints.',
    status: 'active',
    gradient: 'from-pink-500 to-purple-500'
  },
  {
    id: 5,
    icon: '🎪',
    title: 'IRL Events',
    description: 'Exclusive access to Solana conferences, pin trading meetups, and holder-only experiences.',
    status: 'coming_soon',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 6,
    icon: '🎨',
    title: 'Design Voting',
    description: 'Vote on upcoming pin designs and collaborations. Shape the future of the Crypto Pins collection.',
    status: 'coming_soon',
    gradient: 'from-red-500 to-pink-500'
  }
]

const proofItems = [
  { label: 'Pins Redeemed', value: '4,892', icon: '📦' },
  { label: 'Revenue Shared', value: '8,956 SOL', icon: '💸' },
  { label: 'Active Holders', value: '2,847', icon: '👥' },
  { label: 'Countries Shipped', value: '47', icon: '🌍' }
]

export default function NFTUtility() {
  const [mounted, setMounted] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConnectWallet = () => {
    setVisible(true)
  }

  if (!mounted) return null

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,149,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,149,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-r from-solana-purple/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-gradient-to-r from-transparent to-solana-green/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solana-green/10 border border-solana-green/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-solana-green">Real-World Utility</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-solana-green via-solana-blue to-solana-purple bg-clip-text text-transparent">
            More Than Just JPEGs
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your NFT is a key to real benefits. Physical products, passive income, and exclusive access.
            <span className="text-solana-green font-semibold"> Utility you can hold in your hands.</span>
          </p>
        </div>

        {/* Proof stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {proofItems.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Utility benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {utilityBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className={`
                relative p-6 rounded-2xl border backdrop-blur-sm cursor-pointer
                transition-all duration-500 transform
                ${activeCard === benefit.id
                  ? 'bg-white/10 border-solana-green scale-105 shadow-2xl shadow-solana-green/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                }
              `}
              onClick={() => setActiveCard(activeCard === benefit.id ? null : benefit.id)}
            >
              {benefit.status === 'coming_soon' && (
                <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-solana-purple/20 border border-solana-purple/30">
                  <span className="text-xs font-medium text-solana-purple">Coming Soon</span>
                </div>
              )}

              <div className={`
                w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.gradient}
                flex items-center justify-center text-3xl mb-4
                ${activeCard === benefit.id ? 'animate-pulse' : ''}
              `}>
                {benefit.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>

              {benefit.status === 'active' && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-solana-green rounded-full animate-pulse" />
                  <span className="text-xs text-solana-green font-medium">Active Now</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Physical redemption showcase */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-solana-green/30 backdrop-blur-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solana-green/10 border border-solana-green/20 mb-4">
                <span className="text-xs font-medium text-solana-green uppercase tracking-wide">NFT to Physical</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Redeem Your Digital Art as Physical Pins
              </h3>

              <p className="text-gray-400 mb-6">
                Every Crypto Pins NFT can be redeemed for a real enamel pin. Keep your NFT and get the pin,
                or burn it for exclusive holographic variants only available through redemption.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-solana-green/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-solana-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Free worldwide shipping for Genesis holders</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-solana-green/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-solana-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Premium quality hard enamel with metal backing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-solana-green/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-solana-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Certificate of authenticity linked to your NFT</span>
                </div>
              </div>

              <button
                onClick={handleConnectWallet}
                className="px-6 py-3 bg-gradient-to-r from-solana-green to-solana-blue rounded-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-solana-green/50"
              >
                {connected ? 'Redeem Your Pins' : 'Connect to Redeem'}
              </button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-solana-purple/20 via-black to-solana-green/20 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">📍</div>
                  <div className="text-xl font-bold text-white mb-2">NFT #1234</div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-solana-green rounded-full" />
                    <span className="text-sm text-solana-green">Redeemable</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-gradient-to-r from-solana-purple to-solana-blue text-white font-semibold text-sm shadow-xl">
                + Physical Pin
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-solana-purple/10 via-solana-blue/10 to-solana-green/10 border border-solana-purple/20 backdrop-blur-sm">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready for Real Utility?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join the NFT collection that bridges digital ownership with tangible value.
            Own pins, earn revenue, access events, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleConnectWallet}
              className="px-8 py-4 bg-gradient-to-r from-solana-purple to-solana-blue rounded-lg font-semibold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-solana-purple/50"
            >
              {connected ? 'Browse Collections' : 'Connect Wallet'}
            </button>
            <a
              href="#collections"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-lg text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
