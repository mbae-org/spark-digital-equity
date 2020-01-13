/*eslint-env es6*/
// "use strict";

import React from "react";
import "./App.css";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import GenderChart from "./components/Charts/GenderChart";
import EthnicityChart from "./components/Charts/EthnicityChart";
import EconDisChart from "./components/Charts/EconDisChart";
import DisabilityChart from "./components/Charts/DisabilityChart";
import ELLChart from "./components/Charts/ELLChart";
import NextStepsPanel from "./components/NextStepsPanel";
// import GenderChart2 from "./components/Charts/GenderChart2";

import schoolData from "./data/data-all";

import {
    EntityType,
    EthnicityAcronymList,
    EthnicityDefaultMap,
    YearList
} from "./Constants";
import School from "./School";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.graphSelectionChangeHandler = this.graphSelectionChangeHandler.bind(
            this
        );
        this.yearSelectionChangeHandler = this.yearSelectionChangeHandler.bind(this);

        let selectedYearsMap = {};
        YearList.forEach(year => {
            selectedYearsMap[year] = false;
        });
        selectedYearsMap[YearList[YearList.length - 1]] = true;
        const selectedSchools = ["Massachussets"];
        const yearSchoolObjectMap = this.transformSchoolData(
            schoolData,
            selectedSchools,
            selectedYearsMap
        );

        this.state = {
            newSchoolData: yearSchoolObjectMap,
            schoolData: this.extractSchoolData(schoolData),
            // filteredData: this.filterSchoolData(
            //     this.extractSchoolData(schoolData)
            // ),
            schoolOptions: selectedSchools,
            selectedFilters: {
                gender: true,
                ethnicity: true,
                economicallyDisadvantaged: false,
                disability: false,
                englishLanguageLearner: false
            },
            selectedYearsMap: selectedYearsMap,
            filteredSchoolData: this.filterYearSchoolObjectMap(yearSchoolObjectMap, selectedSchools, selectedYearsMap)
        };

        // console.log("schoolData");
        // console.log(schoolData);
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
                    <div
                        className="filter-panel"
                        style={{ backgroundColor: "darkgreen" }}
                    >
                        <FilterPanel
                            data={this.state.schoolData}
                            selectedFilters={this.state.selectedFilters}
                            selectedYears={this.state.selectedYearsMap}
                            onSchoolFilterChange={(opts, actionMeta) =>
                                this.schoolFilterChangeHandler(opts, actionMeta)
                            }
                            onGraphSelectionChange={
                                this.graphSelectionChangeHandler
                            }
                            onYearSelectionChange={this.yearSelectionChangeHandler}
                        />
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
                    selectedSchoolOptions={this.state.schoolOptions}
                    schoolData={this.state.schoolData}
                    key="genderChart"
                />
            );
        }

        if (selectedFilters.ethnicity === true) {
            charts.push(
                <EthnicityChart
                    options={this.state.schoolOptions}
                    schoolData={this.state.schoolData}
                    key="ethnicityChart"
                />
            );
        }

        if (selectedFilters.economicallyDisadvantaged === true) {
            charts.push(
                <EconDisChart
                    options={this.state.schoolOptions}
                    schoolData={this.state.schoolData}
                    key="economicallyDisadvantagedChart"
                />
            );
        }

        if (selectedFilters.disability === true) {
            charts.push(
                <DisabilityChart
                    options={this.state.schoolOptions}
                    schoolData={this.state.schoolData}
                    key="disabilityChart"
                />
            );
        }

        if (selectedFilters.englishLanguageLearner === true) {
            charts.push(
                <ELLChart
                    options={this.state.schoolOptions}
                    schoolData={this.state.schoolData}
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

    yearSelectionChangeHandler(newSelection) {
        this.setState({
            selectedYears: newSelection,
            filteredSchoolData: this.filterYearSchoolObjectMap(this.state.newSchoolData, this.state.schoolOptions, newSelection)
        });
    }

    schoolFilterChangeHandler(selectedOptions, actionMeta) {
        console.log(actionMeta);
        if (!selectedOptions) {
            selectedOptions = [];
        }

        const selectedSchoolOptions = this.transformSelectedOptions(selectedOptions);
        this.setState({
            schoolOptions: selectedSchoolOptions,
            filteredSchoolData: this.filterYearSchoolObjectMap(this.state.newSchoolData, selectedSchoolOptions, this.state.selectedYearsMap)
        });
    }

    /**
     *
     * @param {array} schoolDataArray
     * @param {array} selectedSchools list of selected schools
     * @param {Map} selectedYears
     * @returns {[]}
     */
    transformSchoolData(schoolDataArray, selectedSchools, selectedYears) {
        let validDataArray = this.filterSchoolDataWithFields(schoolDataArray);
        let yearSchoolObjectMap = this.getYearSchoolObjectMapNew(validDataArray);


        // add info for all districts
        const allYears = Object.keys(yearSchoolObjectMap);
        for (let year of allYears) {
            const allSchoolNames = Object.keys(yearSchoolObjectMap[year]);
            let thisYearSchoolObjectMap = yearSchoolObjectMap[year];

            for (let schoolName of allSchoolNames) {
                const schoolObject = thisYearSchoolObjectMap[schoolName];
                const districtName = schoolObject._districtName;
                const schoolYear = schoolObject._schoolYear;

                let districtObject = thisYearSchoolObjectMap[districtName];
                if (!districtObject) {
                    districtObject = new School();
                    districtObject.setName(districtName);
                    districtObject.setType(EntityType.DISTRICT);
                    districtObject.setEthnicityMap(EthnicityDefaultMap);
                    districtObject.setSchoolYear(schoolYear);
                } else {
                    // console.log(districtName);
                    // console.log(schoolName);
                }
                districtObject.setMale(
                    districtObject._male + schoolObject._male
                );
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
                    thisDistrictEthnicityArray.push(
                        thisDistrictEthnicityMap[key]
                    );
                }

                districtObject.setEthnicityMap(thisDistrictEthnicityMap);
                districtObject.setEthnicity(thisDistrictEthnicityArray);

                districtObject.setEnglishLanguageLearner(
                    districtObject._englishLanguageLearner +
                        schoolObject._englishLanguageLearner
                );

                thisYearSchoolObjectMap[districtName] = districtObject;
            }
            yearSchoolObjectMap[year] = thisYearSchoolObjectMap;
        }

        return yearSchoolObjectMap;
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

            districtObject.setEnglishLanguageLearner(
                districtObject._englishLanguageLearner +
                    schoolObject._englishLanguageLearner
            );

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
                Number.isInteger(parseInt(schoolRow["SY"])) &&
                Number.isInteger(parseInt(schoolRow["ELL"]))
            ) {
                filteredArray.push(schoolRow);
            } else {
                schoolsWithMissingEntry.push(schoolRow);
            }
        });

        if (schoolsWithMissingEntry.length > 0) {
            // console.log("missing entry for schools: ");
            // console.log(schoolsWithMissingEntry);
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
            thisSchool.setEnglishLanguageLearner(parseInt(schoolRow["ELL"]));

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

    /**
     *
     * @param {array} filteredArray
     * @returns {Map} yearSchoolObjectMap
     */
    getYearSchoolObjectMapNew(filteredArray) {
        let schoolObjectMap = {};
        let yearSchoolObjectMap = {};

        // add all school data
        filteredArray.forEach(schoolRow => {
            const schoolName = schoolRow["SCH_NAME"];
            const districtName = schoolRow["DIST_NAME"];
            const schoolYear = parseInt(schoolRow["SY"]);

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
            thisSchool.setSchoolYear(schoolYear);
            thisSchool.setEnglishLanguageLearner(parseInt(schoolRow["ELL"]));

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
            let thisYearSchoolObjectMap = yearSchoolObjectMap[schoolYear];
            if (!thisYearSchoolObjectMap) {
                thisYearSchoolObjectMap = {};
            }
            thisYearSchoolObjectMap[schoolName] = thisSchool;
            yearSchoolObjectMap[schoolYear] = thisYearSchoolObjectMap;
        });

        // return schoolObjectMap;

        // console.log("yearSchoolObjectMap");
        // console.log(yearSchoolObjectMap);

        return yearSchoolObjectMap;
    }

    /**
     *
     * @param {Map} yearSchoolObjectMap
     * @param {Array} selectedSchoolsArray
     * @param {Map} selectedYearsMap
     * @returns {Array} filteredSchoolDataArray
     */
    filterYearSchoolObjectMap(yearSchoolObjectMap, selectedSchoolsArray, selectedYearsMap) {
        let filteredSchoolDataArray = [];
        let selectedYearsArray = [];
        Object.keys(selectedYearsMap).forEach((key) => {
            if(selectedYearsMap[key]===true)
                selectedYearsArray.push(key)
        });

        selectedYearsArray.forEach(year => {
           selectedSchoolsArray.forEach(schoolName => {
               filteredSchoolDataArray.push(yearSchoolObjectMap[year][schoolName]);
           });
        });

        console.log("filteredSchoolDataArray");
        console.log(filteredSchoolDataArray);

        return filteredSchoolDataArray;
    }

}

export default App;
