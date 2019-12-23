/*eslint-env es6*/
// "use strict";

import React from "react";
import "./App.css";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import GenderChart from "./components/ChartPanel/GenderChart";
// import GenderChart2 from "./components/ChartPanel/GenderChart2";
import EthnicityChart from "./components/ChartPanel/EthnicityChart";
import EconDisChart from "./components/ChartPanel/EconDisChart";
import DisabilityChart from "./components/ChartPanel/DisabilityChart";
import NextStepsPanel from "./components/NextStepsPanel";

import schoolData from "./data/data-2016";
// import { log } from "util";
import {
    EntityType,
    EthnicityAcronymList,
    EthnicityDefaultMap
} from "./Constants";
import School from "./School";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.graphSelectionChangeHandler = this.graphSelectionChangeHandler.bind(
            this
        );
        this.state = {
            schoolData: this.transformSchoolData(schoolData),
            newSchoolData: this.extractSchoolData(schoolData),
            schoolOptions: ["Massachussets"],
            selectedFilters: {
                gender: true,
                ethnicity: true,
                economicallyDisadvantaged: false,
                disability: false
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
                    <h3> Digital Equity </h3>
                </div>
                <div className="App" style={{ display: "flex" }}>
                    <div className="filter-panel">
                        <FilterPanel
                            data={this.state.newSchoolData}
                            selectedFilters={this.state.selectedFilters}
                            onSchoolFilterChange={(opts, actionMeta) =>
                                this.schoolFilterChangeHandler(opts, actionMeta)
                            }
                            onGraphSelectionChange={
                                this.graphSelectionChangeHandler
                            }
                        ></FilterPanel>
                    </div>
                    <div className="chart-panel">{charts}</div>
                </div>
                <NextStepsPanel />
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
                    schoolData={this.state.newSchoolData}
                    key="genderChart"
                />
            );
        }

        if (selectedFilters.ethnicity === true) {
            charts.push(
                <EthnicityChart
                    options={this.state.schoolOptions}
                    schoolData={this.state.newSchoolData}
                    key="ethnicityChart"
                />
            );
        }

        if (selectedFilters.economicallyDisadvantaged === true) {
            charts.push(
                <EconDisChart
                    options={this.state.schoolOptions}
                    schoolData={this.state.newSchoolData}
                    key="economicallyDisadvantagedChart"
                />
            );
        }

        if (selectedFilters.disability === true) {
            charts.push(
                <DisabilityChart
                    options={this.state.schoolOptions}
                    schoolData={this.state.newSchoolData}
                    key="disabilityChart"
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

    schoolFilterChangeHandler(selectedOptions, actionMeta) {
        console.log(actionMeta);
        if (!selectedOptions) {
            selectedOptions = [];
        }
        this.setState({
            schoolOptions: this.transformSelectedOptions(selectedOptions)
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

    extractSchoolData(schoolDataArray) {
        let filteredArray = [];
        let schoolObjectMap = {};

        //  TODO: do this by year

        filteredArray = this.filterSchoolDataWithFields(schoolDataArray);
        schoolObjectMap = this.getSchoolObjectMap(filteredArray);

        // add info for all districts
        const allSchoolNames = Object.keys(schoolObjectMap);
        for (let schoolName of allSchoolNames) {
            const schoolObject = schoolObjectMap[schoolName];
            const districtName = schoolObject._districtName;

            let districtObject = schoolObjectMap[districtName];
            if (!districtObject) {
                districtObject = new School();
                districtObject.setName(districtName);
                districtObject.setType(EntityType.DISTRICT);
                districtObject.setEthnicityMap(EthnicityDefaultMap);
            } else {
                // console.log(districtName);
                // console.log(schoolName);
            }
            districtObject.setMale(districtObject._male + schoolObject._male);
            districtObject.setFemale(
                districtObject._female + schoolObject._female
            );

            districtObject.setEconomicallyDisadvantaged(
                districtObject._economicallyDisadvantaged +
                    schoolObject._economicallyDisadvantaged
            );

            districtObject.setEnrolled(
                districtObject._enrolled + schoolObject._enrolled
            );
            districtObject.setStudentsWithDisability(
                districtObject._studentsWithDisability +
                    schoolObject._studentsWithDisability
            );

            let thisDistrictEthnicityArray = [];
            let thisDistrictEthnicityMap = districtObject._ethnicityMap;

            for (let key in schoolObject._ethnicityMap) {
                const ethnicityObj = schoolObject._ethnicityMap[key];
                thisDistrictEthnicityMap[key].value += ethnicityObj.value;
                thisDistrictEthnicityArray.push(thisDistrictEthnicityMap[key]);
            }

            districtObject.setEthnicityMap(thisDistrictEthnicityMap);
            districtObject.setEthnicity(thisDistrictEthnicityArray);

            schoolObjectMap[districtName] = districtObject;
        }

        // console.log("schoolObjectMap");
        // console.log(schoolObjectMap);
        return schoolObjectMap;
    }

    // only use schooldata that have the fields available
    filterSchoolDataWithFields(schoolDataArray) {
        let filteredArray = [];
        let schoolsWithMissingEntry = [];
        // filter out schools with all available data
        schoolDataArray.forEach(schoolRow => {
            if (
                Number.isInteger(parseInt(schoolRow["FEMALE"])) &&
                Number.isInteger(parseInt(schoolRow["MALE"])) &&
                schoolRow["DIST_NAME"] &&
                Number.isInteger(parseInt(schoolRow["ECODIS"])) &&
                Number.isInteger(parseInt(schoolRow["SWD"])) &&
                Number.isInteger(parseInt(schoolRow["SY"]))
            ) {
                filteredArray.push(schoolRow);
            } else {
                schoolsWithMissingEntry.push(schoolRow);
            }
        });

        if (schoolsWithMissingEntry.length > 0) {
            console.log("missing entry for schools: ");
            console.log(schoolsWithMissingEntry);
        }

        return filteredArray;
    }

    getSchoolObjectMap(filteredArray) {
        let schoolObjectMap = {};

        // add all school data
        filteredArray.forEach(schoolRow => {
            const schoolName = schoolRow["SCH_NAME"];
            const districtName = schoolRow["DIST_NAME"];

            let thisSchool = new School();
            thisSchool.setName(schoolName);
            thisSchool.setType(EntityType.SCHOOL);
            thisSchool.setMale(parseInt(schoolRow["MALE"]));
            thisSchool.setFemale(parseInt(schoolRow["FEMALE"]));
            thisSchool.setDistrictName(districtName);
            thisSchool.setEthnicity([]);
            thisSchool.setEconomicallyDisadvantaged(
                parseInt(schoolRow["ECODIS"])
            );
            thisSchool.setEnrolled(parseInt(schoolRow["STUDENTS_ENROLLED"]));
            thisSchool.setStudentsWithDisability(parseInt(schoolRow["SWD"]));
            thisSchool.setSchoolYear(parseInt(schoolRow["SY"]));

            let thisSchoolEthnicityArray = [];
            let thisSchoolEthnicityMap = {};

            EthnicityAcronymList.forEach(ethnicityObj => {
                let ethnicityArrayMember = {
                    id: ethnicityObj.id,
                    value: parseInt(schoolRow[ethnicityObj.id]),
                    label: ethnicityObj.desc,
                    desc: ethnicityObj.desc,
                    chartColor: ethnicityObj.chartColor
                };

                thisSchoolEthnicityArray.push(ethnicityArrayMember);
                thisSchoolEthnicityMap[
                    ethnicityArrayMember.id
                ] = ethnicityArrayMember;
            });

            thisSchool.setEthnicity(thisSchoolEthnicityArray);
            thisSchool.setEthnicityMap(thisSchoolEthnicityMap);

            schoolObjectMap[schoolName] = thisSchool;
        });

        return schoolObjectMap;
    }
}

export default App;
