import React from 'react';
import './App.css';
import FilterPanel from "./components/FilterPanel/FilterPanel";
import GenderChart from "./components/ChartPanel/GenderChart";
// import EthnicityChart from "./components/ChartPanel/EthnicityChart";
import schoolData from "./data/data-2016";
// const data2 = '../2016.json';
// console.log(schoolData);


function onSearchClick() {
  console.log('search clicked');
  // this.setState({
  //   schoolOptionsToChart: this.state.schoolOptions
  // });
}



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      schoolOptions: [],
      schoolOptionsToChart: []
    }
  }

  schoolFilterChangeHandler(selectedOptions) {
    if (!selectedOptions) {
      selectedOptions = [];
    }
    console.log('some change');
    console.log(selectedOptions);
    this.setState({
      schoolOptions: selectedOptions
    });
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex' }}>
        <div className='filter-panel'>
          <FilterPanel
            data={schoolData}
            onSearchClick={onSearchClick}
            onSchoolFilterChange={(opts) => this.schoolFilterChangeHandler(opts)}
          ></FilterPanel>
        </div>
        <div className="chart-panel">
          {/* <header className="App-header"> */}
          Digital Equity <p>Brewing...</p>
          {/* </header> */}
          <GenderChart options={this.state.schoolOptions}
            schoolData={schoolData}
          ></GenderChart>
          {/* <EthnicityChart options={this.state.schoolOptions}
            schoolData={schoolData}
          ></EthnicityChart> */}
        </div>

      </div >
    );
  }
}

export default App;
