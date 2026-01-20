'use client'

import { useState, useCallback } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

// Treasury wallet for receiving payments (placeholder - should be configured)
const TREASURY_WALLET = new PublicKey('11111111111111111111111111111111')

export interface NFTCollection {
  id: number
  name: string
  description: string
  totalSupply: number
  minted: number
  floorPrice: string
  priceInSol: number
  icon: string
  gradient: string
}

export interface PurchaseState {
  isPurchasing: boolean
  isConfirming: boolean
  isSuccess: boolean
  isError: boolean
  error: string | null
  txSignature: string | null
}

export function useNFTPurchase() {
  const { connection } = useConnection()
  const { publicKey, connected, sendTransaction } = useWallet()
  const { setVisible } = useWalletModal()

  const [purchaseState, setPurchaseState] = useState<PurchaseState>({
    isPurchasing: false,
    isConfirming: false,
    isSuccess: false,
    isError: false,
    error: null,
    txSignature: null,
  })

  const resetState = useCallback(() => {
    setPurchaseState({
      isPurchasing: false,
      isConfirming: false,
      isSuccess: false,
      isError: false,
      error: null,
      txSignature: null,
    })
  }, [])

  const promptWalletConnection = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  const purchaseNFT = useCallback(
    async (collection: NFTCollection): Promise<boolean> => {
      if (!connected || !publicKey) {
        promptWalletConnection()
        return false
      }

      setPurchaseState({
        isPurchasing: true,
        isConfirming: false,
        isSuccess: false,
        isError: false,
        error: null,
        txSignature: null,
      })

      try {
        const lamports = Math.floor(collection.priceInSol * LAMPORTS_PER_SOL)

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: TREASURY_WALLET,
            lamports,
          })
        )

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
        transaction.recentBlockhash = blockhash
        transaction.feePayer = publicKey

        setPurchaseState(prev => ({
          ...prev,
          isConfirming: true,
        }))

        const signature = await sendTransaction(transaction, connection)

        await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        })

        setPurchaseState({
          isPurchasing: false,
          isConfirming: false,
          isSuccess: true,
          isError: false,
          error: null,
          txSignature: signature,
        })

        return true
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Transaction failed'

        setPurchaseState({
          isPurchasing: false,
          isConfirming: false,
          isSuccess: false,
          isError: true,
          error: errorMessage,
          txSignature: null,
        })

        return false
      }
    },
    [connected, publicKey, connection, sendTransaction, promptWalletConnection]
  )

  return {
    purchaseNFT,
    purchaseState,
    resetState,
    promptWalletConnection,
    isWalletConnected: connected,
    walletAddress: publicKey?.toBase58() || null,
  }
}

export default useNFTPurchase
