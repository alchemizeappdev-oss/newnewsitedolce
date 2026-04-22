import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dolce Vida — Change Your Energy. Transform Your Life.',
  description: 'Intuitive readings, energy healing, and spiritual guidance with Star Monreal in Reno, NV.',
  openGraph: {
    title: 'Dolce Vida',
    description: 'Intuitive readings, energy healing, and spiritual guidance with Star Monreal.',
    url: 'https://dolcevida.pink',
    siteName: 'Dolce Vida',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
