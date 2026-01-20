'use client'

import { useState, useEffect } from 'react'

const qualityFeatures = [
  {
    icon: '🏆',
    title: 'Premium Materials',
    description: 'Hard enamel with zinc alloy metal, plated in polished nickel for lasting shine'
  },
  {
    icon: '🎨',
    title: 'Vibrant Colors',
    description: 'Screen-printed details with UV-resistant enamel that stays bold over time'
  },
  {
    icon: '📦',
    title: 'Collector Packaging',
    description: 'Each pin comes in a custom display box with authenticity certificate'
  },
  {
    icon: '🔢',
    title: 'Limited Editions',
    description: 'Numbered runs ensure rarity - once they\'re gone, they\'re gone'
  }
]

const collectorTestimonials = [
  {
    id: 1,
    text: "As a pin collector for 10 years, the Crypto Pins quality rivals anything I've seen. The weight, the finish, the colors - absolutely premium.",
    author: "PinCollectorMike",
    collection: "142 pins",
    emoji: "📌"
  },
  {
    id: 2,
    text: "Finally merging my two hobbies - crypto and collecting. These pins look incredible on my display board next to my other Solana merch.",
    author: "SolanaMaxi.sol",
    collection: "28 pins",
    emoji: "💎"
  },
  {
    id: 3,
    text: "The unboxing experience is A+. Every pin feels special with the numbered certificate and premium packaging. True collector's items.",
    author: "CryptoArtFan",
    collection: "67 pins",
    emoji: "🎁"
  }
]

const collectionStats = [
  { value: '5,000+', label: 'Collectors Worldwide', icon: '🌍' },
  { value: '12', label: 'Unique Designs', icon: '🎨' },
  { value: '98%', label: 'Collector Satisfaction', icon: '⭐' },
  { value: '24', label: 'Countries Shipped', icon: '📦' }
]

export default function CollectorSpotlight() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % collectorTestimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_var(--tw-gradient-stops))] from-solana-purple/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-solana-green/5 via-transparent to-transparent" />

      {/* Floating pin icons */}
      <div className="absolute top-20 left-[10%] text-5xl opacity-10 animate-float-slow">📌</div>
      <div className="absolute top-40 right-[15%] text-4xl opacity-10 animate-float-slow" style={{ animationDelay: '-2s' }}>🎯</div>
      <div className="absolute bottom-32 left-[20%] text-5xl opacity-10 animate-float-slow" style={{ animationDelay: '-4s' }}>✨</div>
      <div className="absolute bottom-20 right-[10%] text-4xl opacity-10 animate-float-slow" style={{ animationDelay: '-6s' }}>💎</div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-6">
            <span className="text-2xl">📌</span>
            <span className="text-sm font-medium text-orange-400">For True Collectors</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-300 to-solana-purple bg-clip-text text-transparent">
            Physical Collectibles, Crypto Soul
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the satisfaction of holding premium enamel pins that represent your favorite crypto projects.
            <span className="text-white font-semibold"> Real craftsmanship meets blockchain culture.</span>
          </p>
        </div>

        {/* Quality features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {qualityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

              {/* Hover glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-solana-purple rounded-2xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Pin showcase visualization */}
        <div className="relative mb-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Pin display mockup */}
            <div className="flex-1 text-center">
              <div className="relative inline-block">
                {/* Display board effect */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-700 shadow-2xl relative overflow-hidden">
                  {/* Cork board texture */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />

                  {/* Pins on display */}
                  <div className="absolute top-8 left-8 text-5xl transform -rotate-6 hover:scale-110 transition-transform cursor-pointer">⬢</div>
                  <div className="absolute top-12 right-8 text-4xl transform rotate-12 hover:scale-110 transition-transform cursor-pointer">🐕</div>
                  <div className="absolute bottom-16 left-12 text-4xl transform rotate-6 hover:scale-110 transition-transform cursor-pointer">🐵</div>
                  <div className="absolute bottom-8 right-12 text-5xl transform -rotate-12 hover:scale-110 transition-transform cursor-pointer">🦍</div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl hover:scale-110 transition-transform cursor-pointer">💎</div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-solana-purple/20 rounded-3xl blur-xl -z-10" />
              </div>

              <p className="text-gray-400 mt-6 text-sm">Your collection, proudly displayed</p>
            </div>

            {/* Collector benefits */}
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Built for Serious Collectors
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-solana-purple/20 flex items-center justify-center text-xl shrink-0">✓</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Museum-Quality Finish</h4>
                    <p className="text-gray-400 text-sm">Each pin undergoes 12-step quality control for flawless presentation</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-solana-green/20 flex items-center justify-center text-xl shrink-0">✓</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Numbered & Authenticated</h4>
                    <p className="text-gray-400 text-sm">Every pin comes with a certificate linking to blockchain verification</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-solana-blue/20 flex items-center justify-center text-xl shrink-0">✓</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Collector Community</h4>
                    <p className="text-gray-400 text-sm">Join exclusive trading channels and early access to new releases</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-xl shrink-0">✓</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Investment Potential</h4>
                    <p className="text-gray-400 text-sm">Limited editions have shown appreciation in the secondary market</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collector testimonials */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <span className="text-sm font-medium text-orange-400 uppercase tracking-wide">Collector Stories</span>
          </div>

          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 to-solana-purple/10 backdrop-blur-sm border border-white/20 overflow-hidden min-h-[280px]">
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-6xl text-orange-500/20">"</div>

            {/* Testimonial content */}
            <div className="relative z-10">
              {collectorTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    activeTestimonial === index
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8 pointer-events-none'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-5xl shrink-0">{testimonial.emoji}</div>
                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-solana-purple flex items-center justify-center text-2xl">
                      👤
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-white">{testimonial.author}</span>
                        <div className="px-2 py-0.5 rounded-full bg-orange-500/20 text-xs text-orange-400">
                          Verified Collector
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">Collection: {testimonial.collection}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {collectorTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? 'w-12 bg-gradient-to-r from-orange-500 to-solana-purple'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Collection stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {collectionStats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-solana-purple bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-solana-purple rounded-lg font-semibold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50">
            <span className="relative z-10 flex items-center gap-2">
              Start Your Collection
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
          <p className="text-gray-500 text-sm mt-4">Free shipping on orders over 3 pins</p>
        </div>
      </div>
    </section>
  )
}
