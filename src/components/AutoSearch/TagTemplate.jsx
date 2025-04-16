import React from 'react';

const Tag = ({ tag, onTagRemove }) => {
  // Determine color based on whether tag was found or not
  const bgColor = tag.found ? 'bg-[#22c55e] hover:bg-[#16a34a]' : 'bg-[#ff5555] hover:bg-[#e64c4c]';
  const btnTextColor = tag.found ? 'text-[#22c55e]' : 'text-[#ff5555]';

  return (
    <div className="relative">
      <div 
        className={`flex items-center justify-between px-4 py-2
        ${bgColor} text-white
        rounded-full border-none shadow-sm
        relative w-auto overflow-visible
        transition-colors`}
      >
        <div className="flex items-center text-[14px] font-medium">{tag.word.toUpperCase()}</div>
        <button 
          onClick={(e) => { onTagRemove(); }}
          className={`w-6 h-6 flex items-center justify-center ml-3 rounded-full bg-white ${btnTextColor} hover:bg-gray-200 transition-colors cursor-pointer`}
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
