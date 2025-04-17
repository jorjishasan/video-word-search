# Video Word Search: Technical Architecture

## Overview

Video Word Search is a browser extension that enhances the YouTube video watching experience by adding transcript search capabilities directly within the YouTube interface. It allows users to:

1. Search for specific words or phrases in a video's transcript
2. Set up auto-search terms that will be searched across all videos
3. Get insights about the video content

## Architecture

The application follows a modern React architecture with context-based state management, custom hooks for shared logic, and service-based API interactions.

### Component Hierarchy

```
Root (script-injector.jsx)
└── SearchProvider (Context)
    └── UI
        ├── ToggleButton
        └── SearchTabs
            ├── WordSearchTab
            │   └── SearchResultsContainer
            │       └── SearchResultItem
            ├── AutoSearchTab
            │   └── TagsContainer
            │       └── Tag
            └── InsightsTab
```

### Key Technical Components

#### 1. Extension Injection (script-injector.jsx)

The entry point of the application that:
- Injects the React UI into the YouTube DOM
- Observes URL changes to handle YouTube's SPA navigation
- Manages component mounting/unmounting when videos change

```javascript
const injectUI = () => {
  // Find YouTube player container
  const playerContainer = document.querySelector('#player-container-inner');
  
  // Create UI container and append to player
  const uiContainer = document.createElement('div');
  uiContainer.id = 'video-word-search-ui';
  
  // Render React app
  const root = createRoot(uiContainer);
  root.render(
    <SearchProvider>
      <UI />
    </SearchProvider>
  );
};
```

#### 2. Transcript Service (youtubeTranscriptService.js)

Core service that:
- Extracts and parses YouTube's transcript data from the page
- Provides search functionality with different algorithms:
  - Phrase/partial search for WordSearch tab
  - Exact word search for AutoSearch tags
- Handles transcript availability detection and caching

```javascript
export const searchTranscript = (searchWord, transcript, videoId, isExactWordMatch = false) => {
  // For each timestamp in the transcript
  Object.entries(transcript).forEach(([timestamp, text]) => {
    const textLower = text.toLowerCase();
    
    if (isExactWordMatch) {
      // For AutoSearch: Exact word match (ignoring case)
      const wordBoundaryRegex = new RegExp(`\\b${escapedSearchWord}\\b`, 'i');
      if (wordBoundaryRegex.test(textLower)) {
        results.push({ word: searchWord, context: text, timestamp, videoId });
      }
    } else {
      // For WordSearch: Phrase and partial word matching
      if (textLower.includes(searchWordLower)) {
        results.push({ word: searchWord, context: text, timestamp, videoId });
      }
    }
  });
};
```

#### 3. State Management (SearchContext.jsx)

Central state management system that:
- Maintains the global search state (active tab, search terms, results)
- Provides methods for performing searches
- Handles tab switching and state persistence
- Manages transcript availability status

```javascript
const SearchProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabStates, setTabStates] = useState({
    0: { searchWord: '', results: null }, // WordSearch
    1: { searchWord: '', results: null }, // AutoSearch
    2: { searchWord: '', results: null }  // Insights
  });
  
  // Get current tab state
  const currentTabState = tabStates[activeTab];
  
  // Search function with appropriate algorithm per tab
  const handleSearch = (word, returnResults = false, overrideResults = null, isExactWordMatch = null) => {
    // Determine search type based on tab if not explicitly provided
    if (isExactWordMatch === null) {
      isExactWordMatch = TAB_TYPES[activeTab] === 'autoSearch';
    }
    
    // Perform the search and update state
    const searchResults = search(word, isExactWordMatch);
    
    setTabStates(prev => ({
      ...prev,
      [activeTab]: {
        searchWord: word,
        results: { data: searchResults, timestamp: Date.now() }
      }
    }));
  };
};
```

#### 4. Tab Components

##### Word Search Tab (WordSearchTab.jsx)
- Provides real-time phrase search with debouncing
- Displays results with highlighted matching terms
- Supports single-line truncated result display with ellipsis

##### Auto Search Tab (AutoSearchTab.jsx)
- Allows users to add/remove permanent search tags
- Uses exact word matching algorithm
- Automatically checks all tags against new videos
- Visual indicators for found/not found tags

##### Insights Tab (InsightsTab.jsx)
- Placeholder for future video content analysis features

### Data Flow

1. **Initialization**:
   - Script injection into YouTube page
   - Context provider initialized
   - Check for transcript availability
   - Load any saved AutoSearch tags

2. **Search Flow**:
   - User enters search term (or tags)
   - Debounced search triggered (for WordSearch)
   - Context search method called with appropriate parameters
   - Results formatted and stored in context
   - UI components re-render with new results

3. **Video Navigation**:
   - YouTube video change detected
   - Transcript fetched for new video
   - AutoSearch tags checked against new transcript
   - UI updated to reflect new transcript status

### Storage Strategy

The extension uses browser localStorage for persistence:
- `ytTranscript`: Caches the current video's transcript
- `lastVideoId`: Tracks which video transcript is cached
- `hasTranscript`: Boolean flag for transcript availability
- `autoSearchTags`: Array of saved tag objects with found status
- `foundTagsCount`: Counter for found tags (used for UI indicators)

## Key Technical Features

### 1. Dual Search Algorithms

The app implements two different search strategies:
1. **Phrase/Partial Search** (WordSearch) - Matches substrings:
   - "ove" will match "love"
   - "love you" will match exact phrase

2. **Exact Word Search** (AutoSearch) - Matches whole words:
   - "love" matches only the complete word "love"
   - Case insensitive but requires word boundaries

### 2. Real-time UI Updates

- Debounced search for performance
- Tag status indication with color coding
- Notification badge on extension button
- Automatic tag checking when videos change

### 3. Transcript Extraction

- Parses YouTube's hidden transcript data
- Handles multi-language support
- Maps timestamps to text segments
- Caches for performance

### 4. UI Integration

- Seamlessly integrates with YouTube's player UI
- Handles YouTube's SPA navigation
- Responsive layout with proper overflow handling

## Technical Challenges and Solutions

### 1. YouTube SPA Navigation

**Challenge**: YouTube uses a single-page application architecture, making it difficult to detect page changes.

**Solution**: A combination of URL monitoring and DOM mutation observers to detect navigation events and reinitialize the extension when needed.

### 2. Transcript Data Access

**Challenge**: YouTube doesn't expose transcript data through a public API.

**Solution**: Extract transcript data from YouTube's player response object embedded in the page, parse it, and structure it for efficient searching.

### 3. Search Performance

**Challenge**: Searching large transcripts could become performance-intensive.

**Solution**: 
- Efficient regex-based search algorithms
- Debounced input to prevent excessive processing
- Caching of search results

### 4. UI Integration

**Challenge**: Seamlessly integrating with YouTube's UI without disrupting the user experience.

**Solution**:
- Positioned UI based on YouTube's player container
- Collapsible interface to minimize visual intrusion
- Styling that complements YouTube's design language

## Future Architecture Considerations

1. **Backend Integration**:
   - Move transcript processing to a backend service
   - Enable cross-device persistence of tags and settings
   - Implement more advanced search and analysis capabilities

2. **Performance Optimizations**:
   - Web Worker implementation for search operations
   - IndexedDB for more efficient local storage
   - Virtualized lists for handling large result sets

3. **Feature Expansion**:
   - Implementation of the Insights tab with ML-based content analysis
   - User settings for customizing appearance and behavior
   - Support for more video platforms beyond YouTube

## Conclusion

Video Word Search follows a modern React architecture with a focus on performance, modularity, and seamless integration with YouTube. The application leverages context-based state management, custom hooks for shared logic, and efficient data processing to provide a smooth user experience while extending YouTube's native capabilities. 