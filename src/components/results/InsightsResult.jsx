import React from 'react';
import styled from 'styled-components';

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

const InsightsResult = ({ results }) => {
  return (
    <ResultContainer>
      {results.map((result, index) => (
        <ResultItem key={index}>
          <InsightHeader>
            <InsightType>{result.type}</InsightType>
            <Occurrences>{result.occurrences} occurrences</Occurrences>
          </InsightHeader>
          <Word>{result.word}</Word>
          <Context>{result.context}</Context>
          <Timestamps>
            Found at: {result.timestamps.join(', ')}
          </Timestamps>
        </ResultItem>
      ))}
    </ResultContainer>
  );
};

export default InsightsResult; 