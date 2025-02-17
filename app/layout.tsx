import type { Metadata } from 'next';
import '@/app/styles/styles.scss';

const name = 'On Chain Society';
const description = 'On Chain Society is about the future of government and blockchain technology.';

export const metadata: Metadata = {
  title: {
    default: name,
    template: `%s | ${name}`,
  },
  description,
  keywords: ['government', 'democracy', 'blockchain', 'crypto', 'web development'],
  authors: [{ name: 'Dachus' }],
  creator: 'Your Name',
  metadataBase: new URL('http://localhost:3000'), // TODO
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: name,
    title: name,
    description,
    images: ['/image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: name,
    description,
    creator: '@dac_hus',
    images: ['/image.png'],
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
