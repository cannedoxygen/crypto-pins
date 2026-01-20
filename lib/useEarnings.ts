'use client'

import { useState, useEffect, useCallback } from 'react'

export interface EarningsData {
  totalEarnings: number
  pendingRewards: number
  claimedRewards: number
  lastClaimTimestamp: number
  rewardRate: number
}

export interface CollectionEarning {
  id: number
  name: string
  nftsOwned: number
  totalEarned: number
  pendingAmount: number
  sharePercentage: number
  icon: string
  gradient: string
}

export interface Transaction {
  id: string
  type: 'claim' | 'reward'
  amount: number
  timestamp: number
  collection: string
}

const generateTransactionId = () => Math.random().toString(36).substring(2, 15)

const mockCollectionEarnings: CollectionEarning[] = [
  {
    id: 1,
    name: 'Genesis Collection',
    nftsOwned: 3,
    totalEarned: 12.45,
    pendingAmount: 0.89,
    sharePercentage: 0.3,
    icon: '👑',
    gradient: 'from-yellow-500 via-orange-500 to-red-500'
  },
  {
    id: 2,
    name: 'Meme Legends',
    nftsOwned: 5,
    totalEarned: 8.92,
    pendingAmount: 0.54,
    sharePercentage: 0.25,
    icon: '🔥',
    gradient: 'from-pink-500 via-purple-500 to-indigo-500'
  },
  {
    id: 3,
    name: 'Ecosystem Heroes',
    nftsOwned: 2,
    totalEarned: 15.67,
    pendingAmount: 1.23,
    sharePercentage: 0.45,
    icon: '⚡',
    gradient: 'from-cyan-500 via-blue-500 to-purple-500'
  }
]

interface UseEarningsOptions {
  enableRealtime?: boolean
  updateInterval?: number
}

export function useEarnings(options: UseEarningsOptions = {}) {
  const { enableRealtime = true, updateInterval = 2000 } = options

  const [earnings, setEarnings] = useState<EarningsData>({
    totalEarnings: 37.04,
    pendingRewards: 2.66,
    claimedRewards: 34.38,
    lastClaimTimestamp: Date.now() - 86400000 * 3,
    rewardRate: 0.0012
  })

  const [collectionEarnings, setCollectionEarnings] = useState<CollectionEarning[]>(mockCollectionEarnings)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLive, setIsLive] = useState(enableRealtime)
  const [isClaimingRewards, setIsClaimingRewards] = useState(false)

  // Generate initial transactions
  useEffect(() => {
    const initialTransactions: Transaction[] = []
    const collections = ['Genesis Collection', 'Meme Legends', 'Ecosystem Heroes']

    for (let i = 0; i < 8; i++) {
      initialTransactions.push({
        id: generateTransactionId(),
        type: Math.random() > 0.3 ? 'reward' : 'claim',
        amount: parseFloat((Math.random() * 0.5 + 0.1).toFixed(4)),
        timestamp: Date.now() - (i * 3600000 * Math.random() * 12),
        collection: collections[Math.floor(Math.random() * collections.length)]
      })
    }

    setTransactions(initialTransactions.sort((a, b) => b.timestamp - a.timestamp))
  }, [])

  // Real-time earnings simulation
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const rewardIncrement = parseFloat((Math.random() * 0.005 + 0.001).toFixed(6))

      setEarnings(prev => ({
        ...prev,
        totalEarnings: parseFloat((prev.totalEarnings + rewardIncrement).toFixed(4)),
        pendingRewards: parseFloat((prev.pendingRewards + rewardIncrement).toFixed(4))
      }))

      setCollectionEarnings(prev =>
        prev.map(col => ({
          ...col,
          pendingAmount: parseFloat((col.pendingAmount + (rewardIncrement * col.sharePercentage)).toFixed(4)),
          totalEarned: parseFloat((col.totalEarned + (rewardIncrement * col.sharePercentage)).toFixed(4))
        }))
      )

      // Occasionally add a new transaction
      if (Math.random() > 0.7) {
        const collections = ['Genesis Collection', 'Meme Legends', 'Ecosystem Heroes']
        setTransactions(prev => [
          {
            id: generateTransactionId(),
            type: 'reward',
            amount: parseFloat((Math.random() * 0.1 + 0.01).toFixed(4)),
            timestamp: Date.now(),
            collection: collections[Math.floor(Math.random() * collections.length)]
          },
          ...prev.slice(0, 19)
        ])
      }
    }, updateInterval)

    return () => clearInterval(interval)
  }, [isLive, updateInterval])

  const claimRewards = useCallback(async () => {
    if (earnings.pendingRewards < 0.01) return false

    setIsClaimingRewards(true)

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000))

    const claimedAmount = earnings.pendingRewards

    setTransactions(prev => [
      {
        id: generateTransactionId(),
        type: 'claim',
        amount: claimedAmount,
        timestamp: Date.now(),
        collection: 'All Collections'
      },
      ...prev.slice(0, 19)
    ])

    setEarnings(prev => ({
      ...prev,
      pendingRewards: 0,
      claimedRewards: parseFloat((prev.claimedRewards + claimedAmount).toFixed(4)),
      lastClaimTimestamp: Date.now()
    }))

    setCollectionEarnings(prev =>
      prev.map(col => ({
        ...col,
        pendingAmount: 0
      }))
    )

    setIsClaimingRewards(false)
    return true
  }, [earnings.pendingRewards])

  const toggleLiveUpdates = useCallback(() => {
    setIsLive(prev => !prev)
  }, [])

  return {
    earnings,
    collectionEarnings,
    transactions,
    isLive,
    isClaimingRewards,
    claimRewards,
    toggleLiveUpdates
  }
}

export function formatTimestamp(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export function solToUsd(sol: number, rate: number = 98.5): number {
  return sol * rate
}
