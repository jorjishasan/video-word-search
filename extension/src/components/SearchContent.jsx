import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import WordSearchTab from './WordSearch/WordSearchTab';
import AutoSearchTab from './AutoSearch/AutoSearchTab';
import InsightsTab from './InsightsTab';
import NoTranscriptMessage from './NoTranscriptMessage';
import { COLORS, borderRadius, text } from '../utils/styles';

const SearchContent = () => {
  const { activeTab, transcriptAvailable, error, loading } = useContext(SearchContext);

  // Show loading indicator if still loading
  if (loading) {
    return (
      <div style={{ padding: '1rem' }}> {/* p-4 */}
        <div style={{
          backgroundColor: COLORS.gray[800], // bg-gray-800
          borderRadius: borderRadius.md, // rounded-md
          padding: '1rem', // p-4
          textAlign: 'center', 
          color: COLORS.gray[400], // text-gray-400
          ...text.sm, // text-sm
        }}>
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