'use client';

import React, { memo } from 'react';

const AuroraText = memo(
  ({
    children,
    className = '',
    colors = ['#7FE786', '#6BD9A2', '#56CBB9', '#41BDD0', '#58A7FE'],
    speed = 1,
  }) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      animationDuration: `${10 / speed}s`,
    };

    return (
      <span className={`relative inline-block ${className}`}>
        <span className="sr-only">{children}</span>
        <span
          className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

AuroraText.displayName = 'AuroraText';

export default AuroraText;