// Define the features data
export const FEATURES = [
  {
    title: 'Instant Word Search',
    description: 'Find specific words or phrases in any video content with millisecond precision. Jump directly to the exact moment.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="11" y1="8" x2="11" y2="14"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-400',
    hoverEffect: 'group-hover:rotate-6'
  },
  {
    title: 'Auto Tagging',
    description: 'Our AI automatically identifies key topics and concepts in videos, making search even more intuitive.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
    hoverEffect: 'group-hover:scale-110'
  },
  {
    title: 'Real-time Alerts',
    description: "Get notified instantly when your specified keywords are mentioned in videos you're watching.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
    gradient: 'from-amber-500 to-orange-600',
    hoverEffect: 'group-hover:translate-y-[-5px]'
  },
  {
    title: 'Multi-language Support',
    description: 'Search across videos in 20+ languages with our advanced language processing capabilities.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M5 8l6 6"></path>
        <path d="M4 14l6-6 2-3"></path>
        <path d="M2 5h12"></path>
        <path d="M7 2h1"></path>
        <path d="M22 22l-5-10-5 10"></path>
        <path d="M14 18h6"></path>
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-600',
    hoverEffect: 'group-hover:rotate-[-6deg]'
  },
  {
    title: 'Export & Share',
    description: 'Save and export your findings with timestamps for easy reference and collaboration.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
        <polyline points="16 6 12 2 8 6"></polyline>
        <line x1="12" y1="2" x2="12" y2="15"></line>
      </svg>
    ),
    gradient: 'from-red-500 to-rose-600',
    hoverEffect: 'group-hover:scale-110'
  },
  {
    title: 'Insights Analytics',
    description: 'Gain valuable analytics on keyword frequency and contexts across your video library.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
    gradient: 'from-indigo-500 to-blue-600',
    hoverEffect: 'group-hover:translate-y-[-5px]'
  }
];