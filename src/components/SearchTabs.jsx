import React, { useState, useEffect } from 'react';
import wordSearch from '../assets/wordSearch.svg';
import insights from '../assets/insights.svg';
import autoSearch from '../assets/autoSearch.svg';
import { useSearch } from '../context/SearchContext';
import WordSearchTab from './WordSearch/WordSearchTab';
import InsightsTab from './InsightsTab';
import AutoSearchTab from './AutoSearch/AutoSearchTab';

// Import the same event name as used in AutoSearchTab
const TAGS_COUNT_EVENT = 'foundTagsCountChanged';

const SearchTabs = () => {
  const { activeTab, setActiveTab } = useSearch();
  
  // Create state to track found tags count
  const [foundTagsCount, setFoundTagsCount] = useState(() => {
    return parseInt(localStorage.getItem('foundTagsCount') || '0');
  });

  // Listen for changes to foundTagsCount in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const newCount = parseInt(localStorage.getItem('foundTagsCount') || '0');
      setFoundTagsCount(newCount);
    };
    
    // Listen for both storage events (cross-tab) and our custom event (same-tab)
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(TAGS_COUNT_EVENT, handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(TAGS_COUNT_EVENT, handleStorageChange);
    };
  }, []);

  const tabs = [
    { icon: wordSearch, alt: 'Word Search', tooltip: 'Search for specific words in the video' },
    { icon: autoSearch, alt: 'Auto Search', tooltip: 'Set words to automatically search in any video' },
    { icon: insights, alt: 'Insights', tooltip: 'Get insights about the video content' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <WordSearchTab />;
      case 1:
        return <AutoSearchTab />;
      case 2:
        return <InsightsTab />;
      default:
        return <WordSearchTab />;
    }
  };

  return (
    <div className="w-full mx-auto bg-bg-primary rounded overflow-hidden">
      <div className="w-full bg-bg-primary flex items-center">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex-1 py-3 flex justify-center items-center cursor-pointer transition-all duration-normal ease-in-out hover:bg-bg-secondary ${
              activeTab === index ? 'bg-bg-secondary border-b-2 border-accent' : 'bg-bg-primary border-b-2 border-transparent'
            }`}
            onClick={() => setActiveTab(index)}
            title={tab.tooltip}
          >
            <div className="relative">
              <img 
                src={tab.icon} 
                alt={tab.alt} 
                className={`w-12 h-12 ${activeTab === index ? 'brightness-110' : 'brightness-50'}`}
              />
              {index === 1 && foundTagsCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-brand text-white text-base rounded-full w-6 h-6 flex items-center justify-center">
                  {foundTagsCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default SearchTabs; 