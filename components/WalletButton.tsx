'use client'

import { FC, useCallback, useMemo } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

interface WalletButtonProps {
  className?: string
}

export const WalletButton: FC<WalletButtonProps> = ({ className }) => {
  const { publicKey, wallet, disconnect, connecting, connected } = useWallet()
  const { setVisible } = useWalletModal()

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey])

  const truncatedAddress = useMemo(() => {
    if (!base58) return null
    return base58.slice(0, 4) + '...' + base58.slice(-4)
  }, [base58])

  const handleClick = useCallback(() => {
    if (connected) {
      disconnect()
    } else {
      setVisible(true)
    }
  }, [connected, disconnect, setVisible])

  const buttonContent = useMemo(() => {
    if (connecting) return 'Connecting...'
    if (connected && wallet) {
      return (
        <span className="flex items-center gap-2">
          {wallet.adapter.icon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={wallet.adapter.icon}
              alt={wallet.adapter.name}
              className="w-4 h-4"
            />
          )}
          {truncatedAddress}
        </span>
      )
    }
    return 'Connect Wallet'
  }, [connecting, connected, wallet, truncatedAddress])

  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      className={`
        px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
        ${connected
          ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
          : 'bg-gradient-to-r from-solana-purple to-solana-blue text-white hover:opacity-90'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className || ''}
      `}
    >
      {buttonContent}
    </button>
  )
}

export default WalletButton
