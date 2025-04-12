import React from 'react';
import styled from 'styled-components';

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
`;

const Confidence = styled.span`
  color: ${props => props.value >= 0.9 ? '#4CAF50' : '#FFC107'};
  font-family: monospace;
  font-size: 12px;
`;

const AutoSearchResult = ({ results }) => {
  return (
    <ResultContainer>
      {results.map((category, index) => (
        <CategorySection key={index}>
          <CategoryTitle>{category.category}</CategoryTitle>
          <WordGrid>
            {category.words.map((word, wordIndex) => (
              <WordItem key={wordIndex}>
                <Word>{word.word}</Word>
                <Details>
                  <Timestamp>{word.timestamp}</Timestamp>
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