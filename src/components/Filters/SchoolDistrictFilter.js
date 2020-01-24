import React from "react";
// import Select from "react-select";

import Creatable from "react-select/creatable";
import { components } from "react-select";
import "./Filters.css";

import { EntityType } from "../../Constants";

function SchoolDistrictFilter(props) {
    const filteredSchools = filterSchooldata(props.data);

    const schoolSet = getSchools(filteredSchools);
    const districtSet = getDistricts(filteredSchools);
    const schoolOptions = createSchoolOptions(schoolSet);
    const districtOptions = createDistrictOptions(districtSet);
    const allOptions = schoolOptions.concat(districtOptions);

    const isValidNewOption = (inputValue, selectValue) =>
        inputValue.length > 0 && selectValue.length < 5;

    return (
        <div className="SchoolDistrict">
            <p>Enter a school/district:</p>
            <div>
                <Creatable
                    components={{ Menu }}
                    isValidNewOption={isValidNewOption}
                    options={allOptions}
                    defaultValue={allOptions.filter(
                        option => option.label === "Massachussets"
                    )}
                    isMulti
                    required
                    onChange={(selectedOptions, actionMeta) =>
                        props.onOptionsChange(selectedOptions, actionMeta)
                    }
                />
            </div>
        </div>
    );
}

const Menu = props => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
        <components.Menu {...props}>
            {optionSelectedLength < 3 ? (
                props.children
            ) : (
                    <div style={{ margin: 15 }}>
                        Cannot view more than 3 schools/districts
                </div>
                )}
        </components.Menu>
    );
};

// function App() {
//     const isValidNewOption = (inputValue, selectValue) =>
//         inputValue.length > 0 && selectValue.length < 5;
//     return (
//         <div className="App">
//             <Creatable
//                 components={{ Menu }}
//                 isMulti
//                 isValidNewOption={isValidNewOption}
//                 options={options}
//             />
//         </div>
//     );
// }

function filterSchooldata(schoolData) {
    return schoolData;
}

function getSchools(schoolData) {
    let schools = new Set();
    for (let schoolName in schoolData) {
        const schoolRow = schoolData[schoolName];
        if (schoolRow._type === EntityType.SCHOOL) {
            schools.add(schoolRow._name);
        }
    }

    return schools;
}

function createSchoolOptions(schoolSet) {
    let optionList = [];
    for (let schoolName of schoolSet) {
        optionList = optionList.concat({
            value: schoolName,
            label: schoolName
        });
    }
    return optionList;
}

function getDistricts(schoolData) {
    let districtSet = new Set();
    for (let schoolName in schoolData) {
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
