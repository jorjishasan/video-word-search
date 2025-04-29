import '../styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import FixedActionButton from '@/components/FixedActionButton/FixedActionButton';
import Script from 'next/script';

export const metadata = {
  title: {
    default: 'Video Word Search Tool - Search Inside YouTube Videos | VideoWordSearch',
    template: '%s - VideoWordSearch'
  },
  description: 'Perform instant video word search inside any YouTube video. Find specific words or phrases and jump to exact moments with the VideoWordSearch Chrome extension.',
  keywords: 'video word search, YouTube search tool, find words in videos, video transcript search, keyword timestamps, YouTube content navigator, video word finder, transcript analyzer, search youtube video text, chrome extension video search, youtube keyword finder, video content analysis',
  metadataBase: new URL('https://videowordsearch.com'),
  openGraph: {
    title: 'Video Word Search Tool - Search Inside YouTube Videos | VideoWordSearch',
    description: 'Use VideoWordSearch for powerful video word search. Find exactly what you need in YouTube videos with precision word searching and AI content analysis.',
    type: 'website',
    locale: 'en_US',
    siteName: 'VideoWordSearch'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VideoWordSearch: Powerful Video Word Search Chrome Extension',
    description: 'Effortlessly perform video word search in YouTube content with our Chrome extension. Save time and find information faster!',
    creator: '@jorjishasan_'
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
    google: 'L_-58tJ0wGsGol5hVbmMlnexbGg46_iB2sov53cGfiA'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="google-site-verification" content="L_-58tJ0wGsGol5hVbmMlnexbGg46_iB2sov53cGfiA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-CK31J2E86Z"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CK31J2E86Z');
            `,
          }}
        />
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