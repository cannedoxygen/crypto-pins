'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useInventory, InventoryItem, StockStatus } from './useInventory'
import { useAvailabilityUpdates, AvailabilityEvent } from './useAvailabilityUpdates'
import AvailabilityNotifications from '@/components/AvailabilityNotifications'

interface AvailabilityContextValue {
  // Inventory data
  items: InventoryItem[]
  lowStockItems: InventoryItem[]
  isLoading: boolean
  lastSync: Date | null
  error: string | null
  isAutoUpdating: boolean

  // Inventory actions
  getItem: (id: number) => InventoryItem | undefined
  getItemStatus: (id: number) => StockStatus | null
  getItemStockPercentage: (id: number) => number
  reserveItem: (id: number, quantity?: number) => boolean
  releaseReservation: (id: number, quantity?: number) => boolean
  confirmPurchase: (id: number, quantity?: number) => boolean
  setAutoUpdate: (enabled: boolean) => void
  refreshInventory: () => Promise<void>

  // Availability events
  events: AvailabilityEvent[]
  unreadCount: number
  clearEvents: () => void
  markAsRead: () => void
}

const AvailabilityContext = createContext<AvailabilityContextValue | null>(null)

export function useAvailability() {
  const context = useContext(AvailabilityContext)
  if (!context) {
    throw new Error('useAvailability must be used within an AvailabilityProvider')
  }
  return context
}

interface AvailabilityProviderProps {
  children: ReactNode
  showNotifications?: boolean
}

export default function AvailabilityProvider({
  children,
  showNotifications = true
}: AvailabilityProviderProps) {
  const inventory = useInventory()

  const availability = useAvailabilityUpdates({
    items: inventory.items,
    autoNotify: true,
    lowStockThreshold: 50
  })

  const value: AvailabilityContextValue = {
    // Inventory data
    items: inventory.items,
    lowStockItems: inventory.lowStockItems,
    isLoading: inventory.isLoading,
    lastSync: inventory.lastSync,
    error: inventory.error,
    isAutoUpdating: inventory.isAutoUpdating,

    // Inventory actions
    getItem: inventory.getItem,
    getItemStatus: inventory.getItemStatus,
    getItemStockPercentage: inventory.getItemStockPercentage,
    reserveItem: inventory.reserveItem,
    releaseReservation: inventory.releaseReservation,
    confirmPurchase: inventory.confirmPurchase,
    setAutoUpdate: inventory.setAutoUpdate,
    refreshInventory: inventory.refreshInventory,

    // Availability events
    events: availability.events,
    unreadCount: availability.unreadCount,
    clearEvents: availability.clearEvents,
    markAsRead: availability.markAsRead
  }

  return (
    <AvailabilityContext.Provider value={value}>
      {children}
      {showNotifications && (
        <AvailabilityNotifications
          events={availability.events}
          maxVisible={3}
          autoDismissMs={5000}
        />
      )}
    </AvailabilityContext.Provider>
  )
}
