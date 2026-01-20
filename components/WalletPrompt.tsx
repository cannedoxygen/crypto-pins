'use client'

import { FC, useCallback, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

interface WalletPromptProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  actionLabel?: string
  onSuccess?: () => void
}

export const WalletPrompt: FC<WalletPromptProps> = ({
  isOpen,
  onClose,
  title = 'Connect Your Wallet',
  description = 'Connect your Solana wallet to continue',
  actionLabel = 'Connect Wallet',
  onSuccess,
}) => {
  const { connected, connecting } = useWallet()
  const { setVisible } = useWalletModal()

  const handleConnect = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  useEffect(() => {
    if (connected && isOpen) {
      onSuccess?.()
      onClose()
    }
  }, [connected, isOpen, onClose, onSuccess])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md mx-4 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-solana-purple to-solana-green flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 mb-6">{description}</p>

          <button
            onClick={handleConnect}
            disabled={connecting}
            className="w-full px-6 py-3 bg-gradient-to-r from-solana-purple to-solana-blue rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-solana-purple/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {connecting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Connecting...
              </span>
            ) : (
              actionLabel
            )}
          </button>

          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" />
              </svg>
              Supports Phantom, Solflare & more
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletPrompt
