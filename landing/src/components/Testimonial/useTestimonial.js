'use client';

import { useMemo } from 'react';

export function useTestimonial() {
  // Define testimonials data
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Academic Researcher',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'videowordsearch has completely transformed my research process. I can now extract insights from video lectures in a fraction of the time.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Content Creator',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'As a content creator, I need to stay on top of trends. This tool lets me search through hours of industry talks efficiently.',
      rating: 5
    },
    {
      name: 'Thomas Wright',
      role: 'Medical Student',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
      quote: 'I use videowordsearch daily to search through medical lectures. The multilingual support is a game-changer.',
      rating: 4
    },
    {
      name: 'Priya Sharma',
      role: 'Marketing Director',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      quote: 'The auto-tagging feature saved me countless hours analyzing competitor videos and strategies.',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'Language Instructor',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      quote: 'Teaching multiple languages became easier with videowordsearch. I can find perfect examples of pronunciation.',
      rating: 5
    },
    {
      name: 'Emma Johnson',
      role: 'Journalism Student',
      image: 'https://randomuser.me/api/portraits/women/24.jpg',
      quote: 'For my research papers, I need to verify quotes quickly. videowordsearch lets me search interviews with ease.',
      rating: 4
    },
    // Additional testimonials
    {
      name: 'James Wilson',
      role: 'Film Student',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      quote: 'Finding specific scenes in documentaries has never been easier. videowordsearch is an essential tool for my studies.',
      rating: 5
    },
    {
      name: 'Sophia Lee',
      role: 'Legal Assistant',
      image: 'https://randomuser.me/api/portraits/women/36.jpg',
      quote: 'I use videowordsearch to search through recorded depositions and court proceedings. Saves me hours of work.',
      rating: 5
    },
    {
      name: 'Robert Taylor',
      role: 'History Professor',
      image: 'https://randomuser.me/api/portraits/men/72.jpg',
      quote: 'videowordsearch has revolutionized how I prepare lectures, finding relevant clips from historical speeches.',
      rating: 4
    },
    {
      name: 'Olivia Martinez',
      role: 'Social Media Manager',
      image: 'https://randomuser.me/api/portraits/women/58.jpg',
      quote: 'Tracking mentions of our brand in videos has become effortless with videowordsearch\'s powerful search features.',
      rating: 5
    },
    {
      name: 'Michael Brown',
      role: 'Software Developer',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      quote: 'I search through tech conference videos to stay updated on new technologies without watching hours of content.',
      rating: 5
    },
    {
      name: 'Sarah Davis',
      role: 'Online Educator',
      image: 'https://randomuser.me/api/portraits/women/67.jpg',
      quote: 'Creating course materials is much faster now that I can pinpoint exact concepts in educational videos.',
      rating: 4
    },
    {
      name: 'John Peterson',
      role: 'Financial Analyst',
      image: 'https://randomuser.me/api/portraits/men/37.jpg',
      quote: 'videowordsearch helps me find key information in earnings calls and financial presentations with incredible accuracy.',
      rating: 5
    },
    {
      name: 'Lisa Wong',
      role: 'Graduate Student',
      image: 'https://randomuser.me/api/portraits/women/79.jpg',
      quote: 'My dissertation research improved dramatically once I started using videowordsearch to analyze interview data.',
      rating: 4
    },
    {
      name: 'Carlos Mendez',
      role: 'Translator',
      image: 'https://randomuser.me/api/portraits/men/47.jpg',
      quote: 'The multilingual search capabilities allow me to find precise translation examples in authentic videos.',
      rating: 5
    }
  ];

  // Prepared data structure for the continuous scroller
  const prepareColumns = useMemo(() => {
    // Create column data with optimal distribution (3 columns × 2 rows)
    const columnData = [[], [], []];
    
    // Distribute testimonials across columns for initial rendering
    for (let i = 0; i < testimonials.length; i++) {
      const columnIndex = i % 3;
      // Only add if this column has less than 6 items (to keep each column balanced)
      if (columnData[columnIndex].length < 6) {
        columnData[columnIndex].push(testimonials[i]);
      }
    }
    
    return columnData;
  }, []);

  // Simplified animation configuration
  const animationConfig = {
    durationBase: 45, // Base duration for the animation cycle
    delayBetweenColumns: 4, // Delay between each column's animation start
    pauseDuration: 2.5, // Duration to pause at each "stop"
  };

  return {
    testimonials,
    prepareColumns,
    animationConfig
  };
}