'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { InventoryItem, StockStatus, getStockStatus } from './useInventory'

export type AvailabilityEventType =
  | 'status_changed'
  | 'low_stock_alert'
  | 'back_in_stock'
  | 'sold_out'
  | 'restock_soon'

export interface AvailabilityEvent {
  type: AvailabilityEventType
  item: InventoryItem
  previousStatus?: StockStatus
  newStatus: StockStatus
  timestamp: Date
  message: string
}

export interface AvailabilitySubscription {
  itemId?: number // Subscribe to specific item, or all if undefined
  events: AvailabilityEventType[]
  callback: (event: AvailabilityEvent) => void
}

interface UseAvailabilityUpdatesOptions {
  items: InventoryItem[]
  autoNotify?: boolean
  lowStockThreshold?: number
}

export function useAvailabilityUpdates({
  items,
  autoNotify = true,
  lowStockThreshold = 50
}: UseAvailabilityUpdatesOptions) {
  const [events, setEvents] = useState<AvailabilityEvent[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const previousItems = useRef<Map<number, InventoryItem>>(new Map())
  const subscriptions = useRef<AvailabilitySubscription[]>([])

  // Generate appropriate message for status changes
  const getEventMessage = useCallback((
    item: InventoryItem,
    eventType: AvailabilityEventType,
    previousStatus?: StockStatus,
    newStatus?: StockStatus
  ): string => {
    const available = item.availableStock - item.reservedStock

    switch (eventType) {
      case 'sold_out':
        return `${item.name} is now sold out!`
      case 'back_in_stock':
        return `${item.name} is back in stock! ${available} available`
      case 'low_stock_alert':
        return `Only ${available} ${item.name} pins left - get yours before they're gone!`
      case 'restock_soon':
        return `${item.name} will be restocked soon`
      case 'status_changed':
        return `${item.name} availability changed from ${previousStatus} to ${newStatus}`
      default:
        return `${item.name} availability updated`
    }
  }, [])

  // Notify subscribers of an event
  const notifySubscribers = useCallback((event: AvailabilityEvent) => {
    subscriptions.current.forEach(sub => {
      const matchesItem = sub.itemId === undefined || sub.itemId === event.item.id
      const matchesEvent = sub.events.includes(event.type)

      if (matchesItem && matchesEvent) {
        sub.callback(event)
      }
    })
  }, [])

  // Create and dispatch an availability event
  const dispatchEvent = useCallback((
    item: InventoryItem,
    type: AvailabilityEventType,
    previousStatus?: StockStatus,
    newStatus?: StockStatus
  ) => {
    const event: AvailabilityEvent = {
      type,
      item,
      previousStatus,
      newStatus: newStatus || getStockStatus(item),
      timestamp: new Date(),
      message: getEventMessage(item, type, previousStatus, newStatus)
    }

    setEvents(prev => [event, ...prev].slice(0, 50)) // Keep last 50 events
    setUnreadCount(prev => prev + 1)
    notifySubscribers(event)

    return event
  }, [getEventMessage, notifySubscribers])

  // Monitor items for availability changes
  useEffect(() => {
    items.forEach(item => {
      const previousItem = previousItems.current.get(item.id)

      if (previousItem) {
        const previousStatus = getStockStatus(previousItem)
        const currentStatus = getStockStatus(item)
        const previousAvailable = previousItem.availableStock - previousItem.reservedStock
        const currentAvailable = item.availableStock - item.reservedStock

        // Check for status changes
        if (previousStatus !== currentStatus) {
          // Sold out event
          if (currentStatus === 'out_of_stock') {
            dispatchEvent(item, 'sold_out', previousStatus, currentStatus)
          }
          // Back in stock event
          else if (previousStatus === 'out_of_stock') {
            dispatchEvent(item, 'back_in_stock', previousStatus, currentStatus)
          }
          // General status change
          else {
            dispatchEvent(item, 'status_changed', previousStatus, currentStatus)
          }
        }

        // Low stock alert - when dropping below threshold
        if (
          previousAvailable > lowStockThreshold &&
          currentAvailable <= lowStockThreshold &&
          currentAvailable > 0
        ) {
          dispatchEvent(item, 'low_stock_alert', previousStatus, currentStatus)
        }
      }

      // Update previous items reference
      previousItems.current.set(item.id, { ...item })
    })
  }, [items, lowStockThreshold, dispatchEvent])

  // Subscribe to availability events
  const subscribe = useCallback((subscription: AvailabilitySubscription) => {
    subscriptions.current.push(subscription)

    return () => {
      subscriptions.current = subscriptions.current.filter(s => s !== subscription)
    }
  }, [])

  // Clear all events
  const clearEvents = useCallback(() => {
    setEvents([])
    setUnreadCount(0)
  }, [])

  // Mark events as read
  const markAsRead = useCallback(() => {
    setUnreadCount(0)
  }, [])

  // Get events for a specific item
  const getItemEvents = useCallback((itemId: number) => {
    return events.filter(e => e.item.id === itemId)
  }, [events])

  // Get recent events of a specific type
  const getEventsByType = useCallback((type: AvailabilityEventType) => {
    return events.filter(e => e.type === type)
  }, [events])

  return {
    events,
    unreadCount,
    subscribe,
    clearEvents,
    markAsRead,
    getItemEvents,
    getEventsByType,
    dispatchEvent
  }
}

// Notification preferences type
export interface NotificationPreferences {
  enableLowStockAlerts: boolean
  enableBackInStockAlerts: boolean
  enableSoldOutAlerts: boolean
  watchedItems: number[]
}

// Default notification preferences
export const defaultNotificationPreferences: NotificationPreferences = {
  enableLowStockAlerts: true,
  enableBackInStockAlerts: true,
  enableSoldOutAlerts: true,
  watchedItems: []
}
