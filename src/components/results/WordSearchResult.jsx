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
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2a363c;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ResultText = styled.div`
  font-family: monospace;
  color: #8b9398;
  flex: 1;

  span {
    color: #fff;
    font-weight: 500;
  }
`;

const Timestamp = styled.div`
  font-family: monospace;
  color: #8b9398;
  transition: color 0.2s ease;
  
  ${ResultItem}:hover & {
    color: #4CAF50;
  }
`;

const LastPlayed = styled.span`
  margin-left: 8px;
  padding: 2px 5px;
  border-radius: 3px;
  background-color: #4CAF50;
  color: #fff;
  font-size: 10px;
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

const WordSearchResult = ({ results }) => {
  const { playAtTimestamp, lastPlayedTimestamp, playbackError } = usePlayback();
  const [error, setError] = useState(null);
  
  const handleResultClick = (timestamp) => {
    console.log(`Clicked on result with timestamp: ${timestamp}`);
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
        <ResultItem 
          key={index} 
          onClick={() => handleResultClick(result.timestamp)}
        >
          <ResultText>
            ...this <span>{result.word}</span> {result.context}..
          </ResultText>
          <Timestamp>
            {result.timestamp}
            {lastPlayedTimestamp === result.timestamp && (
              <LastPlayed>▶ played</LastPlayed>
            )}
          </Timestamp>
        </ResultItem>
      ))}
    </ResultContainer>
  );
};

export default WordSearchResult; 