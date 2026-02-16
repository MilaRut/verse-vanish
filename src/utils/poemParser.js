export const parsePoem = (text) => {
  const rowsArray = text.split('\n').filter((el) => el.trim() !== '');
  const splittedArray = [];

  rowsArray.forEach((row) => {
    const tokens = row.match(/[\p{L}]+(?:-[\p{L}]+)*|[.,!?;:—–-]/gu) || [];
    splittedArray.push(tokens);
  });

  return splittedArray;
};