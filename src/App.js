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

import schoolData from "./data/new data/2017";

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
        this.resetDefaultState = this.resetDefaultState.bind(this);

        let selectedYearsMap = {};
        YearList.forEach(year => {
            selectedYearsMap[year] = false;
        });
        selectedYearsMap[YearList[YearList.length - 1]] = true;
        const selectedSchools = ["Arlington High", "Boston Latin"];

        const yearSchoolObjectMap = this.transformSchoolData(
            schoolData,
            selectedSchools,
            selectedYearsMap
        );

        this.state = {
            newSchoolData: yearSchoolObjectMap,
            schoolData: this.extractSchoolData(schoolData),
            // schoolOptions: selectedSchools,
            selectedFilters: {
                gender: true,
                ethnicity: true,
                economicallyDisadvantaged: false,
                disability: false,
                englishLanguageLearner: false,
                courseEnrollment: true,
                apCourse: true,
                apCourseScore: true,
                apCourseEnrollment: false,
                courseEnrollmentSecondary: true,
                courseEnrollmentPrimary: true
            },
            selectedSchoolArray: selectedSchools,
            selectedYearsMap: selectedYearsMap,
            filteredSchoolData: this.filterYearSchoolObjectMap(yearSchoolObjectMap, selectedSchools, selectedYearsMap)
        };

    }

    resetDefaultState() {
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

        this.setState({
            newSchoolData: yearSchoolObjectMap,
            schoolData: this.extractSchoolData(schoolData),
            // schoolOptions: selectedSchools,
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
            selectedSchoolArray: selectedSchools,
            selectedYearsMap: selectedYearsMap,
            filteredSchoolData: this.filterYearSchoolObjectMap(yearSchoolObjectMap, selectedSchools, selectedYearsMap)
        });
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
                                onResetButtonClick={this.resetDefaultState}
                                selectedSchoolArray={this.state.selectedSchoolArray}
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

            charts.push(
                <APCoursesChart
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    key="apCoursesChart"
                    options={options}
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

        // if (selectedFilters.courseEnrollment === true) {

        //     const options = {
        //         primary: selectedFilters.courseEnrollmentPrimary,
        //         secondary: selectedFilters.courseEnrollmentSecondary,
        //         total: selectedFilters.courseEnrollmentTotal
        //     };

        //     charts.push(
        //         <CourseEnrollmentChart
        //             yearToSchoolArrayDataMap={this.state.filteredSchoolData}
        //             key="enrollmentChart"
        //             options={options}
        //         />
        //     );
        // }

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
            filteredSchoolData: this.filterYearSchoolObjectMap(this.state.newSchoolData, this.state.selectedSchoolArray, newSelection)
        });
    }

    schoolFilterChangeHandler(selectedOptions, actionMeta) {

        if (!selectedOptions) {
            selectedOptions = [];
        }

        const selectedSchoolOptions = this.transformSelectedOptions(selectedOptions);
        this.setState({
            selectedSchoolArray: selectedSchoolOptions,
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
        //let validDataArray = this.filterSchoolDataWithFields(schoolDataArray);
        let yearSchoolObjectMap = this.getYearSchoolObjectMapNew(schoolDataArray);

        // add info for all districts
        const allYears = Object.keys(yearSchoolObjectMap);
        for (let year of allYears) {
            const allSchoolNames = Object.keys(yearSchoolObjectMap[year]);
            let thisYearSchoolObjectMap = yearSchoolObjectMap[year];

            for (let schoolName of allSchoolNames) {
                const schoolObject = thisYearSchoolObjectMap[schoolName];
                const districtName = schoolObject._districtName + " District";
                const schoolYear = schoolObject._schoolYear;

                let districtObject = thisYearSchoolObjectMap[districtName];
                if (!districtObject) {
                    districtObject = new School();
                    districtObject.setName(districtName);
                    districtObject.setType(EntityType.DISTRICT);
                    districtObject.setEthnicityMap(EthnicityDefaultMap);
                    districtObject.setSchoolYear(schoolYear);
                }
                if (schoolObject._male && schoolObject._female) {
                    districtObject.setMale(districtObject._male + schoolObject._male);
                    districtObject.setFemale(districtObject._female + schoolObject._female);
                }
                if (schoolObject._economicallyDisadvantaged) {
                    districtObject.setEconomicallyDisadvantaged(
                        districtObject._economicallyDisadvantaged +
                        schoolObject._economicallyDisadvantaged
                    );
                }
                if (schoolObject._enrolled) {
                    districtObject.setEnrolled(
                        districtObject._enrolled + schoolObject._enrolled
                    );
                }
                if (schoolObject._studentsWithDisability) {
                    districtObject.setStudentsWithDisability(
                        districtObject._studentsWithDisability +
                        schoolObject._studentsWithDisability
                    );
                }


                let thisDistrictEthnicityArray = [];
                let thisDistrictEthnicityMap = districtObject._ethnicityMap;
                if (!isNaN(schoolObject._ethnicityMap["AA"].value)) {
                    for (let key in schoolObject._ethnicityMap) {
                        const ethnicityObj = schoolObject._ethnicityMap[key];
                        if (thisDistrictEthnicityMap[key].isInteger) {
                            thisDistrictEthnicityMap[key].value = JSON.parse(JSON.stringify(ethnicityObj.value))
                                + JSON.parse(JSON.stringify(thisDistrictEthnicityMap[key].value))
                        }
                        else {
                            thisDistrictEthnicityMap[key].value = JSON.parse(JSON.stringify(ethnicityObj.value))
                        }
                        thisDistrictEthnicityArray.push(JSON.parse(JSON.stringify(thisDistrictEthnicityMap[key])));

                    }
                }

                districtObject.setEthnicityMap(thisDistrictEthnicityMap);
                districtObject.setEthnicity(thisDistrictEthnicityArray);

                if (schoolObject._englishLanguageLearner) {

                    districtObject.setEnglishLanguageLearner(
                        districtObject._englishLanguageLearner +
                        schoolObject._englishLanguageLearner
                    );

                }
                // districtObject.setPrimaryEnrolled(districtObject._primaryEnrolled + schoolObject._primaryEnrolled);
                // districtObject.setSecondaryEnrolled(districtObject._secondaryEnrolled + schoolObject._secondaryEnrolled);

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

        //filteredArray = this.filterSchoolDataWithFields(schoolDataArray);
        schoolObjectMap = this.getSchoolObjectMap(schoolDataArray);

        // add info for all districts
        const allSchoolNames = Object.keys(schoolObjectMap);
        for (let schoolName of allSchoolNames) {
            const schoolObject = schoolObjectMap[schoolName];
            const districtName = schoolObject._districtName + " District";

            let districtObject = schoolObjectMap[districtName];
            if (!districtObject) {
                districtObject = new School();
                districtObject.setName(districtName);
                districtObject.setType(EntityType.DISTRICT);
                districtObject.setEthnicityMap(EthnicityDefaultMap);
                districtObject.setApMap(APScoreAcronymMap);
            }
            if (!isNaN(schoolObject._male) && !isNaN(schoolObject._female)) {
                districtObject.setMale(districtObject._male + schoolObject._male);
                districtObject.setFemale(districtObject._female + schoolObject._female);
            }
            if (!isNaN(schoolObject._economicallyDisadvantaged)) {
                districtObject.setEconomicallyDisadvantaged(
                    districtObject._economicallyDisadvantaged +
                    schoolObject._economicallyDisadvantaged
                );
            }
            if (!isNaN(schoolObject._enrolled)) {
                districtObject.setEnrolled(
                    districtObject._enrolled + schoolObject._enrolled
                );
            }
            if (!isNaN(schoolObject._studentsWithDisability)) {
                districtObject.setStudentsWithDisability(
                    districtObject._studentsWithDisability +
                    schoolObject._studentsWithDisability
                );
            }


            let thisDistrictEthnicityArray = [];
            let thisDistrictEthnicityMap = districtObject._ethnicityMap;

            if (!isNaN(schoolObject._ethnicityMap["AA"].value)) {
                for (let key in schoolObject._ethnicityMap) {
                    const ethnicityObj = schoolObject._ethnicityMap[key];
                    if (thisDistrictEthnicityMap[key].isInteger) {
                        thisDistrictEthnicityMap[key].value = JSON.parse(JSON.stringify(ethnicityObj.value))
                            + JSON.parse(JSON.stringify(thisDistrictEthnicityMap[key].value))
                    }
                    else {
                        thisDistrictEthnicityMap[key].value = JSON.parse(JSON.stringify(ethnicityObj.value))
                    }
                    thisDistrictEthnicityArray.push(JSON.parse(JSON.stringify(thisDistrictEthnicityMap[key])));
                }
            }

            districtObject.setEthnicityMap(thisDistrictEthnicityMap);
            districtObject.setEthnicity(thisDistrictEthnicityArray);


            let thisDistrictAPArray = [];
            let thisDistrictAPMap = districtObject._apMap;

            if (schoolObject._apMap) {
                for (let key in schoolObject._apMap) {
                    const apObj = schoolObject._apMap[key];
                    thisDistrictAPMap[key].value += apObj.value;
                    thisDistrictAPArray.push(thisDistrictAPMap[key]);
                }
            }

            districtObject.setApMap(thisDistrictAPMap);
            districtObject.setApArray(thisDistrictAPArray);

            if (!isNaN(schoolObject._englishLanguageLearner)) {
                districtObject.setEnglishLanguageLearner(
                    districtObject._englishLanguageLearner +
                    schoolObject._englishLanguageLearner
                );
            }

            schoolObjectMap[districtName] = districtObject;
        }

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

        return filteredArray;
    }


    getSchoolObjectMap(filteredArray) {
        let schoolObjectMap = {};

        // add all school data
        filteredArray.forEach(schoolRow => {
            const schoolName = schoolRow["School Name"];
            const districtName = schoolRow["District"];

            let thisSchool = new School();
            thisSchool.setName(schoolName);
            thisSchool.setType(EntityType.SCHOOL);
            thisSchool.setMale(parseInt(schoolRow["MALE"]));
            thisSchool.setFemale(parseInt(schoolRow["FEMALE"]));
            thisSchool.setDistrictName(districtName);
            thisSchool.setEthnicity([]);
            thisSchool.setEconomicallyDisadvantaged(
                parseInt(schoolRow["EcoDis"])
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
            const schoolName = schoolRow["School Name"];
            const districtName = schoolRow["District"];
            const schoolYear = parseInt(schoolRow["SY"]);

            let thisSchool = new School();
            thisSchool.setName(schoolName);
            thisSchool.setType(EntityType.SCHOOL);
            thisSchool.setMale(parseInt(schoolRow["MALE"]));
            thisSchool.setFemale(parseInt(schoolRow["FEMALE"]));
            thisSchool.setDistrictName(districtName);
            thisSchool.setEthnicity([]);
            thisSchool.setEconomicallyDisadvantaged(
                parseInt(schoolRow["EcoDis"])
            );
            thisSchool.setEnrolled(parseInt(schoolRow["STUDENTS_ENROLLED"]));
            thisSchool.setStudentsWithDisability(parseInt(schoolRow["SWD"]));
            thisSchool.setSchoolYear(schoolYear);
            thisSchool.setEnglishLanguageLearner(parseInt(schoolRow["ELL"]));
            // thisSchool.setPrimaryEnrolled(parseInt(schoolRow["primary"]));
            // thisSchool.setSecondaryEnrolled(parseInt(schoolRow["secondary"]));

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
            APSchoolAcronymArray.forEach(apKey => {
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
            if (!filteredSchoolDataMap[year]) {
                filteredSchoolDataMap[year] = [];

            }
            selectedSchoolsArray.forEach(schoolName => {
                filteredSchoolDataMap[year].push(yearSchoolObjectMap[year][schoolName]);
            });
        });

        return filteredSchoolDataMap;
    }

}

export default App;
