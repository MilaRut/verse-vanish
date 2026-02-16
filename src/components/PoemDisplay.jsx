import React from 'react';
import { PoemRow } from './PoemRow';

export const PoemDisplay = ({ author, title, parsedLines, isWordHidden }) => {
  if (!parsedLines.length) return null;

  return (
    <>
      <h2 id="heading">
        <span>{author}</span>
        <span>{title}</span>
      </h2>
      <div id="poem">
        {parsedLines.map((line, rowIndex) => (
          <PoemRow 
            key={rowIndex} 
            tokens={line} 
            rowIndex={rowIndex}
            isWordHidden={isWordHidden}
          />
        ))}
      </div>
    </>
  );
};