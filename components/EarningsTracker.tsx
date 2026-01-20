'use client'

import { useState, useEffect, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEarnings, formatTimestamp, solToUsd } from '@/lib/useEarnings'
import { useClaimRewards } from '@/lib/useClaimRewards'
import WalletPrompt from './WalletPrompt'
import TransactionModal from './TransactionModal'

export default function EarningsTracker() {
  const { connected, publicKey } = useWallet()
  const {
    earnings,
    collectionEarnings,
    transactions,
    isLive,
    toggleLiveUpdates,
  } = useEarnings()

  const {
    claimRewards,
    claimState,
    resetState: resetClaimState,
  } = useClaimRewards()

  const [showWalletPrompt, setShowWalletPrompt] = useState(false)
  const [localPendingRewards, setLocalPendingRewards] = useState(earnings.pendingRewards)
  const [localClaimedRewards, setLocalClaimedRewards] = useState(earnings.claimedRewards)
  const [localCollectionEarnings, setLocalCollectionEarnings] = useState(collectionEarnings)

  useEffect(() => {
    setLocalPendingRewards(earnings.pendingRewards)
    setLocalClaimedRewards(earnings.claimedRewards)
  }, [earnings.pendingRewards, earnings.claimedRewards])

  useEffect(() => {
    setLocalCollectionEarnings(collectionEarnings)
  }, [collectionEarnings])

  useEffect(() => {
    if (claimState.isSuccess && claimState.claimedAmount) {
      setLocalPendingRewards(0)
      setLocalClaimedRewards(prev => prev + claimState.claimedAmount!)
      setLocalCollectionEarnings(prev =>
        prev.map(col => ({ ...col, pendingAmount: 0 }))
      )
    }
  }, [claimState.isSuccess, claimState.claimedAmount])

  const handleClaimRewards = useCallback(async () => {
    if (!connected) {
      setShowWalletPrompt(true)
      return
    }

    if (localPendingRewards < 0.01) return

    await claimRewards(localPendingRewards)
  }, [connected, localPendingRewards, claimRewards])

  const handleWalletConnected = useCallback(() => {
    if (localPendingRewards >= 0.01) {
      claimRewards(localPendingRewards)
    }
  }, [localPendingRewards, claimRewards])

  const getClaimStatus = () => {
    if (claimState.isClaiming && !claimState.isConfirming) return 'pending'
    if (claimState.isConfirming) return 'confirming'
    if (claimState.isSuccess) return 'success'
    if (claimState.isError) return 'error'
    return 'pending'
  }

  const showTransactionModal =
    claimState.isClaiming ||
    claimState.isConfirming ||
    claimState.isSuccess ||
    claimState.isError

  const truncatedAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,241,149,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,241,149,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-solana-green/20 to-solana-blue/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-solana-purple/20 to-solana-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solana-green/10 border border-solana-green/20 backdrop-blur-sm mb-6">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-solana-green animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-sm font-medium text-solana-green">
              {isLive ? 'Live Earnings Tracker' : 'Paused'}
            </span>
            <button
              onClick={toggleLiveUpdates}
              className="ml-2 text-xs text-gray-400 hover:text-white transition-colors"
            >
              {isLive ? 'Pause' : 'Resume'}
            </button>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-solana-green via-solana-blue to-solana-purple bg-clip-text text-transparent">
            Your Earnings
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Track your real-time profit share from physical pin sales across all your NFT holdings
          </p>

          {connected && truncatedAddress && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-solana-green rounded-full" />
              <span className="text-sm text-gray-400">Connected: {truncatedAddress}</span>
            </div>
          )}
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-solana-green/30 backdrop-blur-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-solana-green via-solana-blue to-solana-purple" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">Total Earnings</div>
              <div className="text-5xl font-bold bg-gradient-to-r from-solana-green to-solana-blue bg-clip-text text-transparent mb-2">
                {earnings.totalEarnings.toFixed(4)}
                <span className="text-2xl ml-2">SOL</span>
              </div>
              <div className="text-sm text-gray-500">
                ≈ ${solToUsd(earnings.totalEarnings).toFixed(2)} USD
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">Pending Rewards</div>
              <div className="text-5xl font-bold text-solana-purple mb-2">
                {localPendingRewards.toFixed(4)}
                <span className="text-2xl ml-2">SOL</span>
              </div>
              <button
                onClick={handleClaimRewards}
                disabled={claimState.isClaiming || localPendingRewards < 0.01}
                className={`
                  mt-2 px-6 py-2 rounded-lg font-semibold text-sm
                  transition-all duration-300 transform
                  ${localPendingRewards >= 0.01 && !claimState.isClaiming
                    ? 'bg-gradient-to-r from-solana-green to-solana-blue text-black hover:scale-105 hover:shadow-lg hover:shadow-solana-green/50'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {claimState.isClaiming ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Claiming...
                  </span>
                ) : connected ? (
                  'Claim Rewards'
                ) : (
                  'Connect to Claim'
                )}
              </button>
            </div>

            <div className="text-center md:text-right">
              <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">Total Claimed</div>
              <div className="text-5xl font-bold text-white mb-2">
                {localClaimedRewards.toFixed(4)}
                <span className="text-2xl ml-2">SOL</span>
              </div>
              <div className="text-sm text-gray-500">
                Last claim: {formatTimestamp(earnings.lastClaimTimestamp)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-solana-blue rounded-full animate-pulse" />
              Earnings by Collection
            </h3>

            <div className="space-y-4">
              {localCollectionEarnings.map(collection => (
                <div
                  key={collection.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${collection.gradient} flex items-center justify-center text-2xl`}>
                      {collection.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{collection.name}</span>
                        <span className="text-xs text-gray-500">{collection.nftsOwned} NFTs</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-solana-green font-semibold">
                            +{collection.pendingAmount.toFixed(4)} SOL
                          </span>
                          <span className="text-gray-500 ml-2">pending</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {collection.totalEarned.toFixed(4)} SOL total
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${collection.gradient} rounded-full`}
                        style={{ width: `${collection.sharePercentage * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{(collection.sharePercentage * 100).toFixed(0)}% share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-solana-purple rounded-full animate-pulse" />
              Recent Activity
            </h3>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {transactions.map(tx => (
                <div
                  key={tx.id}
                  className={`
                    p-3 rounded-xl border backdrop-blur-sm transition-all duration-300
                    ${tx.type === 'claim'
                      ? 'bg-solana-green/5 border-solana-green/20'
                      : 'bg-white/5 border-white/10'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center text-sm
                        ${tx.type === 'claim'
                          ? 'bg-solana-green/20 text-solana-green'
                          : 'bg-solana-blue/20 text-solana-blue'
                        }
                      `}>
                        {tx.type === 'claim' ? '↓' : '↑'}
                      </div>

                      <div>
                        <div className="text-sm font-medium text-white">
                          {tx.type === 'claim' ? 'Claimed Rewards' : 'Reward Earned'}
                        </div>
                        <div className="text-xs text-gray-500">{tx.collection}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-sm font-semibold ${tx.type === 'claim' ? 'text-solana-green' : 'text-white'}`}>
                        +{tx.amount.toFixed(4)} SOL
                      </div>
                      <div className="text-xs text-gray-500">{formatTimestamp(tx.timestamp)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl font-bold text-white">10</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">NFTs Owned</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl font-bold text-solana-green">3</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Collections</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl font-bold text-solana-blue">0.0012</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">SOL/Hour Rate</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl font-bold text-solana-purple">12</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Total Claims</div>
          </div>
        </div>

        {!connected && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-solana-purple/10 via-solana-blue/10 to-solana-green/10 border border-solana-purple/20 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Connect Your Wallet</h3>
                <p className="text-gray-400">Connect to claim your pending rewards and view your full earnings history</p>
              </div>
              <button
                onClick={() => setShowWalletPrompt(true)}
                className="px-6 py-3 bg-gradient-to-r from-solana-purple to-solana-blue rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-solana-purple/50"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>

      <WalletPrompt
        isOpen={showWalletPrompt}
        onClose={() => setShowWalletPrompt(false)}
        title="Connect to Claim"
        description="Connect your Solana wallet to claim your pending rewards. Rewards will be sent directly to your wallet."
        actionLabel="Connect Wallet"
        onSuccess={handleWalletConnected}
      />

      <TransactionModal
        isOpen={showTransactionModal}
        onClose={resetClaimState}
        status={getClaimStatus()}
        title={claimState.isSuccess ? 'Rewards Claimed!' : undefined}
        message={
          claimState.isSuccess
            ? 'Your rewards have been sent to your wallet. Keep holding your NFTs to continue earning!'
            : claimState.isError
            ? claimState.error || 'Claim failed'
            : undefined
        }
        txSignature={claimState.txSignature}
        amount={claimState.claimedAmount || undefined}
        actionLabel={claimState.isSuccess ? 'View Transaction' : 'Try Again'}
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(153, 69, 255, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(153, 69, 255, 0.5);
        }
      `}</style>
    </section>
  )
}
