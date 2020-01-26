/*eslint-env es6*/
// "use strict";

import React from "react";
import logo from "./static/logo.png";
import "./App.css";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import GenderChart from "./components/Charts/GenderChart";
import EthnicityChart from "./components/Charts/EthnicityChart";
import EconDisChart from "./components/Charts/EconDisChart";
import DisabilityChart from "./components/Charts/DisabilityChart";
import ELLChart from "./components/Charts/ELLChart";
import CourseEnrollmentChart from "./components/Charts/CourseEnrollment"
import APCoursesChart from "./components/Charts/APCourses"
import NextStepsPanel from "./components/NextSteps/NextStepsPanel"

import schoolData from "./data/data-new";

import {
    EntityType,
    EthnicityAcronymList,
    EthnicityDefaultMap,
    YearList,
    APScoreAcronymMap
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
            schoolOptions: selectedSchools,
            selectedFilters: {
                gender: true,
                ethnicity: true,
                economicallyDisadvantaged: false,
                disability: false,
                englishLanguageLearner: false,
                courseEnrollment: true,
                apCourse: true,
                apCourseScore: true,
                apCourseEnrollment: true,
                courseEnrollmentSecondary: true,
                courseEnrollmentPrimary: true,
                courseEnrollmentTotal: true
            },
            selectedYearsMap: selectedYearsMap,
            filteredSchoolData: this.filterYearSchoolObjectMap(yearSchoolObjectMap, selectedSchools, selectedYearsMap)
        };

    }

    render() {
        const charts = this.createChartsFromFilterState();

        return (
            <div>
                <div className="App">
                    <div className="Header">
                        <img src={logo} alt="Logo" />
                        <h3> Digital Equity Initiative </h3>
                    </div>
                    <div className="Body">
                        <div className="filter-panel">
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
                </div>
                <NextStepsPanel />
                <footer>Contact Info</footer>
            </div>
        );
    }

    createChartsFromFilterState() {
        const selectedFilters = this.state.selectedFilters;

        let charts = [];
        if (selectedFilters.gender === true) {
            charts.push(
                <GenderChart
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    key="genderChart"
                />
            );
        }

        if (selectedFilters.ethnicity === true) {
            charts.push(
                <EthnicityChart
                    // options={this.state.schoolOptions}
                    // schoolData={this.state.schoolData}
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    key="ethnicityChart"
                />
            );
        }

        if (selectedFilters.apCourse === true) {
            const options = {
                score: selectedFilters.apCourseScore,
                enrollment: selectedFilters.apCourseEnrollment,
                total: selectedFilters.courseEnrollmentTotal
            };

            console.log("options passed");
            console.log(options);
            charts.push(
                <APCoursesChart
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    key="apCoursesChart"
                    options = {options}
                />
            );
        }

        if (selectedFilters.economicallyDisadvantaged === true) {
            charts.push(
                <EconDisChart
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    // options={this.state.schoolOptions}
                    // schoolData={this.state.schoolData}
                    key="economicallyDisadvantagedChart"
                />
            );
        }

        if (selectedFilters.disability === true) {
            charts.push(
                <DisabilityChart
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    // options={this.state.schoolOptions}
                    // schoolData={this.state.schoolData}
                    key="disabilityChart"
                />
            );
        }

        if (selectedFilters.englishLanguageLearner === true) {
            charts.push(
                <ELLChart
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    // options={this.state.schoolOptions}
                    // schoolData={this.state.schoolData}
                    key="ellChart"
                />
            );
        }

        if (selectedFilters.courseEnrollment === true) {

            const options = {
                primary: selectedFilters.courseEnrollmentPrimary,
                secondary: selectedFilters.courseEnrollmentSecondary,
                total: selectedFilters.courseEnrollmentTotal
            };

            charts.push(
                <CourseEnrollmentChart
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    key="enrollmentChart"
                    options={options}
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

                districtObject.setPrimaryEnrolled(districtObject._primaryEnrolled + schoolObject._primaryEnrolled);
                districtObject.setSecondaryEnrolled(districtObject._secondaryEnrolled + schoolObject._secondaryEnrolled);

                thisYearSchoolObjectMap[districtName] = districtObject;
            }
            yearSchoolObjectMap[year] = thisYearSchoolObjectMap;

            console.log("yearSchoolObjectMap");
            console.log(yearSchoolObjectMap);
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
                districtObject.setApMap(APScoreAcronymMap);
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


            let thisDistrictAPArray = [];
            let thisDistrictAPMap = {};

            for (let key in schoolObject._apMap) {
                const apObj = schoolObject._apMap[key];
                thisDistrictAPMap[key].value += apObj.value;
                thisDistrictAPArray.push(thisDistrictAPMap[key]);
            }

            districtObject.setApMap(thisDistrictAPMap);
            districtObject.setApArray(thisDistrictAPArray);


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
                Number.isInteger(parseInt(schoolRow["ELL"])) &&
                Number.isInteger(parseInt(schoolRow["primary"])) &&
                Number.isInteger(parseInt(schoolRow["secondary"])) &&
                Number.isInteger(parseInt(schoolRow["AP1"])) &&
                Number.isInteger(parseInt(schoolRow["AP2"])) &&
                Number.isInteger(parseInt(schoolRow["AP3"])) &&
                Number.isInteger(parseInt(schoolRow["AP4"])) &&
                Number.isInteger(parseInt(schoolRow["AP5"]))
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
            thisSchool.setPrimaryEnrolled(parseInt(schoolRow["primary"]));
            thisSchool.setSecondaryEnrolled(parseInt(schoolRow["secondary"]));

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

            let thisSchoolApArray = [];
            let thisSchoolApMap = {};
            const APSchoolAcronymArray = Object.keys(APScoreAcronymMap);
            APSchoolAcronymArray.forEach( apKey => {
                let APSchoolObj = APScoreAcronymMap[apKey];
                let APArrayMember = {
                    id: APSchoolObj.id,
                    value: parseInt(schoolRow[APSchoolObj.id]),
                    label: APSchoolObj.desc,
                    desc: APSchoolObj.desc,
                    chartColor: APSchoolObj.chartColor
                };
                thisSchoolApArray.push(APArrayMember);
                thisSchoolApMap[APSchoolObj.id] = APArrayMember;
            });
            // console.log("this school ap");
            // console.log(thisSchoolApArray);
            thisSchool.setApArray(thisSchoolApArray);
            thisSchool.setApMap(thisSchoolApMap);


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
     * Filter School data on schools and years selected
     * @param {Map} yearSchoolObjectMap
     * @param {Array} selectedSchoolsArray
     * @param {Map} selectedYearsMap
     * @returns {Map} filteredSchoolDataMap of type Map[year] -> Array{SchoolObject}
     */
    filterYearSchoolObjectMap(yearSchoolObjectMap, selectedSchoolsArray, selectedYearsMap) {
        let filteredSchoolDataMap = {};
        let selectedYearsArray = [];
        Object.keys(selectedYearsMap).forEach((key) => {
            if (selectedYearsMap[key] === true)
                selectedYearsArray.push(key)
        });

        selectedYearsArray.forEach(year => {
            if (!filteredSchoolDataMap[year]) filteredSchoolDataMap[year] = [];
            selectedSchoolsArray.forEach(schoolName => {
                filteredSchoolDataMap[year].push(yearSchoolObjectMap[year][schoolName]);
            });
        });

        console.log("filteredSchoolDataMap");
        console.log(filteredSchoolDataMap);

        return filteredSchoolDataMap;
    }

}

export default App;
