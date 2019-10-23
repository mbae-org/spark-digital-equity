import React from 'react';
import './App.css';
import FilterPanel from "./components/FilterPanel/FilterPanel";

function App() {
  return (
    <div className="App" style={{display: 'flex'}}>
      <div style = {{'flexGrow': 1}}>
        <FilterPanel></FilterPanel>
      </div>
      <div style = {{'flexGrow': 4}}>
        <header className="App-header">
            Digital Equity
            <p>Brewing...</p>
        </header>
      </div>
      
    </div>
  );
}

export default App;
