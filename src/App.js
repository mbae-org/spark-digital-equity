import React from "react";
import "./App.css";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import GenderChart from "./components/ChartPanel/GenderChart";
// import GenderChart2 from "./components/ChartPanel/GenderChart2";
import EthnicityChart from "./components/ChartPanel/EthnicityChart";
import schoolData from "./data/data-2016";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.graphSelectionChangeHandler = this.graphSelectionChangeHandler.bind(
            this
        );
        this.state = {
            schoolOptions: [],
            schoolOptionsToChart: [],
            schoolData: this.transformSchoolData(schoolData),
            newSchoolOptions: [],
            selectedFilters: {
                gender: true,
                ethnicity: true
            }
        };
    }

    render() {
        const charts = this.createChartsFromFilterState();

        return (
            <div
                className="App"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <div style={{ height: "10%" }}>
                    {" "}
                    <h3> Digital Equity </h3>
                </div>
                <div className="App" style={{ display: "flex" }}>
                    <div className="filter-panel">
                        <FilterPanel
                            data={schoolData}
                            selectedFilters={this.state.selectedFilters}
                            onSchoolFilterChange={opts =>
                                this.schoolFilterChangeHandler(opts)
                            }
                            onGraphSelectionChange={
                                this.graphSelectionChangeHandler
                            }
                        ></FilterPanel>
                    </div>
                    <div className="chart-panel">{charts}</div>
                </div>
            </div>
        );
    }

    createChartsFromFilterState() {
        const selectedFilters = this.state.selectedFilters;

        let charts = [];
        if (selectedFilters.gender === true) {
            charts.push(
                <GenderChart
                    options={this.state.schoolOptions}
                    schoolData={schoolData}
                />
            );
        }

        if (selectedFilters.ethnicity === true) {
            charts.push(
                <EthnicityChart
                    options={this.state.newSchoolOptions}
                    schoolData={this.state.schoolData}
                />
            );
        }

        return charts;
    }

    graphSelectionChangeHandler(newSelection) {
        this.setState({
            selectedFilters: newSelection
        });
    }

    schoolFilterChangeHandler(selectedOptions) {
        if (!selectedOptions) {
            selectedOptions = [];
        }
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
