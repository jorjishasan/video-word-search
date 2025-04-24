import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Feature from '@/components/Features/Feature';
import Language from '@/components/Language/Language';
import Testimonial from '@/components/Testimonial/Testimonial';
import Pricing from '@/components/Pricing/Pricing';
import Faq from '@/components/Faq/Faq';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
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