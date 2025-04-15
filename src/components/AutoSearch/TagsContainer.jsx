import React from 'react';
import Tag from './TagTemplate';

const TagsContainer = ({ tags, onTagRemove }) => {
  if (!tags || tags.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-sm p-md bg-bg-secondary min-h-[40px]">
      {tags.map((tag, index) => (
        <Tag 
          key={index}
          tag={tag}
          onTagRemove={() => onTagRemove(index)}
        />
      ))}
    </div>
  );
};

export default TagsContainer; 