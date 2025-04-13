import React, { useState } from 'react';
import styled from 'styled-components';
import SearchTabs from './SearchTabs';
import extensionLogo from '../assets/extensionLogo.svg';

const Container = styled.div`

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ToggleButton = styled.button`
  width: 48px;
  border-radius: 8px 8px 0 0;
  background-color: #ff0044;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 60%;
    object-fit: contain;
    margin-top: -2px;
  }
`;

const SearchPanel = styled.div`

  width: 600px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(-20px)'};
  transition: all 0.3s ease;
  display: ${props => props.$isVisible ? 'block' : 'none'};
`;

const UI = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <ToggleButton onClick={togglePanel}>
        <img src={extensionLogo} alt="Toggle search" />
      </ToggleButton>
      <SearchPanel $isVisible={isOpen}>
        <SearchTabs />
      </SearchPanel>
    </Container>
  );
};

export default UI; 