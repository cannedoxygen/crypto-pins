'use client'

import { useState, useCallback } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

export interface ClaimState {
  isClaiming: boolean
  isConfirming: boolean
  isSuccess: boolean
  isError: boolean
  error: string | null
  txSignature: string | null
  claimedAmount: number | null
}

export function useClaimRewards() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const { setVisible } = useWalletModal()

  const [claimState, setClaimState] = useState<ClaimState>({
    isClaiming: false,
    isConfirming: false,
    isSuccess: false,
    isError: false,
    error: null,
    txSignature: null,
    claimedAmount: null,
  })

  const resetState = useCallback(() => {
    setClaimState({
      isClaiming: false,
      isConfirming: false,
      isSuccess: false,
      isError: false,
      error: null,
      txSignature: null,
      claimedAmount: null,
    })
  }, [])

  const promptWalletConnection = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  const claimRewards = useCallback(
    async (pendingAmount: number): Promise<boolean> => {
      if (!connected || !publicKey) {
        promptWalletConnection()
        return false
      }

      if (pendingAmount < 0.01) {
        setClaimState(prev => ({
          ...prev,
          isError: true,
          error: 'Minimum claim amount is 0.01 SOL',
        }))
        return false
      }

      setClaimState({
        isClaiming: true,
        isConfirming: false,
        isSuccess: false,
        isError: false,
        error: null,
        txSignature: null,
        claimedAmount: null,
      })

      try {
        setClaimState(prev => ({
          ...prev,
          isConfirming: true,
        }))

        // Simulate claim processing time
        // In production, this would call a rewards distribution smart contract
        await new Promise(resolve => setTimeout(resolve, 2000))

        // For demo, we simulate a successful claim
        const walletStr = publicKey.toBase58()
        const mockSignature = `claim_${Date.now()}_${walletStr.slice(0, 8)}`

        setClaimState({
          isClaiming: false,
          isConfirming: false,
          isSuccess: true,
          isError: false,
          error: null,
          txSignature: mockSignature,
          claimedAmount: pendingAmount,
        })

        return true
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Claim failed'

        setClaimState({
          isClaiming: false,
          isConfirming: false,
          isSuccess: false,
          isError: true,
          error: errorMessage,
          txSignature: null,
          claimedAmount: null,
        })

        return false
      }
    },
    [connected, publicKey, connection, promptWalletConnection]
  )

  return {
    claimRewards,
    claimState,
    resetState,
    promptWalletConnection,
    isWalletConnected: connected,
    walletAddress: publicKey?.toBase58() || null,
  }
}

export default useClaimRewards
