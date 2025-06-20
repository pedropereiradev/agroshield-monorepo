import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';
import StructuredData from '../components/StructuredData';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'AgroShield - Seguro Agrícola Descentralizado',
    template: '%s | AgroShield',
  },
  description:
    'O primeiro seguro rural descentralizado do Brasil. Proteja sua safra com tecnologia blockchain, pagamentos automáticos em 24-48h e transparência total. Cobertura para soja e arroz com preços até 73% mais baixos.',
  keywords: [
    'seguro agrícola',
    'seguro rural',
    'blockchain',
    'soja',
    'arroz',
    'seguro descentralizado',
    'agronegócio',
    'clima',
    'indenização automática',
    'smart contracts',
  ],
  authors: [{ name: 'AgroShield', url: 'https://agroshield.co' }],
  creator: 'AgroShield',
  publisher: 'AgroShield',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://agroshield.co',
    siteName: 'AgroShield',
    title: 'AgroShield - Seguro Agrícola Descentralizado',
    description:
      'O primeiro seguro rural descentralizado do Brasil. Proteja sua safra com blockchain e receba indenizações automáticas em 24-48h.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'AgroShield - Seguro Agrícola Descentralizado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgroShield - Seguro Agrícola Descentralizado',
    description:
      'O primeiro seguro rural descentralizado do Brasil. Proteja sua safra com blockchain.',
    images: ['/logo.png'],
    creator: '@agroshield',
  },
  icons: {
    icon: [
      { url: '/logo-icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-icon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logo-icon.png',
    apple: [{ url: '/logo-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://agroshield.co',
    languages: {
      'pt-BR': 'https://agroshield.co',
    },
  },
  category: 'agriculture',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://agroshield.co'),
  other: {
    'theme-color': '#16a34a',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'AgroShield',
    'application-name': 'AgroShield',
    'msapplication-TileColor': '#16a34a',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}
