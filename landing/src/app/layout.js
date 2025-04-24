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
    images: ['/og-image.jpg'],
    type: 'website',
    locale: 'en_US',
    siteName: 'VideoWordSearch'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VideoWordSearch - Find Exact Words in YouTube Videos',
    description: 'Search for specific words and phrases in any YouTube video with our powerful extension. Save hours of watching time!',
    images: ['/og-image.jpg'],
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
      <body className="font-sans antialiased text-white bg-background">
        {/* Enhanced web3 dynamic background */}
        <div className="fixed inset-0 bg-background -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#20124d]/80 via-background to-background"></div>
          
          {/* Enhanced star field */}
          <div className="stars-sm"></div>
          <div className="stars-md"></div>
          <div className="stars-lg"></div>
          <div className="nebula"></div>
          
          {/* Orbital grid lines - web3 style */}
          <div className="orbital-grid"></div>
          
          {/* Digital particle effect */}
          <div className="digital-particles"></div>
          
          {/* Enhanced ambient glow spots with pulse animations */}
          <div className="absolute top-20 right-[10%] w-96 h-96 bg-[#4D7CFF]/10 rounded-full blur-[120px] opacity-60 animate-pulse-slow"></div>
          <div className="absolute bottom-40 left-[5%] w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-[150px] opacity-50 animate-pulse-slower"></div>
          <div className="absolute top-[40%] left-[15%] w-64 h-64 bg-[#34D399]/10 rounded-full blur-[100px] opacity-40 animate-float"></div>
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