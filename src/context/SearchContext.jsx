import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranscriptSearch } from '../hooks/useTranscriptSearch';
import { getCurrentVideoId } from '../services/youtubeTranscriptService';

const SearchContext = createContext();

const STORAGE_KEY = 'tabStates';

// This map defines which component is at which tab index
const TAB_TYPES = {
  0: 'wordSearch',  // Position 0: Word Search
  1: 'autoSearch',  // Position 1: Auto Search (moved from position 2)
  2: 'insights',    // Position 2: Insights (moved from position 1)
};

const getInitialTabStates = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      0: { searchWord: '', results: null },
      1: { searchWord: '', results: null },
      2: { searchWord: '', results: null }
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
  const [activeTab, setActiveTab] = useState(() => {
    return parseInt(localStorage.getItem('lastActiveTab') || '0');
  });
  const [tabStates, setTabStates] = useState(getInitialTabStates());
  const [lastVideoId, setLastVideoId] = useState(getCurrentVideoId());
  
  const { transcript, loading, error, search } = useTranscriptSearch();

  useEffect(() => {
    localStorage.setItem('lastActiveTab', activeTab.toString());
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tabStates));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [tabStates]);

  useEffect(() => {
    const currentVideoId = getCurrentVideoId();
    if (currentVideoId && currentVideoId !== lastVideoId) {
      setLastVideoId(currentVideoId);
      setTabStates(prev => ({
        ...prev,
        [activeTab]: {
          searchWord: '',
          results: null
        }
      }));
    }
  }, [transcript, lastVideoId, activeTab]);

  const handleSearch = (word, returnResults = false, overrideResults = null) => {
    let newResults;
    let searchResults = [];

    if (word.trim() === '') {
      newResults = null;
    } else {
      searchResults = overrideResults || search(word);
      
      // Use the tab type mapping to ensure consistent data structures
      const tabType = TAB_TYPES[activeTab];
      
      switch (tabType) {
        case 'wordSearch':
          newResults = { data: searchResults };
          break;
        case 'autoSearch':
          newResults = { data: searchResults };
          break;
        case 'insights':
          newResults = { 
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
        default:
          newResults = null;
      }
    }

    setTabStates(prev => ({
      ...prev,
      [activeTab]: {
        searchWord: word,
        results: newResults
      }
    }));
    
    if (returnResults) {
      return searchResults;
    }
  };

  const currentTabState = tabStates[activeTab] || { searchWord: '', results: null };

  const value = {
    activeTab,
    setActiveTab,
    searchWord: currentTabState.searchWord,
    setSearchWord: (word) => {
      setTabStates(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          searchWord: word,
          results: word.trim() === '' ? null : prev[activeTab].results
        }
      }));
    },
    results: currentTabState.results,
    handleSearch,
    clearResults: () => {
      setTabStates(prev => ({
        ...prev,
        [activeTab]: {
          searchWord: '',
          results: null
        }
      }));
    },
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