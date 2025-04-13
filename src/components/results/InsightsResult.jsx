import React, { useState } from 'react';
import styled from 'styled-components';
import { usePlayback } from '../../hooks/usePlayback';

const ResultContainer = styled.div`
  background-color: #1E2A2F;
  color: #fff;
`;

const ResultItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #2a363c;
`;

const InsightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const InsightType = styled.span`
  color: #8b9398;
  font-family: monospace;
  font-size: 14px;
  text-transform: uppercase;
`;

const Occurrences = styled.span`
  color: #8b9398;
  font-family: monospace;
`;

const Word = styled.div`
  color: #fff;
  font-family: monospace;
  font-size: 18px;
  margin-bottom: 8px;
`;

const Context = styled.div`
  color: #8b9398;
  font-family: monospace;
  font-size: 14px;
`;

const Timestamps = styled.div`
  color: #8b9398;
  font-family: monospace;
  font-size: 12px;
  margin-top: 8px;
`;

const TimestampItem = styled.span`
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 2px 5px;
  border-radius: 3px;
  position: relative;
  
  &:hover {
    color: #4CAF50;
    background-color: #2a363c;
  }
  
  &.played {
    background-color: #4CAF50;
    color: #fff;
  }
`;

const ErrorMessage = styled.div`
  background-color: #B71C1C;
  color: white;
  padding: 10px 15px;
  margin: 5px 20px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
  padding: 0 5px;
`;

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
    <ResultContainer>
      {(error || playbackError) && (
        <ErrorMessage>
          {error || playbackError}
          <CloseButton onClick={closeError}>×</CloseButton>
        </ErrorMessage>
      )}
      {results.map((result, index) => (
        <ResultItem key={index}>
          <InsightHeader>
            <InsightType>{result.type}</InsightType>
            <Occurrences>{result.occurrences} occurrences</Occurrences>
          </InsightHeader>
          <Word>{result.word}</Word>
          <Context>{result.context}</Context>
          <Timestamps>
            Found at: {result.timestamps.map((timestamp, i) => (
              <React.Fragment key={i}>
                {i > 0 && ', '}
                <TimestampItem 
                  onClick={() => handleTimestampClick(timestamp)}
                  className={lastPlayedTimestamp === timestamp ? 'played' : ''}
                >
                  {timestamp}
                </TimestampItem>
              </React.Fragment>
            ))}
          </Timestamps>
        </ResultItem>
      ))}
    </ResultContainer>
  );
};

export default InsightsResult; 