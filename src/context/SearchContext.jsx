import React, { createContext, useContext, useState, useEffect } from 'react';
import { wordSearchResults, insightsResults, autoSearchResults } from '../data/mockData';

const SearchContext = createContext();

const STORAGE_KEY = 'tabStates';

const getInitialTabStates = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      0: { searchWord: '', results: null }, // Word Search
      1: { searchWord: '', results: null }, // Insights
      2: { searchWord: '', results: null }  // Auto Search
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {
      0: { searchWord: '', results: null },
      1: { searchWord: '', results: null },
      2: { searchWord: '', results: null }
    };
  }
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  // Get the last active tab from localStorage or default to 0
  const lastActiveTab = parseInt(localStorage.getItem('lastActiveTab') || '0');
  const [activeTab, setActiveTab] = useState(lastActiveTab);
  const [tabStates, setTabStates] = useState(getInitialTabStates());

  // Save active tab whenever it changes
  useEffect(() => {
    localStorage.setItem('lastActiveTab', activeTab.toString());
  }, [activeTab]);

  // Save tab states whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tabStates));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [tabStates]);

  const handleSearch = (word) => {
    let newResults;
    // Simulate API call with different results based on active tab
    switch (activeTab) {
      case 0:
        newResults = { type: 'wordSearch', data: wordSearchResults };
        break;
      case 1:
        newResults = { type: 'insights', data: insightsResults };
        break;
      case 2:
        newResults = { type: 'autoSearch', data: autoSearchResults };
        break;
      default:
        newResults = null;
    }

    // Update the current tab's state
    setTabStates(prev => ({
      ...prev,
      [activeTab]: {
        searchWord: word,
        results: newResults
      }
    }));
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const clearResults = () => {
    setTabStates(prev => ({
      ...prev,
      [activeTab]: {
        searchWord: '',
        results: null
      }
    }));
  };

  // Get current tab's state
  const currentTabState = tabStates[activeTab] || { searchWord: '', results: null };

  const value = {
    activeTab,
    setActiveTab: handleTabChange,
    searchWord: currentTabState.searchWord,
    setSearchWord: (word) => {
      setTabStates(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          searchWord: word,
          // Clear results if search word is empty
          results: word.trim() === '' ? null : prev[activeTab].results
        }
      }));
    },
    results: currentTabState.results,
    handleSearch,
    clearResults
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 