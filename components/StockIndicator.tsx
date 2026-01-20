'use client'

import { useMemo } from 'react'
import { StockStatus, InventoryItem, getStockStatus, getStockPercentage } from '@/lib/useInventory'

interface StockIndicatorProps {
  item: InventoryItem
  showDetails?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const statusConfig: Record<StockStatus, {
  label: string
  color: string
  bgColor: string
  borderColor: string
  pulseColor: string
  icon: string
}> = {
  in_stock: {
    label: 'In Stock',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    pulseColor: 'bg-green-500',
    icon: '✓'
  },
  limited: {
    label: 'Limited',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    pulseColor: 'bg-yellow-500',
    icon: '!'
  },
  low_stock: {
    label: 'Low Stock',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
    pulseColor: 'bg-orange-500',
    icon: '⚠'
  },
  out_of_stock: {
    label: 'Sold Out',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    pulseColor: 'bg-red-500',
    icon: '✕'
  }
}

const sizeClasses = {
  sm: {
    container: 'px-2 py-1 text-xs gap-1.5',
    dot: 'w-1.5 h-1.5',
    bar: 'h-1'
  },
  md: {
    container: 'px-3 py-1.5 text-sm gap-2',
    dot: 'w-2 h-2',
    bar: 'h-1.5'
  },
  lg: {
    container: 'px-4 py-2 text-base gap-2.5',
    dot: 'w-2.5 h-2.5',
    bar: 'h-2'
  }
}

export default function StockIndicator({
  item,
  showDetails = false,
  size = 'sm',
  className = ''
}: StockIndicatorProps) {
  const status = useMemo(() => getStockStatus(item), [item])
  const percentage = useMemo(() => getStockPercentage(item), [item])
  const config = statusConfig[status]
  const sizeClass = sizeClasses[size]

  const availableCount = item.availableStock - item.reservedStock

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Status badge */}
      <div
        className={`
          inline-flex items-center rounded-full border backdrop-blur-sm
          ${config.bgColor} ${config.borderColor} ${sizeClass.container}
        `}
      >
        {/* Live indicator dot */}
        <div className="relative">
          <div className={`${sizeClass.dot} ${config.pulseColor} rounded-full`} />
          {status !== 'out_of_stock' && (
            <div className={`absolute inset-0 ${sizeClass.dot} ${config.pulseColor} rounded-full animate-ping opacity-75`} />
          )}
        </div>

        {/* Status label */}
        <span className={`font-medium ${config.color}`}>
          {config.label}
        </span>

        {/* Count indicator for low stock */}
        {(status === 'low_stock' || status === 'limited') && (
          <span className={`${config.color} opacity-75`}>
            ({availableCount} left)
          </span>
        )}
      </div>

      {/* Optional details */}
      {showDetails && status !== 'out_of_stock' && (
        <div className="space-y-1">
          {/* Stock bar */}
          <div className={`w-full bg-white/10 rounded-full overflow-hidden ${sizeClass.bar}`}>
            <div
              className={`${sizeClass.bar} ${config.pulseColor} rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Stock numbers */}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{availableCount} available</span>
            <span>{item.totalStock} total</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Compact inline version for cards
export function StockBadge({
  status,
  count,
  size = 'sm'
}: {
  status: StockStatus
  count?: number
  size?: 'sm' | 'md'
}) {
  const config = statusConfig[status]
  const sizeClass = size === 'sm'
    ? 'px-2 py-0.5 text-xs gap-1'
    : 'px-3 py-1 text-sm gap-1.5'

  return (
    <div
      className={`
        inline-flex items-center rounded-full border backdrop-blur-sm
        ${config.bgColor} ${config.borderColor} ${sizeClass}
      `}
    >
      <div className="relative">
        <div className={`w-1.5 h-1.5 ${config.pulseColor} rounded-full`} />
        {status !== 'out_of_stock' && (
          <div className={`absolute inset-0 w-1.5 h-1.5 ${config.pulseColor} rounded-full animate-ping opacity-75`} />
        )}
      </div>
      <span className={`font-medium ${config.color}`}>
        {status === 'low_stock' && count ? `${count} left` : config.label}
      </span>
    </div>
  )
}

// Live sync indicator
export function LiveSyncIndicator({ lastSync }: { lastSync: Date | null }) {
  if (!lastSync) return null

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <div className="relative">
        <div className="w-2 h-2 bg-solana-green rounded-full" />
        <div className="absolute inset-0 w-2 h-2 bg-solana-green rounded-full animate-ping opacity-75" />
      </div>
      <span>Live</span>
      <span className="opacity-50">
        Updated {lastSync.toLocaleTimeString()}
      </span>
    </div>
  )
}
