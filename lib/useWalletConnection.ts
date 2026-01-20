'use client'

import { useCallback, useMemo } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function useWalletConnection() {
  const { connection } = useConnection()
  const {
    publicKey,
    wallet,
    connected,
    connecting,
    disconnect,
    select,
    wallets,
  } = useWallet()

  const walletAddress = useMemo(() => publicKey?.toBase58() || null, [publicKey])

  const truncatedAddress = useMemo(() => {
    if (!walletAddress) return null
    return walletAddress.slice(0, 4) + '...' + walletAddress.slice(-4)
  }, [walletAddress])

  const getBalance = useCallback(async () => {
    if (!publicKey) return null
    try {
      const balance = await connection.getBalance(publicKey)
      return balance / LAMPORTS_PER_SOL
    } catch (error) {
      console.error('Error fetching balance:', error)
      return null
    }
  }, [connection, publicKey])

  const walletName = useMemo(() => wallet?.adapter.name || null, [wallet])

  const walletIcon = useMemo(() => wallet?.adapter.icon || null, [wallet])

  return {
    // Connection state
    connected,
    connecting,
    publicKey,
    walletAddress,
    truncatedAddress,

    // Wallet info
    wallet,
    walletName,
    walletIcon,

    // Available wallets
    wallets,

    // Actions
    disconnect,
    select,
    getBalance,

    // Solana connection
    connection,
  }
}

export default useWalletConnection
