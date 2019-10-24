import React from 'react';
import SchoolDistrictFilter from "../SchoolDistrictFilter/SchoolDistrictFilter";
// import './App.css';

function FilterPanel() {
  return (
    <div>
        <div style={{display: 'flex', flexDirection:"column"}}>
            <div><SchoolDistrictFilter></SchoolDistrictFilter></div>
            <div>Filter 2</div>
            <div>Filter 3</div>
            <div>Filter 4</div>
        </div>
    </div>
  );
}

export default FilterPanel;
