import React from "react";
import "./App.css";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import GenderChart from "./components/ChartPanel/GenderChart";
// import GenderChart2 from "./components/ChartPanel/GenderChart2";
import EthnicityChart from "./components/ChartPanel/EthnicityChart";
import schoolData from "./data/data-2016";
// const data2 = '../2016.json';
// console.log(schoolData);

// function onSearchClick() {
//     console.log("search clicked");
//     // this.setState({
//     //   schoolOptionsToChart: this.state.schoolOptions
//     // });
// }

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolOptions: [],
            schoolOptionsToChart: [],
            schoolData: this.transformSchoolData(schoolData),
            newSchoolOptions: []
        };
    }

    render() {
        return (
            <div className="App" style={{ display: "flex" }}>
                <div className="filter-panel">
                    <FilterPanel
                        data={schoolData}
                        // onSearchClick={onSearchClick}
                        onSchoolFilterChange={opts =>
                            this.schoolFilterChangeHandler(opts)
                        }
                    ></FilterPanel>
                </div>
                <div className="chart-panel">
                    {/* <header className="App-header"> */}
                    Digital Equity
                    {/* <p>Brewing...</p> */}
                    {/* </header> */}
                    <GenderChart
                        options={this.state.schoolOptions}
                        schoolData={schoolData}
                    ></GenderChart>
                    <EthnicityChart
                        options={this.state.newSchoolOptions}
                        schoolData={this.state.schoolData}
                    />
                </div>
            </div>
        );
    }

    schoolFilterChangeHandler(selectedOptions) {
        if (!selectedOptions) {
            selectedOptions = [];
        }
        // console.log("some change");
        // console.log(selectedOptions);
        this.setState({
            schoolOptions: selectedOptions,
            newSchoolOptions: this.transformSelectedOptions(selectedOptions)
        });
    }

    /**
     *
     * @param {array} schoolDataArray
     * @returns {Object} SchoolName -> SchoolData
     */
    transformSchoolData(schoolDataArray) {
        let schoolDataMap = {};
        schoolDataArray.forEach(schoolRow => {
            schoolDataMap[schoolRow["SCH_NAME"]] = schoolRow;
        });
        return schoolDataMap;
    }

    transformSelectedOptions(selectedOptions) {
        let schoolNameArray = [];
        selectedOptions.forEach(row => {
            schoolNameArray.push(row.label);
        });
        return schoolNameArray;
    }
}

export default App;
