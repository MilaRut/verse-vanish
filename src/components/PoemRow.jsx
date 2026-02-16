import React from "react";

export const PoemRow = ({ tokens, rowIndex, isWordHidden }) => {
  const shouldAddSpace = (currentToken, nextToken) => {
    if (!nextToken) return false;
    const punctuation = [",", ".", ":", ";", "!", "?"];
    return !punctuation.includes(nextToken);
  };

  return (
    <p className="row">
      {tokens.map((token, tokenIndex) => {
        const isWord = /[\p{L}]+/gu.test(token);
        const isHidden = isWord && isWordHidden(rowIndex, tokenIndex);

        return (
          <React.Fragment key={tokenIndex}>
            <span
              className={`
                ${isWord ? "word" : ""} 
                ${isHidden ? "hidden" : ""}
              `}
            >
              {token}
            </span>
            {shouldAddSpace(token, tokens[tokenIndex + 1]) && <span> </span>}
          </React.Fragment>
        );
      })}
    </p>
  );
};
