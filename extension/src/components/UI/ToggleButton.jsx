import React from 'react';
import extensionLogo from '../../assets/extensionLogo.svg';
import { COLORS, flexCenter, borderRadius } from '../../utils/styles';

const ToggleButton = ({ isOpen, setIsOpen, anyTagFound }) => {
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Base button styles
  const buttonStyle = {
    ...flexCenter, // replaces flex items-center justify-center
    width: '4rem', // w-16
    height: '40%', // h-40%
    borderTopLeftRadius: borderRadius.lg, // rounded-t-lg
    borderTopRightRadius: borderRadius.lg, // rounded-t-lg
    border: 'none', // border-none
    cursor: 'pointer', // cursor-pointer
    overflow: 'hidden', // overflow-hidden
    backgroundColor: anyTagFound ? COLORS.brand : COLORS.accent // conditional bg color
  };

  // Image styles
  const imgStyle = {
    width: '100%', // w-full
    objectFit: 'contain', // object-contain
    marginTop: '-4px', // -mt-[4px]
  };

  return (
    <button 
      style={buttonStyle}
      onClick={togglePanel}
      title="Open Video Word Search"
    >
      <img 
        src={extensionLogo} 
        alt="Toggle search" 
        style={imgStyle}
      />
    </button>
  );
};

export default ToggleButton;