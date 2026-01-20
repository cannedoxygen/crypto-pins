import HeroSection from '@/components/HeroSection'
import PinShowcase from '@/components/PinShowcase'
import NFTCollection from '@/components/NFTCollection'
import NFTUtility from '@/components/NFTUtility'
import DegenZone from '@/components/DegenZone'
import EarningsPreview from '@/components/EarningsPreview'
import CommunityProof from '@/components/CommunityProof'
import CommunityEngagement from '@/components/CommunityEngagement'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PinShowcase />
      <NFTCollection />
      <NFTUtility />
      <DegenZone />
      <EarningsPreview />
      <CommunityProof />
      <CommunityEngagement />
    </main>
  )
}
