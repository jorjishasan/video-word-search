import React from 'react';
import styled from 'styled-components';

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

  &:last-child {
    border-bottom: none;
  }
`;

const ResultText = styled.div`
  font-family: monospace;
  color: #8b9398;

  span {
    color: #fff;
    font-weight: 500;
  }
`;

const Timestamp = styled.div`
  font-family: monospace;
  color: #8b9398;
`;

const WordSearchResult = ({ results }) => {
  return (
    <ResultContainer>
      {results.map((result, index) => (
        <ResultItem key={index}>
          <ResultText>
            ...this <span>{result.word}</span> {result.context}..
          </ResultText>
          <Timestamp>{result.timestamp}</Timestamp>
        </ResultItem>
      ))}
    </ResultContainer>
  );
};

export default WordSearchResult; 