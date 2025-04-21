import React, { useState, useEffect } from 'react';
import wordSearch from '../assets/wordSearch.svg';
import insights from '../assets/insights.svg';
import autoSearch from '../assets/autoSearch.svg';
import { useSearch } from '../context/SearchContext';
import WordSearchTab from './WordSearch/WordSearchTab';
import InsightsTab from './InsightsTab';
import AutoSearchTab from './AutoSearch/AutoSearchTab';
import { COLORS, transition, flexCenter } from '../utils/styles';

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

  const containerStyle = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: COLORS.bg.primary,
    borderRadius: '0.25rem',
    overflow: 'hidden'
  };

  const tabsContainerStyle = {
    width: '100%',
    backgroundColor: COLORS.bg.primary,
    display: 'flex',
    alignItems: 'center'
  };

  const getTabStyle = (index) => {
    return {
      flex: '1 1 0%',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: transition.all,
      backgroundColor: activeTab === index ? COLORS.bg.secondary : COLORS.bg.primary,
    };
  };

  const tabIconContainerStyle = {
    position: 'relative'
  };

  const getTabIconStyle = (index) => {
    return {
      width: '3rem',
      height: '3rem',
      filter: activeTab === index ? 'brightness(1.1)' : 'brightness(0.5)'
    };
  };

  const badgeStyle = {
    position: 'absolute',
    top: '-0.25rem',
    right: '-0.25rem',
    backgroundColor: COLORS.brand,
    color: COLORS.white,
    fontSize: '1rem',
    borderRadius: '9999px',
    width: '1.5rem',
    height: '1.5rem',
    ...flexCenter
  };

  return (
    <div style={containerStyle}>
      <div style={tabsContainerStyle}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={getTabStyle(index)}
            onClick={() => setActiveTab(index)}
            title={tab.tooltip}
          >
            <div style={tabIconContainerStyle}>
              <img 
                src={tab.icon} 
                alt={tab.alt} 
                style={getTabIconStyle(index)}
              />
              {index === 1 && foundTagsCount > 0 && (
                <div style={badgeStyle}>
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