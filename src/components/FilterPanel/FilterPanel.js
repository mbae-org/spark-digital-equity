import React from 'react';
import SchoolDistrictFilter from "../SchoolDistrictFilter/SchoolDistrictFilter";
// import './App.css';

function FilterPanel() {
  return (
    <div>
      <h3 style={{ margin: '10px 0 10px 0' }}>Select filters below to view a graph</h3>
      <div className="filter-container" style={{ display: 'flex', flexDirection: "column" }}>
        <div><SchoolDistrictFilter></SchoolDistrictFilter></div>
        <div>Filter 2</div>
        <div>Filter 3</div>
        <div>Filter 4</div>
      </div>
    </div>
  );
}

export default FilterPanel;
