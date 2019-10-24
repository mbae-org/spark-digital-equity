import React from 'react';
import './App.css';
import FilterPanel from "./components/FilterPanel/FilterPanel";

function App() {
  return (
    <div className="App" style={{display: 'flex'}}>
      <div className='filter-panel'>
        <FilterPanel></FilterPanel>
      </div>
      <div className="chart-panel">
        <header className="App-header">
            Digital Equity
            <p>Brewing...</p>
        </header>
      </div>
      
    </div>
  );
}

export default App;
