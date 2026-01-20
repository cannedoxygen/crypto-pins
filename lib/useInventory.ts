'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'

export interface InventoryItem {
  id: number
  name: string
  totalStock: number
  availableStock: number
  reservedStock: number
  lastUpdated: Date
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'limited'

export interface InventoryState {
  items: Map<number, InventoryItem>
  isLoading: boolean
  lastSync: Date | null
  error: string | null
}

// Simulated initial inventory data
const initialInventory: InventoryItem[] = [
  { id: 1, name: 'Solana Logo', totalStock: 500, availableStock: 234, reservedStock: 12, lastUpdated: new Date() },
  { id: 2, name: 'Bonk Doge', totalStock: 1000, availableStock: 756, reservedStock: 8, lastUpdated: new Date() },
  { id: 3, name: 'Saga Monke', totalStock: 250, availableStock: 47, reservedStock: 5, lastUpdated: new Date() },
  { id: 4, name: 'Degen Ape', totalStock: 100, availableStock: 12, reservedStock: 3, lastUpdated: new Date() }
]

const LOW_STOCK_THRESHOLD = 50
const LIMITED_STOCK_THRESHOLD = 100

export function getStockStatus(item: InventoryItem): StockStatus {
  const available = item.availableStock - item.reservedStock

  if (available <= 0) return 'out_of_stock'
  if (available <= LOW_STOCK_THRESHOLD) return 'low_stock'
  if (available <= LIMITED_STOCK_THRESHOLD) return 'limited'
  return 'in_stock'
}

export function getStockPercentage(item: InventoryItem): number {
  return Math.round((item.availableStock / item.totalStock) * 100)
}

export function useInventory() {
  const [state, setState] = useState<InventoryState>({
    items: new Map(),
    isLoading: true,
    lastSync: null,
    error: null
  })

  // Initialize inventory
  useEffect(() => {
    const itemsMap = new Map<number, InventoryItem>()
    initialInventory.forEach(item => itemsMap.set(item.id, item))

    setState({
      items: itemsMap,
      isLoading: false,
      lastSync: new Date(),
      error: null
    })
  }, [])

  // Simulate real-time stock updates (like from a backend/websocket)
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        const newItems = new Map(prev.items)

        // Randomly update 1-2 items to simulate real-time changes
        const itemIds = Array.from(newItems.keys())
        const itemsToUpdate = Math.floor(Math.random() * 2) + 1

        for (let i = 0; i < itemsToUpdate; i++) {
          const randomId = itemIds[Math.floor(Math.random() * itemIds.length)]
          const item = newItems.get(randomId)

          if (item && item.availableStock > 0) {
            // Simulate random stock changes (-3 to +1)
            const change = Math.floor(Math.random() * 5) - 3
            const newAvailable = Math.max(0, Math.min(item.totalStock, item.availableStock + change))

            newItems.set(randomId, {
              ...item,
              availableStock: newAvailable,
              lastUpdated: new Date()
            })
          }
        }

        return {
          ...prev,
          items: newItems,
          lastSync: new Date()
        }
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getItem = useCallback((id: number): InventoryItem | undefined => {
    return state.items.get(id)
  }, [state.items])

  const getItemStatus = useCallback((id: number): StockStatus | null => {
    const item = state.items.get(id)
    if (!item) return null
    return getStockStatus(item)
  }, [state.items])

  const getItemStockPercentage = useCallback((id: number): number => {
    const item = state.items.get(id)
    if (!item) return 0
    return getStockPercentage(item)
  }, [state.items])

  const reserveItem = useCallback((id: number, quantity: number = 1): boolean => {
    const item = state.items.get(id)
    if (!item) return false

    const available = item.availableStock - item.reservedStock
    if (available < quantity) return false

    setState(prev => {
      const newItems = new Map(prev.items)
      const currentItem = newItems.get(id)
      if (currentItem) {
        newItems.set(id, {
          ...currentItem,
          reservedStock: currentItem.reservedStock + quantity,
          lastUpdated: new Date()
        })
      }
      return { ...prev, items: newItems }
    })

    return true
  }, [state.items])

  const releaseReservation = useCallback((id: number, quantity: number = 1): boolean => {
    const item = state.items.get(id)
    if (!item || item.reservedStock < quantity) return false

    setState(prev => {
      const newItems = new Map(prev.items)
      const currentItem = newItems.get(id)
      if (currentItem) {
        newItems.set(id, {
          ...currentItem,
          reservedStock: Math.max(0, currentItem.reservedStock - quantity),
          lastUpdated: new Date()
        })
      }
      return { ...prev, items: newItems }
    })

    return true
  }, [state.items])

  const confirmPurchase = useCallback((id: number, quantity: number = 1): boolean => {
    const item = state.items.get(id)
    if (!item) return false

    // Check if there's a reservation we can fulfill
    if (item.reservedStock < quantity) return false

    setState(prev => {
      const newItems = new Map(prev.items)
      const currentItem = newItems.get(id)
      if (currentItem) {
        newItems.set(id, {
          ...currentItem,
          availableStock: currentItem.availableStock - quantity,
          reservedStock: currentItem.reservedStock - quantity,
          lastUpdated: new Date()
        })
      }
      return { ...prev, items: newItems }
    })

    return true
  }, [state.items])

  const allItems = useMemo(() => {
    return Array.from(state.items.values())
  }, [state.items])

  const lowStockItems = useMemo(() => {
    return allItems.filter(item => {
      const status = getStockStatus(item)
      return status === 'low_stock' || status === 'out_of_stock'
    })
  }, [allItems])

  return {
    items: allItems,
    lowStockItems,
    isLoading: state.isLoading,
    lastSync: state.lastSync,
    error: state.error,
    getItem,
    getItemStatus,
    getItemStockPercentage,
    reserveItem,
    releaseReservation,
    confirmPurchase
  }
}
