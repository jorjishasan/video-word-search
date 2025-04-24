import '../styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import FixedActionButton from '@/components/FixedActionButton/FixedActionButton';

export const metadata = {
  title: 'VideoWordSearch - Find Exact Moments in Any YouTube Video',
  description: 'Instantly search inside any YouTube video and jump to exact moments where keywords are mentioned. Save time with VideoWordSearch\'s powerful transcript analysis and word detection technology.',
  keywords: 'video word search, YouTube search tool, find words in videos, video transcript search, keyword timestamps, YouTube content navigator, video word finder, transcript analyzer',
  metadataBase: new URL('https://videowordsearch.com'),
  openGraph: {
    title: 'VideoWordSearch - Search Inside Any YouTube Video Instantly',
    description: 'Never miss important information in videos again. VideoWordSearch helps you find exactly what you need in any YouTube video with precision word searching and AI-powered content analysis.',
    type: 'website',
    locale: 'en_US',
    siteName: 'VideoWordSearch'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VideoWordSearch - Find Exact Words in YouTube Videos',
    description: 'Search for specific words and phrases in any YouTube video with our powerful extension. Save hours of watching time!',
    creator: '@jorjishasan'
  },
  alternates: {
    canonical: 'https://videowordsearch.com'
  },
  robots: {
    index: true,
    follow: true
  },
  authors: [{ name: 'VideoWordSearch Team' }],
  category: 'Technology',
  verification: {
    google: 'google-site-verification-code'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased text-white bg-background">
        {/* Simple gradient background */}
        <div className="fixed inset-0 bg-background -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#20124d]/80 via-background to-background"></div>
        </div>
        
        {/* Main content */}
        <div className="relative min-h-screen overflow-hidden">
          {children}
        </div>
        <FixedActionButton />
      </body>
    </html>
  );
}