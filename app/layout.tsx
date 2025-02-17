import type { Metadata } from 'next';
import '@/app/styles/styles.scss';

export const metadata: Metadata = {
  title: {
    default: 'My Blog',
    template: '%s | My Blog',
  },
  description:
    'A blog built with Next.js and TypeScript, featuring articles about web development and technology.',
  keywords: ['blog', 'nextjs', 'typescript', 'react', 'web development'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'My Blog',
    title: 'My Blog',
    description:
      'A blog built with Next.js and TypeScript, featuring articles about web development and technology.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Blog',
    description:
      'A blog built with Next.js and TypeScript, featuring articles about web development and technology.',
    creator: '@yourusername',
    images: ['/og-image.jpg'],
  },
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
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="red">
      <body
      // className={`${unna.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
