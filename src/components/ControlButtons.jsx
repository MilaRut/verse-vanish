import React from "react";

export const ControlButtons = ({
  onHideFirst,
  onHideLast,
  onHideRandom,
  hasPoem,
  resetHidden,
  restartPage,
}) => {
  if (!hasPoem) return null;

  return (
    <div>
      <div className="buttons">
        <button onClick={onHideFirst}>Скрыть слово в начале</button>
        <button onClick={onHideLast}>Скрыть слово в конце</button>
        <button onClick={onHideRandom}>Скрыть случайное слово</button>
      </div>
      <div className="buttons">
        <button onClick={resetHidden}>Перезапустить</button>
        <button onClick={restartPage}>Новое стихотворение</button>
      </div>
    </div>
  );
};
