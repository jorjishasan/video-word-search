import React, { useState } from 'react';
import { usePlayback } from '../../hooks/usePlayback';
import { ERROR_NOTIFICATION, ERROR_CLOSE_BUTTON } from '../../utils/styles';

const InsightsResult = ({ results }) => {
  const { playAtTimestamp, lastPlayedTimestamp, playbackError } = usePlayback();
  const [error, setError] = useState(null);
  
  const handleTimestampClick = (timestamp) => {
    console.log(`Clicked on timestamp: ${timestamp}`);
    const success = playAtTimestamp(timestamp);
    if (!success) {
      setError(`Failed to play at timestamp ${timestamp}. Make sure you're on a YouTube page.`);
    }
  };
  
  const closeError = () => {
    setError(null);
  };
  
  return (
    <div className="bg-bg-highlight text-content-primary">
      {(error || playbackError) && (
        <div className={ERROR_NOTIFICATION}>
          {error || playbackError}
          <button 
            onClick={closeError}
            className={ERROR_CLOSE_BUTTON}
          >
            ×
          </button>
        </div>
      )}
      {results.map((result, index) => (
        <div key={index} className="p-md border-b border-bg-highlight">
          <div className="flex justify-between items-center mb-sm">
            <span className="text-content-secondary text-sm uppercase tracking-wider">{result.type}</span>
            <span className="text-content-secondary">{result.occurrences} occurrences</span>
          </div>
          <div className="text-content-primary text-lg mb-sm font-bold">{result.word}</div>
          <div className="text-content-secondary text-sm">{result.context}</div>
          <div className="text-content-secondary text-xs mt-sm">
            Found at: {result.timestamps.map((timestamp, i) => (
              <React.Fragment key={i}>
                {i > 0 && ', '}
                <span 
                  onClick={() => handleTimestampClick(timestamp)}
                  className={`cursor-pointer transition-colors duration-fast p-xs rounded-sm relative hover:text-brand hover:bg-bg-highlight ${lastPlayedTimestamp === timestamp ? 'bg-brand text-content-primary' : ''}`}
                >
                  {timestamp}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsightsResult; 