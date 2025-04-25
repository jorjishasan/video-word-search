import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Feature from '@/components/Features/Feature';
import Language from '@/components/Language/Language';
import Testimonial from '@/components/Testimonial/Testimonial';
import Pricing from '@/components/Pricing/Pricing';
import Faq from '@/components/Faq/Faq';
import Footer from '@/components/Footer/Footer';
import Script from 'next/script'; // Import the Script component

export default function Home() {
  // Define the JSON-LD schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VideoWordSearch",
    "operatingSystem": "Chrome OS, Windows, macOS, Linux", // Operating systems supported by Chrome
    "applicationCategory": "BrowserApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8", // TODO: Update with actual average rating
      "ratingCount": "150"  // TODO: Update with actual rating count
    },
    "offers": {
      "@type": "Offer",
      "price": "0", // Assuming the extension is free
      "priceCurrency": "USD"
    },
    "description": "Instantly search inside any YouTube video for specific words or phrases and jump to exact moments. Save time with VideoWordSearch's powerful transcript analysis and word detection Chrome extension.",
    "url": "https://videowordsearch.com",
    "potentialAction": {
      "@type": "InstallAction",
      "target": "YOUR_CHROME_WEB_STORE_LINK" // TODO: Replace with your actual Chrome Web Store link
    }
    // You can add more properties like 'screenshot', 'featureList', etc.
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Add the JSON-LD script tag */}
      <Script 
        id="app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Feature Component */}
      <Feature />
      
      {/* Language Component */}
      <Language />
      
      {/* Testimonial Component */}
      <Testimonial />
      
      {/* Pricing Component */}
      <Pricing />
      
      {/* FAQ Component */}
      <Faq />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}