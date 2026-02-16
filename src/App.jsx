import React from "react";
import { PoemForm } from "./components/PoemForm";
import { PoemDisplay } from "./components/PoemDisplay";
import { ControlButtons } from "./components/ControlButtons";
import { usePoem } from "./hooks/usePoem";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  const {
    poemData,
    loadPoem,
    hideFirst,
    hideLast,
    hideRandom,
    isWordHidden,
    resetHidden,
  } = usePoem();

  return (
    <div id="app">
      <img src={logo} alt="Logo" width={100} height={100} className="logo" />
      <h1>Учим стихи легко</h1>

      <PoemForm
        onPoemSubmit={loadPoem}
        hasPoem={poemData.parsedLines.length > 0}
      />

      <PoemDisplay
        author={poemData.author}
        title={poemData.title}
        parsedLines={poemData.parsedLines}
        isWordHidden={isWordHidden}
      />

      <ControlButtons
        onHideFirst={hideFirst}
        onHideLast={hideLast}
        onHideRandom={hideRandom}
        resetHidden={resetHidden}
        restartPage={() => window.location.reload()}
        hasPoem={poemData.parsedLines.length > 0}
      />
    </div>
  );
}

export default App;
