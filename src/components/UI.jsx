import React, { useState } from 'react';
import styled from 'styled-components';
import SearchTabs from './SearchTabs';
import extensionLogo from '../assets/extensionLogo.svg';

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ToggleButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: #ff0044;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SearchPanel = styled.div`
  margin-top: 10px;
  width: 600px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(-20px)'};
  transition: all 0.3s ease;
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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