import React from 'react';
import extensionLogo from '../../assets/extensionLogo.svg';

const ToggleButton = ({ isOpen, setIsOpen, anyTagFound }) => {
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button 
      className={`w-16 h-40% rounded-t-lg border-none cursor-pointer flex items-center justify-center overflow-hidden ${
        anyTagFound ? 'bg-brand' : 'bg-accent'
      }`}
      onClick={togglePanel}
      title="Open Video Word Search"
    >
      <img 
        src={extensionLogo} 
        alt="Toggle search" 
        className="w-full object-contain -mt-[4px]"
      />
    </button>
  );
};

export default ToggleButton; 