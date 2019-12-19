import React from "react";
import Select from "react-select";
import { EntityType } from "../../Constants";

function SchoolDistrictFilter(props) {
    const filteredSchools = filterSchooldata(props.data);

    const schoolSet = getSchools(filteredSchools);
    const districtSet = getDistricts(filteredSchools);
    const schoolOptions = createSchoolOptions(schoolSet);
    const districtOptions = createDistrictOptions(districtSet);
    const allOptions = schoolOptions.concat(districtOptions);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "10px" }}>
                Select School / District to compare
            </div>
            <div style={{ color: "black" }}>
                <Select
                    options={allOptions}
                    isMulti
                    onChange={selectedOptions =>
                        props.onOptionsChange(selectedOptions)
                    }
                />
            </div>
        </div>
    );
}

function filterSchooldata(schoolData) {
    // let filteredArray = [];
    // for (let schoolRow of schoolData) {
    //     if (
    //         parseInt(schoolRow["FEMALE"]) &&
    //         parseInt(schoolRow["MALE"]) &&
    //         schoolRow["DIST_NAME"]
    //     ) {
    //         filteredArray = filteredArray.concat(schoolRow);
    //     }
    // }

    // return filteredArray;
    return schoolData;
}

function getSchools(schoolData) {
    let schools = new Set();
    for (let schoolName in schoolData) {
        // if (parseInt(schoolRow["FEMALE"]) && parseInt(schoolRow["MALE"])){
        //     schools.add(schoolRow["SCH_NAME"]);
        // }
        const schoolRow = schoolData[schoolName];
        if (schoolRow._type === EntityType.SCHOOL) {
            schools.add(schoolRow._name);
        }
    }

    return schools;
}

function createSchoolOptions(schoolSet) {
    let optionList = [];
    // let i = 0;
    for (let schoolName of schoolSet) {
        optionList = optionList.concat({
            value: schoolName,
            label: schoolName
        });
        // i++;
    }
    return optionList;
}

function getDistricts(schoolData) {
    let districtSet = new Set();
    for (let schoolName in schoolData) {
        // if (schoolRow["DIST_NAME"]) {
        //     districtSet.add(schoolRow["DIST_NAME"]);
        // }
        const schoolRow = schoolData[schoolName];
        if (schoolRow._type === EntityType.DISTRICT) {
            districtSet.add(schoolRow._name);
        }
    }

    return districtSet;
}

function createDistrictOptions(districtSet) {
    let optionList = [];
    for (let districtName of districtSet) {
        optionList = optionList.concat({
            value: districtName,
            label: districtName
        });
    }
    return optionList;
}

export default SchoolDistrictFilter;
