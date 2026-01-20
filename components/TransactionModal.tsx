'use client'

import { FC } from 'react'

type TransactionStatus = 'pending' | 'confirming' | 'success' | 'error'

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  status: TransactionStatus
  title?: string
  message?: string
  txSignature?: string | null
  amount?: number
  actionLabel?: string
  onAction?: () => void
}

export const TransactionModal: FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  status,
  title,
  message,
  txSignature,
  amount,
  actionLabel = 'Close',
  onAction,
}) => {
  if (!isOpen) return null

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
      case 'confirming':
        return (
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-solana-blue/20 flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-solana-blue" viewBox="0 0 24 24">
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
          </div>
        )
      case 'success':
        return (
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-solana-green/20 flex items-center justify-center animate-bounce-once">
            <svg className="w-8 h-8 text-solana-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      case 'error':
        return (
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )
    }
  }

  const getDefaultTitle = () => {
    switch (status) {
      case 'pending':
        return 'Preparing Transaction'
      case 'confirming':
        return 'Confirming Transaction'
      case 'success':
        return 'Transaction Successful'
      case 'error':
        return 'Transaction Failed'
    }
  }

  const getDefaultMessage = () => {
    switch (status) {
      case 'pending':
        return 'Please approve the transaction in your wallet...'
      case 'confirming':
        return 'Waiting for blockchain confirmation...'
      case 'success':
        return 'Your transaction has been confirmed on the Solana blockchain.'
      case 'error':
        return 'Something went wrong. Please try again.'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={status === 'success' || status === 'error' ? onClose : undefined}
      />

      <div className="relative w-full max-w-md mx-4 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl">
        {(status === 'success' || status === 'error') && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="text-center">
          {getStatusIcon()}

          <h3 className="text-2xl font-bold text-white mb-2">{title || getDefaultTitle()}</h3>
          <p className="text-gray-400 mb-4">{message || getDefaultMessage()}</p>

          {status === 'success' && amount !== undefined && (
            <div className="mb-4 p-4 rounded-xl bg-solana-green/10 border border-solana-green/20">
              <div className="text-3xl font-bold text-solana-green">
                +{amount.toFixed(4)} SOL
              </div>
              <div className="text-sm text-gray-400">
                Claimed to your wallet
              </div>
            </div>
          )}

          {status === 'success' && txSignature && (
            <a
              href={`https://solscan.io/tx/${txSignature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-solana-blue hover:text-solana-green transition-colors mb-4"
            >
              View on Solscan
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}

          {(status === 'success' || status === 'error') && (
            <button
              onClick={onAction || onClose}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                status === 'success'
                  ? 'bg-gradient-to-r from-solana-green to-solana-blue text-black hover:shadow-lg hover:shadow-solana-green/50'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-once {
          animation: bounce-once 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default TransactionModal
