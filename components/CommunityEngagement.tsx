'use client'

import { useState, FC } from 'react'

interface CommunityStats {
  label: string
  value: string
  icon: string
}

const communityStats: CommunityStats[] = [
  { label: 'Total Holders', value: '2,847', icon: '👥' },
  { label: 'Pins Sold', value: '12,500+', icon: '📌' },
  { label: 'SOL Distributed', value: '450+', icon: '💰' },
  { label: 'Countries', value: '47', icon: '🌍' },
]

export const CommunityEngagement: FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsSubmitting(false)
    setEmail('')
  }

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-black to-gray-900/80 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-solana-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-solana-green/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-solana-green to-solana-blue bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solana-purple/10 border border-solana-purple/20 backdrop-blur-sm mb-6">
            <span className="text-2xl">📬</span>
            <span className="text-sm font-medium text-solana-purple">Stay Updated</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss a Drop
          </h3>
          <p className="text-gray-400 mb-8">
            Get exclusive early access to new pin releases, NFT drops, and community events.
          </p>

          {isSubscribed ? (
            <div className="p-6 rounded-2xl bg-solana-green/10 border border-solana-green/30">
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-solana-green font-semibold text-lg">You're on the list!</p>
              <p className="text-gray-400 text-sm mt-2">Check your inbox for a welcome surprise.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex-1 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-solana-purple/50 focus:ring-2 focus:ring-solana-purple/20 transition-all duration-300"
                />
                {error && <p className="text-red-400 text-sm mt-2 text-left">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-solana-purple to-solana-blue font-semibold text-white hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Engagement Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Invite Friends */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-solana-purple/10 to-transparent border border-solana-purple/20 hover:border-solana-purple/40 transition-all duration-300">
            <div className="text-4xl mb-4">🎁</div>
            <h4 className="text-xl font-bold text-white mb-2">Invite Friends</h4>
            <p className="text-gray-400 text-sm mb-4">
              Earn bonus rewards when friends join and make their first purchase.
            </p>
            <button className="w-full py-3 rounded-lg bg-solana-purple/20 text-solana-purple font-medium hover:bg-solana-purple/30 transition-colors">
              Get Referral Link
            </button>
          </div>

          {/* Join Discord */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300">
            <div className="text-4xl mb-4">💬</div>
            <h4 className="text-xl font-bold text-white mb-2">Join Discord</h4>
            <p className="text-gray-400 text-sm mb-4">
              Connect with collectors, get sneak peeks, and participate in giveaways.
            </p>
            <a
              href="https://discord.gg/cryptopins"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-lg bg-indigo-500/20 text-indigo-400 font-medium hover:bg-indigo-500/30 transition-colors text-center"
            >
              Join Server
            </a>
          </div>

          {/* Follow Updates */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-solana-green/10 to-transparent border border-solana-green/20 hover:border-solana-green/40 transition-all duration-300">
            <div className="text-4xl mb-4">🔔</div>
            <h4 className="text-xl font-bold text-white mb-2">Follow for Updates</h4>
            <p className="text-gray-400 text-sm mb-4">
              Be first to know about new drops and community announcements.
            </p>
            <a
              href="https://twitter.com/cryptopins_sol"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-lg bg-solana-green/20 text-solana-green font-medium hover:bg-solana-green/30 transition-colors text-center"
            >
              Follow on X
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityEngagement
