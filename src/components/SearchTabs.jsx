import React from 'react';
import wordSearch from '../assets/wordSearch.svg';
import insights from '../assets/insights.svg';
import autoSearch from '../assets/autoSearch.svg';
import { useSearch } from '../context/SearchContext';
import WordSearchTab from './WordSearch/WordSearchTab';
import InsightsTab from './Insights/InsightsTab';
import AutoSearchTab from './AutoSearch/AutoSearchTab';

const SearchTabs = () => {
  const { activeTab, setActiveTab } = useSearch();
  
  // Get the found tags count (will be set by AutoSearchTab)
  const foundTagsCount = parseInt(localStorage.getItem('foundTagsCount') || '0');

  const tabs = [
    { icon: wordSearch, alt: 'Word Search' },
    { icon: insights, alt: 'Insights' },
    { icon: autoSearch, alt: 'Auto Search' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <WordSearchTab />;
      case 1:
        return <InsightsTab />;
      case 2:
        return <AutoSearchTab />;
      default:
        return <WordSearchTab />;
    }
  };

  return (
    <div className="w-full max-w-[300px] mx-auto bg-bg-primary rounded overflow-hidden">
      <div className="w-full bg-bg-primary flex items-center">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex-1 py-sm flex justify-center items-center cursor-pointer transition-all duration-normal ease-in-out hover:bg-bg-secondary ${
              activeTab === index ? 'bg-bg-secondary border-b-2 border-bg-interactive' : 'bg-bg-primary border-b-2 border-transparent'
            }`}
            onClick={() => setActiveTab(index)}
          >
            <div className="relative">
              <img 
                src={tab.icon} 
                alt={tab.alt} 
                className={`w-10 h-10 ${activeTab === index ? 'brightness-100' : 'brightness-70'}`}
              />
              {index === 2 && foundTagsCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {foundTagsCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {renderActiveTab()}
    </div>
  );
};

export default SearchTabs; 