import { useState } from 'react';
import { parsePoem } from '../utils/poemParser';

export const usePoem = () => {
  const [poemData, setPoemData] = useState({
    author: '',
    title: '',
    text: '',
    parsedLines: []
  });

  const [hiddenWords, setHiddenWords] = useState(new Set());
  const [firstCounter, setFirstCounter] = useState(0);
  const [lastCounter, setLastCounter] = useState(0);

  const loadPoem = (author, title, text) => {
    const parsedLines = parsePoem(text);
    setPoemData({ author, title, text, parsedLines });
    setHiddenWords(new Set());
    setFirstCounter(0);
    setLastCounter(0);
  };

  const getWordId = (rowIndex, wordIndex) => `${rowIndex}-${wordIndex}`;

  const hideFirst = () => {
    const newHidden = new Set(hiddenWords);
    let hasNewWords = false;

    poemData.parsedLines.forEach((line, rowIndex) => {
      const wordIndices = line
        .map((token, idx) => /[\p{L}]+/gu.test(token) ? idx : -1)
        .filter(idx => idx !== -1);

      if (firstCounter < wordIndices.length) {
        const wordTokenIndex = wordIndices[firstCounter];
        const wordId = getWordId(rowIndex, wordTokenIndex);

        if (!hiddenWords.has(wordId)) {
          newHidden.add(wordId);
          hasNewWords = true;
        }
      }
    });

    if (hasNewWords) {
      setHiddenWords(newHidden);
      setFirstCounter(firstCounter + 1);
    }
  };

  const hideLast = () => {
    const newHidden = new Set(hiddenWords);
    let hasNewWords = false;

    poemData.parsedLines.forEach((line, rowIndex) => {
      const wordIndices = line
        .map((token, idx) => /[\p{L}]+/gu.test(token) ? idx : -1)
        .filter(idx => idx !== -1);

      const lastIndex = wordIndices.length - 1 - lastCounter;
      if (lastIndex >= 0 && lastIndex < wordIndices.length) {
        const wordTokenIndex = wordIndices[lastIndex];
        const wordId = getWordId(rowIndex, wordTokenIndex);

        if (!hiddenWords.has(wordId)) {
          newHidden.add(wordId);
          hasNewWords = true;
        }
      }
    });

    if (hasNewWords) {
      setHiddenWords(newHidden);
      setLastCounter(lastCounter + 1);
    }
  };

  const hideRandom = () => {
    const newHidden = new Set(hiddenWords);

    poemData.parsedLines.forEach((line, rowIndex) => {
      const visibleWordIndices = line
        .map((token, idx) => /[\p{L}]+/gu.test(token) ? idx : -1)
        .filter(idx => idx !== -1)
        .filter(idx => !hiddenWords.has(getWordId(rowIndex, idx)));

      if (visibleWordIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * visibleWordIndices.length);
        const wordTokenIndex = visibleWordIndices[randomIndex];
        const wordId = getWordId(rowIndex, wordTokenIndex);
        newHidden.add(wordId);
      }
    });

    setHiddenWords(newHidden);
  };

  const resetHidden = () => {
    setHiddenWords(new Set());
    setFirstCounter(0);
    setLastCounter(0);
  };

  const isWordHidden = (rowIndex, tokenIndex) => {
    return hiddenWords.has(getWordId(rowIndex, tokenIndex));
  };

  return {
    poemData,
    loadPoem,
    hideFirst,
    hideLast,
    hideRandom,
    resetHidden,
    isWordHidden
  };
};