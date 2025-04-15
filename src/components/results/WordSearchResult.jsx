import React, { useState } from 'react';
import { usePlayback } from '../../hooks/usePlayback';
import { ERROR_NOTIFICATION, ERROR_CLOSE_BUTTON } from '../../utils/styles';

const WordSearchResult = ({ results }) => {
  const { seekToTime, lastPlayedTimestamp, playbackError, setPlaybackError } = usePlayback();
  const [error, setError] = useState(null);

  const handleSeek = async (timestamp) => {
    try {
      await seekToTime(timestamp);
    } catch (err) {
      setError(err.message);
    }
  };

  const dismissError = () => {
    setError(null);
    setPlaybackError(null);
  };

  const formatTimestampText = (timestamp, before, match, after) => (
    <>
      {before}<span className="text-content-primary font-medium">{match}</span>{after}
    </>
  );

  return (
    <div className="bg-bg-highlight text-content-primary">
      {(error || playbackError) && (
        <div className={ERROR_NOTIFICATION}>
          {error || playbackError}
          <button 
            onClick={dismissError}
            className={ERROR_CLOSE_BUTTON}
          >
            &times;
          </button>
        </div>
      )}
      
      {results.map((result, index) => (
        <div 
          key={index}
          onClick={() => handleSeek(result.timestamp)}
          className="p-md border-b border-bg-highlight flex justify-between items-center cursor-pointer transition-colors duration-fast ease-in-out hover:bg-bg-highlight last:border-b-0"
        >
          <div className="text-content-secondary flex-1">
            {formatTimestampText(
              result.timestamp,
              result.textBefore + " ",
              result.matchedText,
              " " + result.textAfter
            )}
          </div>
          <div className={`text-content-secondary transition-colors duration-fast ease-in-out group-hover:text-brand ${lastPlayedTimestamp === result.timestamp ? 'flex items-center' : ''}`}>
            {result.formattedTime}
            {lastPlayedTimestamp === result.timestamp && (
              <span className="ml-sm py-xs px-xs rounded-sm bg-brand text-content-primary text-xs">LAST PLAYED</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordSearchResult; 