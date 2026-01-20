import EarningsTracker from '@/components/EarningsTracker'

export const metadata = {
  title: 'Earnings Dashboard - Crypto Pins',
  description: 'Track your real-time earnings from NFT pin holdings',
}

export default function EarningsPage() {
  return (
    <main className="min-h-screen bg-black">
      <EarningsTracker />

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">How Earnings Work</h3>

          <div className="grid gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-lg font-semibold text-solana-green mb-2">How do I earn rewards?</h4>
              <p className="text-gray-400">
                When you own an NFT pin, you automatically receive a share of every physical pin sale
                from that collection. Rewards accumulate in real-time and can be claimed anytime.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-lg font-semibold text-solana-blue mb-2">What percentage do I earn?</h4>
              <p className="text-gray-400">
                Each collection has different profit-sharing rates based on rarity and supply.
                Genesis Collection holders receive the highest share at 5% of all sales, while
                other collections range from 2-4%.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-lg font-semibold text-solana-purple mb-2">How do I claim my rewards?</h4>
              <p className="text-gray-400">
                Simply connect your Solana wallet and click the &quot;Claim Rewards&quot; button when you have
                pending rewards. Rewards are sent directly to your wallet with minimal gas fees thanks
                to Solana&apos;s low transaction costs.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-2">Is there a minimum claim amount?</h4>
              <p className="text-gray-400">
                Yes, to prevent unnecessary transaction fees, the minimum claimable amount is 0.01 SOL.
                Your rewards will continue accumulating until you meet this threshold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>Built on Solana. Real pins. Real NFTs. Real earnings.</p>
        </div>
      </footer>
    </main>
  )
}
