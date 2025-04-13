import React, { useState } from 'react';
import styled from 'styled-components';
import { usePlayback } from '../../hooks/usePlayback';

const ResultContainer = styled.div`
  background-color: #1E2A2F;
  color: #fff;
`;

const CategorySection = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #2a363c;

  &:last-child {
    border-bottom: none;
  }
`;

const CategoryTitle = styled.div`
  color: #8b9398;
  font-family: monospace;
  font-size: 14px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const WordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
`;

const WordItem = styled.div`
  background-color: #2a363c;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;
  
  &:hover {
    background-color: #3a464c;
  }
  
  &.played {
    box-shadow: 0 0 0 2px #4CAF50;
  }
`;

const Word = styled.div`
  color: #fff;
  font-family: monospace;
  font-size: 16px;
  margin-bottom: 4px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Timestamp = styled.span`
  color: #8b9398;
  font-family: monospace;
  font-size: 12px;
  transition: color 0.2s ease;
  
  ${WordItem}:hover & {
    color: #4CAF50;
  }
  
  ${WordItem}.played & {
    color: #4CAF50;
  }
`;

const Confidence = styled.span`
  color: ${props => props.value >= 0.9 ? '#4CAF50' : '#FFC107'};
  font-family: monospace;
  font-size: 12px;
`;

const PlayedIndicator = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const AutoSearchResult = ({ results }) => {
  const { playAtTimestamp, lastPlayedTimestamp, playbackError } = usePlayback();
  const [error, setError] = useState(null);
  
  const handleItemClick = (timestamp) => {
    console.log(`Clicked on item with timestamp: ${timestamp}`);
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
      {results.map((category, index) => (
        <CategorySection key={index}>
          <CategoryTitle>{category.category}</CategoryTitle>
          <WordGrid>
            {category.words.map((word, wordIndex) => (
              <WordItem 
                key={wordIndex} 
                onClick={() => handleItemClick(word.timestamp)}
                className={lastPlayedTimestamp === word.timestamp ? 'played' : ''}
              >
                {lastPlayedTimestamp === word.timestamp && (
                  <PlayedIndicator>▶</PlayedIndicator>
                )}
                <Word>{word.word}</Word>
                <Details>
                  <Timestamp>
                    {word.timestamp}
                  </Timestamp>
                  <Confidence value={word.confidence}>
                    {Math.round(word.confidence * 100)}%
                  </Confidence>
                </Details>
              </WordItem>
            ))}
          </WordGrid>
        </CategorySection>
      ))}
    </ResultContainer>
  );
};

export default AutoSearchResult; 