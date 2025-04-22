'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureShowcase from '@/components/FeatureShowcase';
import LanguageTicker from '@/components/LanguageTicker';
import RealTimeAlerts from '@/components/RealTimeAlerts';
import AnimatedNotifications from '@/components/AnimatedNotifications';
import Footer from '@/components/Footer';

export default function Home() {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for header
          behavior: 'smooth'
        });
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Feature Showcase */}
      <FeatureShowcase />
      
      {/* Language Support */}
      <LanguageTicker />
      
      {/* Real-time capabilities showcase */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-24">
          <RealTimeAlerts />
          <AnimatedNotifications />
        </div>
      </div>
      
      {/* Testimonials in a modern design */}
      <section id="testimonials" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30 pointer-events-none"></div>
        <div className="absolute left-0 top-1/4 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-[100px] opacity-60"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              User Stories
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Researchers & Learners</span>
            </h2>
            
            <p className="text-lg text-white/70">
              See how professionals, researchers, and learners use VidSift to extract value from video content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'Academic Researcher',
                image: 'https://randomuser.me/api/portraits/men/32.jpg',
                quote: 'VidSift has completely transformed my research process. I can now extract insights from video lectures and conferences in a fraction of the time.'
              },
              {
                name: 'Maria Rodriguez',
                role: 'Content Creator',
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                quote: 'As a content creator, I need to stay on top of trends. This tool lets me search through hours of industry talks to find exactly what I need.'
              },
              {
                name: 'Thomas Wright',
                role: 'Medical Student',
                image: 'https://randomuser.me/api/portraits/men/62.jpg',
                quote: 'I use VidSift daily to search through medical lectures. The multilingual support is a game-changer for accessing international resources.'
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative group hover:bg-white/10 transition-colors"
              >
                {/* Testimonial card with hover effects */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
                
                <blockquote className="text-white/80 relative">
                  <span className="absolute -top-2 -left-1 text-primary text-4xl opacity-20">"</span>
                  <p className="relative z-10">{testimonial.quote}</p>
                  <span className="absolute -bottom-6 -right-1 text-primary text-4xl opacity-20">"</span>
                </blockquote>
                
                {/* Star rating */}
                <div className="flex mt-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                
                {/* Subtle glow effect on hover */}
                <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"></div>
              </div>
            ))}
          </div>
          
          {/* CTA button */}
          <div className="mt-16 text-center">
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 17L12 12M12 12L7 7M12 12L7 17M12 12L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Experience VidSift Today</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Pricing section */}
      <section id="pricing" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background pointer-events-none"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Pricing Plans
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Find The Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Plan For You</span>
            </h2>
            
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Whether you're a casual user or power user, we have plans designed for your specific needs.
              All plans include our core search functionality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Basic',
                price: 'Free',
                description: 'Perfect for casual users',
                features: [
                  'Basic word search',
                  'YouTube integration',
                  'Up to 10 searches per day',
                  'Standard results'
                ],
                cta: 'Get Started',
                popular: false,
                color: 'from-blue-500/20 to-blue-600/20'
              },
              {
                name: 'Pro',
                price: '$4.99',
                period: '/month',
                description: 'For active learners & researchers',
                features: [
                  'Advanced word & phrase search',
                  'Unlimited searches',
                  'All 20+ languages',
                  'Auto-tagging feature',
                  'Save & export results',
                  'Priority support'
                ],
                cta: 'Go Pro',
                popular: true,
                color: 'from-primary/30 to-accent/30'
              },
              {
                name: 'Team',
                price: '$9.99',
                period: '/month',
                description: 'For teams & organizations',
                features: [
                  'Everything in Pro',
                  'Team collaboration features',
                  'Shared collections',
                  'Advanced analytics',
                  'API access',
                  'Dedicated support'
                ],
                cta: 'Contact Sales',
                popular: false,
                color: 'from-purple-500/20 to-purple-600/20'
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-xl backdrop-blur-sm border ${
                  plan.popular 
                    ? 'border-primary/30 bg-gradient-to-b from-white/10 to-white/5' 
                    : 'border-white/10 bg-white/5'
                } overflow-hidden group`}
              >
                {/* Popular tag */}
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-white/60 ml-1">{plan.period}</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="#"
                    className={`block w-full py-3 px-6 text-center rounded-lg font-medium ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-accent text-white' 
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    } transition-colors duration-300`}
                  >
                    {plan.cta}
                  </a>
                </div>
                
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${plan.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
              </div>
            ))}
          </div>
          
          {/* FAQ section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              {[
                {
                  question: 'How accurate is the search functionality?',
                  answer: 'Our search technology achieves over 98% accuracy in identifying words and phrases within video content, powered by advanced speech recognition and natural language processing.'
                },
                {
                  question: 'Can I use VidSift on any video platform?',
                  answer: 'Currently, VidSift is optimized for YouTube videos. We\'re actively working on expanding to other platforms like Vimeo, Twitch, and educational sites in the near future.'
                },
                {
                  question: 'How does multilingual support work?',
                  answer: 'VidSift automatically detects the language of the video content and can translate search results into your preferred language. This feature is available for all 20+ supported languages.'
                },
                {
                  question: 'Is there a limit to video length?',
                  answer: 'The free plan supports videos up to 15 minutes in length. Pro and Team plans support videos of any length, with optimized performance even for multi-hour content.'
                }
              ].map((faq, i) => (
                <div 
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors duration-300"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer p-4 text-white">
                      <span>{faq.question}</span>
                      <svg className="w-5 h-5 text-white/60 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 text-white/70">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}