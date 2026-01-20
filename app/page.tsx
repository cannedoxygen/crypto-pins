import HeroSection from '@/components/HeroSection'
import PinShowcase from '@/components/PinShowcase'
import CollectorSpotlight from '@/components/CollectorSpotlight'
import NFTCollection from '@/components/NFTCollection'
import EarningsPreview from '@/components/EarningsPreview'
import CommunityProof from '@/components/CommunityProof'
import CommunityEngagement from '@/components/CommunityEngagement'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PinShowcase />
      <CollectorSpotlight />
      <NFTCollection />
      <EarningsPreview />
      <CommunityProof />
      <CommunityEngagement />
    </main>
  )
}
