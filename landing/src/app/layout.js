import '../styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata = {
  title: 'VidSift - Advanced Video Content Search',
  description: 'Search inside any YouTube video to find exactly what you need. Our AI-powered search tool instantly finds every mention of your keywords in video content.',
  keywords: 'video search, transcript search, YouTube search, content search, AI search',
  metadataBase: new URL('https://vidsift.com'),
  openGraph: {
    title: 'VidSift - Search Inside Any YouTube Video',
    description: 'Extract value from video content with advanced transcript search and AI-powered analysis.',
    images: ['/og-image.jpg']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased text-white bg-background">
        {/* Modern star field background */}
        <div className="fixed inset-0 bg-background -z-10 overflow-hidden">
          {/* Dynamic background with stars */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-background to-background"></div>
          
          {/* Star field */}
          <div className="stars-sm"></div>
          <div className="stars-md"></div>
          <div className="stars-lg"></div>
          
          {/* Ambient glow spots */}
          <div className="absolute top-20 right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute bottom-40 left-[5%] w-80 h-80 bg-accent/5 rounded-full blur-[150px] opacity-40"></div>
        </div>
        
        {/* Main content */}
        <div className="relative min-h-screen overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}