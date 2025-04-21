import React, { useState } from 'react';
import { COLORS, shadow, transition, flexBetween } from '../../utils/styles';

const Tag = ({ tag, onTagRemove }) => {
  const [isHovering, setIsHovering] = useState(false);

  // Determine base colors and hover colors
  const isFound = tag.found;
  const baseBgColor = isFound ? COLORS.tag.found : COLORS.tag.notFound;
  const hoverBgColor = isFound ? COLORS.tag.foundHover : COLORS.tag.notFoundHover;
  const baseBtnTextColor = isFound ? COLORS.tag.found : COLORS.tag.notFound;

  // Tag container style
  const containerStyle = {
    position: 'relative',
  };

  // Main tag style
  const tagStyle = {
    ...flexBetween, // replaces flex items-center justify-between
    paddingLeft: '1rem', // px-4
    paddingRight: '1rem', // px-4
    paddingTop: '0.5rem', // py-2
    paddingBottom: '0.5rem', // py-2
    backgroundColor: isHovering ? hoverBgColor : baseBgColor, // dynamic bg color with hover state
    color: COLORS.white, // text-white
    borderRadius: '9999px', // rounded-full
    border: 'none', // border-none
    boxShadow: shadow.sm, // shadow-sm
    position: 'relative',
    width: 'auto', // w-auto
    overflow: 'visible',
    transition: transition.colors200, // transition-colors
  };

  // Tag text style
  const textStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px', // text-[14px]
    fontWeight: '500', // font-medium
  };

  // Remove button style
  const buttonStyle = {
    width: '1.5rem', // w-6
    height: '1.5rem', // h-6
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '0.75rem', // ml-3
    borderRadius: '9999px', // rounded-full
    backgroundColor: isHovering ? COLORS.gray[200] : COLORS.white, // bg-white hover:bg-gray-200
    color: baseBtnTextColor, // dynamic text color
    transition: transition.colors200, // transition-colors
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div 
        style={tagStyle}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div style={textStyle}>{tag.word.toUpperCase()}</div>
        <button 
          onClick={() => { onTagRemove(); }}
          style={buttonStyle}
          aria-label="Remove tag"
          title="Remove tag"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Tag;
