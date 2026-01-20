import type { Metadata } from 'next'
import './globals.css'
import WalletContextProvider from '@/lib/WalletContextProvider'
import AvailabilityProvider from '@/lib/AvailabilityProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Crypto Pins - Solana NFT Enamel Pin Marketplace',
  description: 'High-quality enamel pins featuring Solana ecosystem projects with NFT utility and profit-sharing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          <AvailabilityProvider showNotifications={true}>
            <Navigation />
            <div className="pt-16">
              {children}
            </div>
            <Footer />
          </AvailabilityProvider>
        </WalletContextProvider>
      </body>
    </html>
  )
}
