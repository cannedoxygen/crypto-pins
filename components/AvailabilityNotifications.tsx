'use client'

import { useState, useEffect, useCallback } from 'react'
import { AvailabilityEvent, AvailabilityEventType } from '@/lib/useAvailabilityUpdates'

interface Toast {
  id: string
  event: AvailabilityEvent
  visible: boolean
}

interface AvailabilityNotificationsProps {
  events: AvailabilityEvent[]
  onDismiss?: (eventId: string) => void
  maxVisible?: number
  autoDismissMs?: number
}

const eventConfig: Record<AvailabilityEventType, {
  icon: string
  bgColor: string
  borderColor: string
  textColor: string
  title: string
}> = {
  sold_out: {
    icon: '🚫',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    title: 'Sold Out'
  },
  back_in_stock: {
    icon: '🎉',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
    title: 'Back In Stock!'
  },
  low_stock_alert: {
    icon: '⚠️',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
    title: 'Low Stock Alert'
  },
  restock_soon: {
    icon: '📦',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    title: 'Restock Coming'
  },
  status_changed: {
    icon: '🔄',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    title: 'Availability Update'
  }
}

export default function AvailabilityNotifications({
  events,
  onDismiss,
  maxVisible = 3,
  autoDismissMs = 5000
}: AvailabilityNotificationsProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [processedIds, setProcessedIds] = useState<Set<string>>(new Set())

  // Process new events into toasts
  useEffect(() => {
    events.forEach(event => {
      const eventId = `${event.item.id}-${event.timestamp.getTime()}`

      if (!processedIds.has(eventId)) {
        setProcessedIds(prev => new Set([...prev, eventId]))
        setToasts(prev => [
          { id: eventId, event, visible: true },
          ...prev
        ].slice(0, maxVisible + 2)) // Keep a few extra for smooth transitions
      }
    })
  }, [events, processedIds, maxVisible])

  // Auto-dismiss toasts
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    toasts.forEach(toast => {
      if (toast.visible) {
        const timer = setTimeout(() => {
          dismissToast(toast.id)
        }, autoDismissMs)
        timers.push(timer)
      }
    })

    return () => timers.forEach(t => clearTimeout(t))
  }, [toasts, autoDismissMs])

  const dismissToast = useCallback((id: string) => {
    setToasts(prev =>
      prev.map(t =>
        t.id === id ? { ...t, visible: false } : t
      )
    )

    // Remove from DOM after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
      onDismiss?.(id)
    }, 300)
  }, [onDismiss])

  const visibleToasts = toasts.filter(t => t.visible).slice(0, maxVisible)

  if (visibleToasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
      {visibleToasts.map((toast, index) => {
        const config = eventConfig[toast.event.type]

        return (
          <div
            key={toast.id}
            className={`
              ${config.bgColor} ${config.borderColor}
              border backdrop-blur-md rounded-xl p-4 shadow-2xl
              transform transition-all duration-300 ease-out
              ${toast.visible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0'
              }
            `}
            style={{
              transform: toast.visible
                ? `translateY(${-index * 8}px) scale(${1 - index * 0.02})`
                : 'translateX(100%)'
            }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="text-2xl flex-shrink-0">
                {config.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold ${config.textColor}`}>
                    {config.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {toast.event.timestamp.toLocaleTimeString()}
                  </span>
                </div>

                <p className="text-sm text-gray-300 leading-tight">
                  {toast.event.message}
                </p>

                {/* Action buttons for specific events */}
                {toast.event.type === 'low_stock_alert' && (
                  <button className="mt-2 px-3 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full hover:bg-orange-500/30 transition-colors">
                    Buy Now
                  </button>
                )}

                {toast.event.type === 'sold_out' && (
                  <button className="mt-2 px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors">
                    Notify When Available
                  </button>
                )}

                {toast.event.type === 'back_in_stock' && (
                  <button className="mt-2 px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors">
                    View Item
                  </button>
                )}
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => dismissToast(toast.id)}
                className="flex-shrink-0 text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress bar for auto-dismiss */}
            <div className="mt-3 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${config.textColor.replace('text-', 'bg-')} rounded-full`}
                style={{
                  animation: `shrink ${autoDismissMs}ms linear forwards`
                }}
              />
            </div>
          </div>
        )
      })}

      {/* CSS for progress bar animation */}
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

// Compact notification bell with unread count
export function NotificationBell({
  unreadCount,
  onClick
}: {
  unreadCount: number
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
    >
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>

      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-solana-purple text-white text-xs font-bold rounded-full animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}

// Notification history panel
export function NotificationHistory({
  events,
  isOpen,
  onClose
}: {
  events: AvailabilityEvent[]
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Availability Updates</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Events list */}
        <div className="max-h-96 overflow-y-auto">
          {events.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p>No updates yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {events.map((event, index) => {
                const config = eventConfig[event.type]
                const eventId = `${event.item.id}-${event.timestamp.getTime()}`

                return (
                  <div
                    key={eventId}
                    className={`p-4 hover:bg-white/5 transition-colors ${config.bgColor}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{config.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-medium ${config.textColor}`}>
                            {config.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {event.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {event.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
