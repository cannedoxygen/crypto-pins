import HeroSection from '@/components/HeroSection'
import PinShowcase from '@/components/PinShowcase'
import NFTCollection from '@/components/NFTCollection'
import CommunityProof from '@/components/CommunityProof'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PinShowcase />
      <NFTCollection />
      <CommunityProof />
    </main>
  )
}
