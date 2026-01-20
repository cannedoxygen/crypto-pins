'use client'

import { useState, useEffect } from 'react'

const socialLinks = [
  { name: 'Twitter', icon: '𝕏', followers: '12.5K', color: 'from-gray-400 to-gray-600' },
  { name: 'Discord', icon: '💬', members: '8.2K', color: 'from-indigo-500 to-purple-500' },
  { name: 'Instagram', icon: '📷', followers: '5.8K', color: 'from-pink-500 to-purple-500' },
]

const testimonials = [
  {
    id: 1,
    text: "These pins are fire! Got my Solana pin and the quality is insane. Plus earning from the NFT? 🔥",
    author: "solana_degen.sol",
    verified: true,
    emoji: "💎"
  },
  {
    id: 2,
    text: "Finally, NFTs with actual utility. Wearing my Bonk pin at every meetup!",
    author: "bonk_collector",
    verified: true,
    emoji: "🚀"
  },
  {
    id: 3,
    text: "The profit-sharing model is genius. Already earned back 30% of my NFT purchase.",
    author: "crypto_investor.eth",
    verified: true,
    emoji: "💰"
  }
]

export default function CommunityProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-solana-green/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-solana-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Social proof header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solana-blue/10 border border-solana-blue/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-solana-blue">Join the Community</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-solana-green to-solana-blue bg-clip-text text-transparent">
            Built by Degens, for Degens
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of collectors and crypto enthusiasts in the Crypto Pins community
          </p>
        </div>

        {/* Social links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {socialLinks.map((social, index) => (
            <div
              key={social.name}
              className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-solana-green/50 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`
                absolute inset-0 rounded-2xl bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300
              `} />

              <div className="relative">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {social.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{social.name}</h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-solana-green to-solana-blue bg-clip-text text-transparent">
                  {social.followers || social.members}
                </div>
                <p className="text-gray-400 text-sm">{social.followers ? 'Followers' : 'Members'}</p>
              </div>

              {/* Hover glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-solana-green to-solana-blue rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-6xl text-solana-purple/20">"</div>

            {/* Testimonial content */}
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    activeTestimonial === index
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-5xl">{testimonial.emoji}</div>
                    <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-solana-purple to-solana-green flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-white">{testimonial.author}</span>
                        {testimonial.verified && (
                          <div className="w-5 h-5 rounded-full bg-solana-green flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">Verified Holder</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? 'w-12 bg-gradient-to-r from-solana-purple to-solana-green'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <span className="text-2xl">🔒</span>
            <span className="text-sm font-semibold text-gray-300">Secure Blockchain</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <span className="text-2xl">✅</span>
            <span className="text-sm font-semibold text-gray-300">Verified Smart Contracts</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <span className="text-2xl">🚀</span>
            <span className="text-sm font-semibold text-gray-300">Built on Solana</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <span className="text-2xl">💯</span>
            <span className="text-sm font-semibold text-gray-300">Premium Quality</span>
          </div>
        </div>
      </div>
    </section>
  )
}
