'use client'

import { useState, useMemo } from 'react'
import ShareButton from './ShareButton'
import StockIndicator, { StockBadge, LiveSyncIndicator } from './StockIndicator'
import { useAvailability } from '@/lib/AvailabilityProvider'
import { getStockStatus } from '@/lib/useInventory'

const featuredPins = [
  {
    id: 1,
    name: 'Solana Logo',
    description: 'Iconic gradient logo pin',
    price: '0.5 SOL',
    image: '⬢',
    color: 'from-solana-purple to-solana-green',
    tag: 'Flagship'
  },
  {
    id: 2,
    name: 'Bonk Doge',
    description: 'The legendary meme coin',
    price: '0.3 SOL',
    image: '🐕',
    color: 'from-orange-500 to-yellow-400',
    tag: 'Meme'
  },
  {
    id: 3,
    name: 'Saga Monke',
    description: 'Mobile revolution pin',
    price: '0.4 SOL',
    image: '🐵',
    color: 'from-purple-500 to-pink-500',
    tag: 'Limited'
  },
  {
    id: 4,
    name: 'Degen Ape',
    description: 'For the true degens',
    price: '0.6 SOL',
    image: '🦍',
    color: 'from-green-500 to-emerald-600',
    tag: 'Rare'
  }
]

export default function PinShowcase() {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null)
  const { items, isLoading, lastSync, getItem, lowStockItems } = useAvailability()

  // Combine pin data with inventory data
  const pinsWithStock = useMemo(() => {
    return featuredPins.map(pin => {
      const inventoryItem = getItem(pin.id)
      return {
        ...pin,
        inventory: inventoryItem,
        stockStatus: inventoryItem ? getStockStatus(inventoryItem) : null
      }
    })
  }, [getItem, items])

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-solana-purple/5 via-transparent to-transparent" />

      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solana-green/10 border border-solana-green/20 backdrop-blur-sm mb-6">
          <span className="text-sm font-medium text-solana-green">Featured Collection</span>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-solana-blue to-solana-green bg-clip-text text-transparent">
          Collect Them All
        </h2>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          High-quality enamel pins featuring your favorite Solana ecosystem projects.
          <span className="text-white font-semibold"> Own the physical. Earn from the NFT.</span>
        </p>

        {/* Live inventory status */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <LiveSyncIndicator lastSync={lastSync} />
          {lowStockItems.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-orange-400">
              <span className="animate-pulse">!</span>
              <span>{lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} running low</span>
            </div>
          )}
        </div>
      </div>

      {/* Pins grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pinsWithStock.map((pin) => {
          const isOutOfStock = pin.stockStatus === 'out_of_stock'

          return (
            <div
              key={pin.id}
              className="group relative"
              onMouseEnter={() => setHoveredPin(pin.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Card */}
              <div className={`
                relative h-full p-8 rounded-2xl border backdrop-blur-sm
                transition-all duration-500 transform
                ${isOutOfStock ? 'opacity-75' : ''}
                ${hoveredPin === pin.id
                  ? 'bg-white/10 border-solana-purple scale-105 shadow-2xl shadow-solana-purple/50'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
                }
              `}>
                {/* Tag and Share */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-solana-purple/20 to-solana-blue/20 border border-solana-purple/30">
                    <span className="text-xs font-bold text-solana-green">{pin.tag}</span>
                  </div>
                  <ShareButton
                    title={`${pin.name} - Crypto Pins`}
                    text={`Check out this ${pin.name} pin from Crypto Pins! ${pin.description}`}
                    size="sm"
                  />
                </div>

                {/* Pin display - animated 3D effect */}
                <div className={`
                  relative mb-6 h-48 flex items-center justify-center
                  transition-transform duration-500
                  ${hoveredPin === pin.id ? 'scale-110 rotate-12' : 'rotate-0'}
                  ${isOutOfStock ? 'grayscale' : ''}
                `}>
                  <div className={`
                    absolute inset-0 rounded-full bg-gradient-to-br ${pin.color} opacity-20 blur-2xl
                    ${hoveredPin === pin.id && !isOutOfStock ? 'animate-pulse' : ''}
                  `} />
                  <div className={`
                    relative text-9xl transform transition-all duration-500
                    ${hoveredPin === pin.id ? 'rotate-y-180' : ''}
                  `}>
                    {pin.image}
                  </div>

                  {/* Out of stock overlay */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                      <span className="text-xl font-bold text-red-400 -rotate-12">SOLD OUT</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">{pin.name}</h3>
                  <p className="text-gray-400 text-sm">{pin.description}</p>

                  {/* Stock status indicator */}
                  {pin.inventory && (
                    <StockIndicator
                      item={pin.inventory}
                      showDetails={hoveredPin === pin.id}
                      size="sm"
                    />
                  )}

                  {/* Price & action */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Price</div>
                      <div className="text-xl font-bold bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent">
                        {pin.price}
                      </div>
                    </div>
                    <button
                      disabled={isOutOfStock}
                      className={`
                        px-6 py-3 rounded-lg font-semibold text-sm
                        transition-all duration-300 transform
                        ${isOutOfStock
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : hoveredPin === pin.id
                            ? 'bg-gradient-to-r from-solana-purple to-solana-blue text-white scale-110 shadow-lg shadow-solana-purple/50'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }
                      `}
                    >
                      {isOutOfStock ? 'Notify Me' : 'View'}
                    </button>
                  </div>
                </div>

                {/* Hover glow effect */}
                {hoveredPin === pin.id && !isOutOfStock && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-solana-purple/10 to-solana-blue/10 pointer-events-none" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* View all CTA */}
      <div className="relative z-10 max-w-7xl mx-auto mt-16 text-center">
        <button className="group px-8 py-4 bg-gradient-to-r from-solana-purple to-solana-blue rounded-lg font-semibold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-solana-purple/50">
          <span className="relative z-10 flex items-center gap-2">
            Explore Full Collection
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </span>
        </button>
      </div>
    </section>
  )
}
