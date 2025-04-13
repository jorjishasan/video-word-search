import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranscriptSearch } from '../hooks/useTranscriptSearch';

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
  
  // Use the transcript search hook
  const { transcript, loading, error, search } = useTranscriptSearch();

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

    if (word.trim() === '') {
      newResults = null;
    } else {
      // For now, we only have real implementation for wordSearch
      // Future implementation would handle other tabs differently
      const searchResults = search(word);
      
      switch (activeTab) {
        case 0: // Word Search
          newResults = { type: 'wordSearch', data: searchResults };
          break;
        case 1: // Insights - currently returns placeholder data based on transcript
          newResults = { 
            type: 'insights', 
            data: [
              {
                type: 'keyword',
                word,
                occurrences: searchResults.length,
                timestamps: searchResults.map(r => r.timestamp),
                context: `Found ${searchResults.length} mentions in video`
              }
            ] 
          };
          break;
        case 2: // Auto Search - currently returns placeholder data based on transcript
          newResults = { 
            type: 'autoSearch', 
            data: [
              {
                category: 'Search Results',
                words: searchResults.map(r => ({
                  word: r.word,
                  timestamp: r.timestamp,
                  confidence: 0.95
                }))
              }
            ] 
          };
          break;
        default:
          newResults = null;
      }
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
    clearResults,
    loading,
    error,
    transcript
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 