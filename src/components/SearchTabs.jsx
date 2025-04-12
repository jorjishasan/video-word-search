import React from 'react';
import styled from 'styled-components';
import wordSearch from '../assets/wordSearch.svg';
import insights from '../assets/insights.svg';
import autoSearch from '../assets/autoSearch.svg';
import { useSearch } from '../context/SearchContext';
import WordSearchResult from './results/WordSearchResult';
import InsightsResult from './results/InsightsResult';
import AutoSearchResult from './results/AutoSearchResult';

const TabContainer = styled.div`
  width: 100%;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
`;

const Tab = styled.div.attrs(props => ({
  style: {
    backgroundColor: props.$isActive ? '#2a2a2a' : '#1a1a1a',
    borderBottom: `2px solid ${props.$isActive ? '#4a4a4a' : 'transparent'}`
  }
}))`
  flex: 1;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2a2a2a;
  }

  img {
    width: 24px;
    height: 24px;
    filter: ${props => props.$isActive ? 'brightness(1)' : 'brightness(0.7)'};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  background-color: #2a2a2a;
  border: none;
  color: #ffffff;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  &::placeholder {
    color: #666;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
`;

const ResultsContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  &::-webkit-scrollbar-thumb {
    background: #2a363c;
    border-radius: 4px;
  }
`;

const SearchTabs = () => {
  const { 
    activeTab, 
    setActiveTab, 
    searchWord, 
    setSearchWord, 
    results, 
    handleSearch
  } = useSearch();

  const tabs = [
    { icon: wordSearch, alt: 'Word Search' },
    { icon: insights, alt: 'Insights' },
    { icon: autoSearch, alt: 'Auto Search' }
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchWord.trim()) {
      handleSearch(searchWord);
    }
  };

  const renderResults = () => {
    if (!results) return null;

    switch (results.type) {
      case 'wordSearch':
        return <WordSearchResult results={results.data} />;
      case 'insights':
        return <InsightsResult results={results.data} />;
      case 'autoSearch':
        return <AutoSearchResult results={results.data} />;
      default:
        return null;
    }
  };

  return (
    <SearchContainer>
      <TabContainer>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            $isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            <img src={tab.icon} alt={tab.alt} />
          </Tab>
        ))}
      </TabContainer>
      <SearchInput
        type="text"
        placeholder="Enter search word..."
        value={searchWord || ''}
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ResultsContainer>
        {renderResults()}
      </ResultsContainer>
    </SearchContainer>
  );
};

export default SearchTabs; 