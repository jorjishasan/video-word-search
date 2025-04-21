import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranscriptSearch } from '../hooks/useTranscriptSearch';
import { getCurrentVideoId, hasTranscript, TRANSCRIPT_LOADED_EVENT, VIDEO_CHANGED_EVENT } from '../services/youtubeTranscriptService';
import { safeGetItem } from '../utils/storageUtils';

const SearchContext = createContext({
  activeTab: 'auto-search',
  setActiveTab: () => {},
  searchWord: '',
  setSearchWord: () => {},
  results: [],
  isLoading: false,
  error: null,
  handleSearch: () => {},
  transcriptAvailable: true,
});

// Local storage key only for autoSearch
const AUTO_SEARCH_STATE_KEY = 'autoSearchState';

// This map defines which component is at which tab index
const TAB_TYPES = {
  0: 'wordSearch',  // Position 0: Word Search
  1: 'autoSearch',  // Position 1: Auto Search
  2: 'insights',    // Position 2: Insights
};

// Initialize states with defaults
const getInitialTabStates = () => {
  // Default states for all tabs - only autoSearch is persistent
  const defaultStates = {
    0: { searchWord: '', results: null }, // wordSearch
    1: { searchWord: '', results: null }, // autoSearch - persisted
    2: { searchWord: '', results: null }  // insights
  };
  
  // Only restore autoSearch state from localStorage
  try {
    const storedAutoSearch = localStorage.getItem('autoSearchState');
    if (storedAutoSearch) {
      const parsedState = JSON.parse(storedAutoSearch);
      defaultStates[1] = parsedState;
    }
  } catch (error) {
    console.error('Error loading autoSearch state:', error);
  }
  
  return defaultStates;
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
  const [videoId, setVideoId] = useState(() => {
    return localStorage.getItem('lastVideoId') || null;
  });
  const [transcriptAvailable, setTranscriptAvailable] = useState(() => {
    return localStorage.getItem('hasTranscript') === 'true';
  });
  
  const { transcript, loading, error, search } = useTranscriptSearch();

  // Remember active tab
  useEffect(() => {
    localStorage.setItem('lastActiveTab', activeTab.toString());
    
    // Update autoSearch tab counts when switching to that tab
    if (activeTab === 1) {
      try {
        const tags = safeGetItem('autoSearchTags', []);
        const foundCount = tags.filter(tag => tag.found).length;
        localStorage.setItem('foundTagsCount', foundCount.toString());
        
        // Notify UI components about tag count changes
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('foundTagsCountChanged', { 
          detail: { count: foundCount } 
        }));
      } catch (error) {
        console.error('Error updating foundTagsCount:', error);
      }
    }
  }, [activeTab]);

  // Only save autoSearch tab state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('autoSearchState', JSON.stringify(tabStates[1]));
    } catch (error) {
      console.error('Error saving autoSearch state:', error);
    }
  }, [tabStates[1]]);

  // Handle transcript and video changes via events
  useEffect(() => {
    const handleTranscriptLoaded = (event) => {
      const { videoId: loadedVideoId } = event.detail;
      
      if (loadedVideoId !== videoId) {
        setVideoId(loadedVideoId);
      }
      
      // If transcript was loaded, it's available
      setTranscriptAvailable(true);
    };
    
    const handleVideoChanged = (event) => {
      const { videoId: changedVideoId } = event.detail;
      
      if (changedVideoId !== videoId) {
        setVideoId(changedVideoId);
      }
      
      // Update transcript availability from localStorage
      setTranscriptAvailable(hasTranscript());
      
      // Reset search results when video changes
      setTabStates(prev => ({
        ...prev,
        0: { searchWord: '', results: null }, // Clear wordSearch
        2: { searchWord: '', results: null }  // Clear insights
      }));
      
      // Ensure foundTagsCount is reset to 0 if hasTranscript is false
      if (!hasTranscript()) {
        localStorage.setItem('foundTagsCount', '0');
        window.dispatchEvent(new CustomEvent('foundTagsCountChanged', { 
          detail: { count: 0 } 
        }));
      }
    };
    
    // Modify the handleUrlChange function to use the same reset logic
    const handleUrlChange = () => {
      const currentVideoId = getCurrentVideoId();
      if (currentVideoId !== videoId) {
        setVideoId(currentVideoId);
        
        // Reset search results when video changes
        setTabStates(prev => ({
          ...prev,
          0: { searchWord: '', results: null }, // Clear wordSearch
          2: { searchWord: '', results: null }  // Clear insights
        }));
        
        // Update transcript availability from localStorage
        setTranscriptAvailable(hasTranscript());
        
        // Ensure foundTagsCount is reset to 0 if hasTranscript is false
        if (!hasTranscript()) {
          localStorage.setItem('foundTagsCount', '0');
          window.dispatchEvent(new CustomEvent('foundTagsCountChanged', { 
            detail: { count: 0 } 
          }));
        }
      }
    };
    
    // Add listeners for events
    window.addEventListener(TRANSCRIPT_LOADED_EVENT, handleTranscriptLoaded);
    window.addEventListener(VIDEO_CHANGED_EVENT, handleVideoChanged);
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('yt-navigate-finish', handleUrlChange);
    
    return () => {
      window.removeEventListener(TRANSCRIPT_LOADED_EVENT, handleTranscriptLoaded);
      window.removeEventListener(VIDEO_CHANGED_EVENT, handleVideoChanged);
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('yt-navigate-finish', handleUrlChange);
    };
  }, [videoId]);

  // Check transcript availability when component mounts or changes
  useEffect(() => {
    // Update transcriptAvailable based on localStorage value
    setTranscriptAvailable(hasTranscript());
  }, [transcript, loading, error]);

  const handleSearch = useCallback((word, returnResults = false, overrideResults = null, isExactWordMatch = null) => {
    let newResults;
    let searchResults = [];

    if (!word || word.trim() === '') {
      newResults = null;
    } else {
      const trimmedWord = word.trim();
      
      // Determine search type based on tab if not explicitly provided
      let shouldUseExactWordMatch = isExactWordMatch;
      
      // If not explicitly provided, determine based on tab type
      if (shouldUseExactWordMatch === null) {
        const tabType = TAB_TYPES[activeTab];
        // Use exact word matching only for autoSearch tab
        shouldUseExactWordMatch = tabType === 'autoSearch';
      }
      
      searchResults = overrideResults || search(trimmedWord, shouldUseExactWordMatch);
      
      // Format results based on tab type
      const tabType = TAB_TYPES[activeTab];
      
      switch (tabType) {
        case 'wordSearch':
          newResults = { 
            data: searchResults,
            timestamp: Date.now() // Add timestamp to track freshness
          };
          break;
        case 'autoSearch':
          newResults = { 
            data: searchResults,
            timestamp: Date.now()
          };
          break;
        case 'insights':
          newResults = { 
            data: [
              {
                type: 'keyword',
                word: trimmedWord,
                occurrences: searchResults.length,
                timestamps: searchResults.map(r => r.timestamp),
                context: `Found ${searchResults.length} mentions in video`
              }
            ],
            timestamp: Date.now()
          };
          break;
        default:
          newResults = null;
      }
    }

    // Update tab state with new results
    setTabStates(prev => ({
      ...prev,
      [activeTab]: {
        searchWord: word || '',
        results: newResults
      }
    }));
    
    if (returnResults) {
      return searchResults;
    }
  }, [activeTab, search]);

  // Get current tab state
  const currentTabState = tabStates[activeTab] || { searchWord: '', results: null };

  // Context value object
  const value = {
    activeTab,
    setActiveTab,
    searchWord: currentTabState.searchWord,
    setSearchWord: (word) => {
      setTabStates(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          searchWord: word || ''
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
    transcript,
    transcriptAvailable,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 