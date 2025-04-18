import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import WordSearchTab from './WordSearch/WordSearchTab';
import AutoSearchTab from './AutoSearch/AutoSearchTab';
import InsightsTab from './InsightsTab';
import NoTranscriptMessage from './NoTranscriptMessage';

const SearchContent = () => {
  const { activeTab, transcriptAvailable, error, loading } = useContext(SearchContext);

  // Show loading indicator if still loading
  if (loading) {
    return (
      <div className="p-4">
        <div className="bg-gray-800 rounded-md p-4 text-center text-gray-400 text-sm">
          Loading transcript...
        </div>
      </div>
    );
  }

  // Return no transcript message if transcript is not available or there's an error
  if (!transcriptAvailable || error) {
    return <NoTranscriptMessage errorMessage={error} />;
  }

  // Render the appropriate component based on active tab
  switch (activeTab) {
    case 'word-search':
    case 0:
      return <WordSearchTab />;
    case 'auto-search':
    case 1:
      return <AutoSearchTab />;
    case 'insights':
    case 2:
      return <InsightsTab />;
    default:
      return <AutoSearchTab />;
  }
};

export default SearchContent; 