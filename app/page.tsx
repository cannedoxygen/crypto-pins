import HeroSection from '@/components/HeroSection'
import PinShowcase from '@/components/PinShowcase'
import CollectorSpotlight from '@/components/CollectorSpotlight'
import NewCollectorGuide from '@/components/NewCollectorGuide'
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
      <CollectorSpotlight />
      <NewCollectorGuide />
      <NFTCollection />
      <NFTUtility />
      <DegenZone />
      <EarningsPreview />
      <CommunityProof />
      <CommunityEngagement />
    </main>
  )
}
