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
import APCoursesChart from "./components/Charts/APCourses"
import NextStepsPanel from "./components/NextSteps/NextStepsPanel"
import schoolData from "./data/TotalData"
import UploadData from "./components/addData/UploadData";
import Login from "./components/addData/Login";
import { YearList } from "./data/TotalData"
import School from "./School";
import firebase from "firebase/app";


import {
    EntityType,
    EthnicityAcronymList,
    EthnicityDefaultMap,
    APAcronymList,
    APScoreAcronymMap
} from "./Constants";


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
        const selectedSchools = ["Massachusetts"];

        const schoolDataModified = this.transformSchoolData(schoolData)

        this.state = {
            schoolDataModified: schoolDataModified,
            logined: false,
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
            filteredSchoolData: this.filterYearSchoolObjectMap(schoolDataModified, selectedSchools, selectedYearsMap)
        };

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ logined: true });
            }
            else {
                this.setState({ logined: false });
            }
        });
    }

    resetDefaultState() {
        let selectedYearsMap = {};
        YearList.forEach(year => {
            selectedYearsMap[year] = false;
        });
        selectedYearsMap[YearList[YearList.length - 1]] = true;
        const selectedSchools = ["Massachussets"];

        const schoolDataModified = this.transformSchoolData(schoolData)

        this.setState({
            schoolDataModified: schoolDataModified,
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
            filteredSchoolData: this.filterYearSchoolObjectMap(schoolDataModified, selectedSchools, selectedYearsMap)
        });
    }

    render() {
        const charts = this.createChartsFromFilterState();

        let comp;
        if (this.state.logined) {
            comp = <UploadData />;
        }
        else {
            comp = <Login />;
        }
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
                                data={this.state.schoolDataModified[2016]}
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
                            {comp}
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
                    key="economicallyDisadvantagedChart"
                />
            );
        }

        if (selectedFilters.disability === true) {
            charts.push(
                <DisabilityChart
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    key="disabilityChart"
                />
            );
        }

        if (selectedFilters.englishLanguageLearner === true) {
            charts.push(
                <ELLChart
                    yearToSchoolArrayDataMap={this.state.filteredSchoolData}
                    key="ellChart"
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
            filteredSchoolData: this.filterYearSchoolObjectMap(this.state.schoolDataModified, this.state.selectedSchoolArray, newSelection)
        });
    }

    schoolFilterChangeHandler(selectedOptions) {

        if (!selectedOptions) {
            selectedOptions = [];
        }

        const selectedSchoolOptions = this.transformSelectedOptions(selectedOptions);
        this.setState({
            selectedSchoolArray: selectedSchoolOptions,
            filteredSchoolData: this.filterYearSchoolObjectMap(this.state.schoolDataModified, selectedSchoolOptions, this.state.selectedYearsMap)
        });
    }

    transformSelectedOptions(selectedOptions) {
        let schoolNameArray = [];
        selectedOptions.forEach(row => {
            schoolNameArray.push(row.label);
        });
        return schoolNameArray;
    }

    /**
 *
 * @param {array} schoolDataArray
 * @param {array} selectedSchools list of selected schools
 * @param {Map} selectedYears
 * @returns {[]}
 */

    transformSchoolData(schoolDataArray) {
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
                    districtObject.setApMap(APScoreAcronymMap);
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

                let thisDistrictAPArray = [];
                let thisDistrictAPMap = JSON.parse(JSON.stringify(districtObject._apMap));

                if (!isNaN(schoolObject._apMap["Score=1"].value)) {
                    for (let key in schoolObject._apMap) {
                        const apObj = schoolObject._apMap[key];
                        if (thisDistrictAPMap[key].isInteger) {
                            thisDistrictAPMap[key].value = JSON.parse(JSON.stringify(apObj.value))
                                + JSON.parse(JSON.stringify(thisDistrictAPMap[key].value))
                        }
                        else {
                            thisDistrictAPMap[key].value = JSON.parse(JSON.stringify(apObj.value))
                        }
                        thisDistrictAPArray.push(thisDistrictAPMap[key]);
                    }
                }

                districtObject.setApMap(thisDistrictAPMap);
                districtObject.setApArray(thisDistrictAPArray);


                if (schoolObject._englishLanguageLearner) {

                    districtObject.setEnglishLanguageLearner(
                        districtObject._englishLanguageLearner +
                        schoolObject._englishLanguageLearner
                    );

                }

                if (!schoolName === "Massachusetts") {
                    thisYearSchoolObjectMap[districtName] = districtObject;
                }

            }
            yearSchoolObjectMap[year] = thisYearSchoolObjectMap;
        }
        return yearSchoolObjectMap;
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

            let thisSchoolAPArray = [];
            let thisSchoolAPMap = {};

            APAcronymList.forEach(APObj => {
                let APArrayMember = {
                    id: APObj.id,
                    value: parseInt(schoolRow[APObj.id]),
                    label: APObj.desc,
                    desc: APObj.desc,
                    chartColor: APObj.chartColor
                };

                thisSchoolAPArray.push(APArrayMember);
                thisSchoolAPMap[
                    APArrayMember.id
                ] = APArrayMember;
            });

            thisSchool.setApArray(thisSchoolAPArray);
            thisSchool.setApMap(thisSchoolAPMap);

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
                Number.isInteger(parseInt(schoolRow["Score=1"])) &&
                Number.isInteger(parseInt(schoolRow["Score=2"])) &&
                Number.isInteger(parseInt(schoolRow["Score=3"])) &&
                Number.isInteger(parseInt(schoolRow["Score=4"])) &&
                Number.isInteger(parseInt(schoolRow["Score=5"]))
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

            let thisSchoolAPArray = [];
            let thisSchoolAPMap = {};

            APAcronymList.forEach(APObj => {
                let APArrayMember = {
                    id: APObj.id,
                    value: parseInt(schoolRow[APObj.id]),
                    label: APObj.desc,
                    desc: APObj.desc,
                    chartColor: APObj.chartColor
                };

                thisSchoolAPArray.push(APArrayMember);
                thisSchoolAPMap[
                    APArrayMember.id
                ] = APArrayMember;
            });

            thisSchool.setApArray(thisSchoolAPArray);
            thisSchool.setApMap(thisSchoolAPMap);

            schoolObjectMap[schoolName] = thisSchool;
        });

        return schoolObjectMap;
    }

    /**
     * Filter School data on schools and years selected
     * @param {Map} yearSchoolObjectMap
     * @param {Array} selectedSchoolsArray
     * @param {Map} selectedYearsMap
     * @returns {Map} filteredSchoolDataMap of type Map[year] -> Array{SchoolObject}
     */
    filterYearSchoolObjectMap(schoolData, selectedSchoolsArray, selectedYearsMap) {
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
                filteredSchoolDataMap[year].push(schoolData[year][schoolName]);
            });
        });
        return filteredSchoolDataMap;
    }

}

export default App;