import React from "react";

import Creatable from "react-select/creatable";
import { components } from "react-select";
import "./Filters.css";

import { EntityType } from "../../Constants";

class SchoolDistrictFilter extends React.Component {

    constructor(props) {
        super(props);

        const filteredSchools = filterSchooldata(this.props.data);
        const schoolSet = getSchools(filteredSchools);
        const districtSet = getDistricts(filteredSchools);
        const schoolOptions = createSchoolOptions(schoolSet);
        const districtOptions = createDistrictOptions(districtSet);
        const allOptionsArray = schoolOptions.concat(districtOptions);


        this.state = {
            allOptionsArray: allOptionsArray
        };

    }

    render() {

        const isValidNewOption = (inputValue, selectValue) =>
            inputValue.length > 0 && selectValue.length < 5;


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

        return (
            <div className="SchoolDistrict">
                <p>Enter a school/district:</p>
                <div>
                    <Creatable
                        components={{ Menu }}
                        isValidNewOption={isValidNewOption}
                        options={this.state.allOptionsArray}
                        isMulti
                        required
                        onChange={(selectedOptions, actionMeta) =>
                            this.onOptionsChange(selectedOptions, actionMeta)
                        }
                        value={this.getOptionsArray(this.props.selectedSchoolArray, this.state.allOptionsArray)}
                    />
                </div>
            </div>
        );
    }

    onOptionsChange(selectedOptions, actionMeta) {

        let valueToSet = selectedOptions;

        if (actionMeta.action === "clear") {
            valueToSet = this.getOptionsArray(this.props.selectedSchoolArray, this.state.allOptionsArray);
        }

        this.props.onOptionsChange(valueToSet, actionMeta);
    }

    getOptionsArray(schoolNameArray, allOptionsArray) {

        let optionsArray = [];
        schoolNameArray.forEach(schoolName => {

            optionsArray = optionsArray.concat(
                allOptionsArray.filter(option => option.label === schoolName)
            )
        });

        return optionsArray;
    }

}



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
