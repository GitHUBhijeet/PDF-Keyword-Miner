import React, { useState } from "react";
import "./App.css";
import FileInput from "./FileInput";

function App() {
  const [keywords, setKeywords] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Keyword Extractor</h1>
      </header>
      <FileInput setKeywords={setKeywords} />
      <div className="keywords">
        <h2>Keywords:</h2>
        <ul className="keyword-list">
          {keywords.map((keyword, index) => (
            <li key={index} className="keyword-item">
              {keyword}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
