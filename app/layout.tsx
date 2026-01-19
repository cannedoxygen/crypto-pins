import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
