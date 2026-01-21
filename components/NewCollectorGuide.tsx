'use client'

import { useState, useEffect } from 'react'

interface GuideTopic {
  id: number
  question: string
  answer: string
  icon: string
}

interface BenefitComparison {
  traditional: string
  cryptoPins: string
  icon: string
}

const guideFAQs: GuideTopic[] = [
  {
    id: 1,
    question: "What's an NFT, and why should I care?",
    answer: "Think of an NFT as a digital certificate of authenticity for your pin - but one that can also earn you money. When someone buys a physical pin from a design you own the NFT for, you get a cut of that sale automatically.",
    icon: '🎓'
  },
  {
    id: 2,
    question: "Do I need cryptocurrency to buy pins?",
    answer: "Nope! You can buy physical pins with your regular credit card, just like any online store. If you want to explore the NFT side and earn from your collection, we'll help you set up a wallet - it takes about 2 minutes.",
    icon: '💳'
  },
  {
    id: 3,
    question: "What's a crypto wallet?",
    answer: "It's like a digital keychain that holds your NFTs. Free to set up, nothing to download except a browser extension. Think of it as your collector's badge for the digital world.",
    icon: '👛'
  },
  {
    id: 4,
    question: "Are the physical pins actually good quality?",
    answer: "Absolutely. We're pin collectors first. All pins are hard enamel with metal backing, proper rubber clutches, and premium finishes. No cheap soft enamel or printed pins here.",
    icon: '✨'
  }
]

const benefitComparisons: BenefitComparison[] = [
  {
    traditional: 'Buy pins, display them',
    cryptoPins: 'Buy pins AND earn from them',
    icon: '📈'
  },
  {
    traditional: 'Certificate in a drawer',
    cryptoPins: 'Authenticity on blockchain forever',
    icon: '🔐'
  },
  {
    traditional: 'Trade locally or at conventions',
    cryptoPins: 'Trade globally in seconds',
    icon: '🌍'
  },
  {
    traditional: 'Hope for appreciation',
    cryptoPins: 'Passive income from every sale',
    icon: '💰'
  }
]

const gettingStartedSteps = [
  {
    step: 1,
    title: 'Browse Our Pins',
    description: 'Check out our collections - no account needed. Find designs you love.',
    icon: '🔍',
    action: 'View Gallery'
  },
  {
    step: 2,
    title: 'Buy Physical (Optional)',
    description: "Want the pin on your jacket? Buy it with your card. That's it.",
    icon: '🛒',
    action: 'Shop Pins'
  },
  {
    step: 3,
    title: 'Explore NFTs (Optional)',
    description: 'Ready to earn? We\'ll guide you through setting up a wallet in 2 minutes.',
    icon: '🚀',
    action: 'Learn More'
  }
]

export default function NewCollectorGuide() {
  const [mounted, setMounted] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(1)
  const [activeStep, setActiveStep] = useState<number>(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-gray-900 via-black to-black overflow-hidden">
      {/* Warm, welcoming background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-solana-green/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-solana-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Welcoming header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-6">
            <span className="text-lg">📍</span>
            <span className="text-sm font-medium text-amber-400">New to Crypto? Start Here</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">You Collect Pins.</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-solana-green to-solana-blue bg-clip-text text-transparent">
              We Made Them Better.
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Same premium enamel pins you know and love.
            <span className="text-white font-medium"> New ways to collect, trade, and actually earn</span> from your collection.
            No crypto experience needed.
          </p>
        </div>

        {/* Comparison section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Pin Collecting, Upgraded</h3>
            <p className="text-gray-400">Everything you love about pin collecting, plus new benefits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefitComparisons.map((comparison, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 transition-all duration-300 group"
              >
                <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                  {comparison.icon}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-600/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-gray-400">1</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Traditional</span>
                      <p className="text-gray-400">{comparison.traditional}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-solana-green to-solana-blue flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-solana-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-solana-green">2</span>
                    </div>
                    <div>
                      <span className="text-xs text-solana-green uppercase tracking-wide">Crypto Pins</span>
                      <p className="text-white font-medium">{comparison.cryptoPins}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Getting started steps */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Getting Started is Easy</h3>
            <p className="text-gray-400">No pressure. Go at your own pace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {gettingStartedSteps.map((item) => (
              <div
                key={item.step}
                className={`
                  relative p-6 rounded-2xl border backdrop-blur-sm cursor-pointer
                  transition-all duration-300 transform
                  ${activeStep === item.step
                    ? 'bg-gradient-to-br from-solana-green/10 to-solana-blue/10 border-solana-green/50 scale-105'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }
                `}
                onClick={() => setActiveStep(item.step)}
              >
                {/* Step number */}
                <div className={`
                  absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                  ${activeStep === item.step
                    ? 'bg-gradient-to-r from-solana-green to-solana-blue text-black'
                    : 'bg-white/10 text-white'
                  }
                `}>
                  {item.step}
                </div>

                <div className="pt-4">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                  <button className={`
                    px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
                    ${activeStep === item.step
                      ? 'bg-solana-green text-black hover:bg-solana-green/80'
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}>
                    {item.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Common Questions from Pin Collectors</h3>
            <p className="text-gray-400">No jargon, just straight answers</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {guideFAQs.map((faq) => (
              <div
                key={faq.id}
                className={`
                  rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300
                  ${expandedFAQ === faq.id
                    ? 'bg-white/10 border-amber-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/8'
                  }
                `}
              >
                <button
                  className="w-full p-6 flex items-center gap-4 text-left"
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                >
                  <div className="text-2xl flex-shrink-0">{faq.icon}</div>
                  <span className="flex-1 text-lg font-semibold text-white">{faq.question}</span>
                  <div className={`
                    w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                    transition-transform duration-300
                    ${expandedFAQ === faq.id ? 'rotate-180' : ''}
                  `}>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div className={`
                  overflow-hidden transition-all duration-300
                  ${expandedFAQ === faq.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="px-6 pb-6 pl-16">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust/comfort section */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-white/5 to-solana-green/10 border border-amber-500/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                <span className="text-lg">🤝</span>
                <span className="text-xs font-medium text-amber-400 uppercase tracking-wide">From Collectors, For Collectors</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                We Started Collecting Pins Long Before Crypto
              </h3>

              <p className="text-gray-400 mb-6">
                We know what makes a great pin - the weight, the enamel quality, the satisfying click of a good clutch.
                Crypto Pins is about making collecting even better, not replacing what you love.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-solana-green/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-solana-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">No crypto required for physical pins</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-solana-green/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-solana-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Same quality you'd expect from premium pin makers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-solana-green/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-solana-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">Explore the crypto side when YOU're ready</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                {/* Pin display mockup */}
                <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-7xl mb-4">📍</div>
                    <div className="text-sm text-gray-400">Premium Hard Enamel</div>
                    <div className="text-xs text-gray-500 mt-1">+ Digital Ownership</div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-solana-green/20 border border-solana-green/30 text-sm font-medium text-solana-green shadow-lg">
                  Credit Cards OK
                </div>
                <div className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-sm font-medium text-amber-400 shadow-lg">
                  Beginner Friendly
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Ready to see what the fuss is about?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#gallery"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-solana-green rounded-lg font-semibold text-lg text-black transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30"
            >
              Browse the Collection
            </a>
            <a
              href="#learn"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-lg text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Learn More About NFTs
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
