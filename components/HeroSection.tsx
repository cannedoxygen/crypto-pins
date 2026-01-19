'use client'

import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-solana-purple/20 via-black to-solana-green/20 animate-gradient" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(153,69,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(153,69,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-solana-purple/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-solana-green/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solana-purple/10 border border-solana-purple/20 backdrop-blur-sm mb-8">
          <div className="w-2 h-2 bg-solana-green rounded-full animate-pulse" />
          <span className="text-sm font-medium text-solana-green">Built on Solana</span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-solana-purple via-solana-blue to-solana-green bg-clip-text text-transparent leading-tight">
          Crypto Pins
        </h1>

        {/* Subheading */}
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 text-balance">
          Where Physical Meets Digital
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 text-balance leading-relaxed">
          Collect high-quality enamel pins of your favorite Solana projects.
          Buy physical pins or own NFTs that share in marketplace profits.
          <span className="text-solana-green font-semibold"> Join the revolution.</span>
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-solana-purple to-solana-blue rounded-lg font-semibold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-solana-purple/50">
            <span className="relative z-10">Browse Pins</span>
            <div className="absolute inset-0 bg-gradient-to-r from-solana-blue to-solana-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-lg text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
            Explore NFTs
          </button>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Physical Collectibles</h3>
            <p className="text-gray-400">Premium enamel pins shipped worldwide</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💎</div>
            <h3 className="text-xl font-bold text-white mb-2">NFT Ownership</h3>
            <p className="text-gray-400">Digital tokens with real utility</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Profit Sharing</h3>
            <p className="text-gray-400">NFT holders earn from pin sales</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-solana-green rounded-full" />
        </div>
      </div>
    </section>
  )
}
