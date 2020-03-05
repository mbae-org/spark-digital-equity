import React from "react";
import "./Filters.css";

function PrimaryGraphChoose(props) {

    return (
        <div className="PrimaryGraph">
            <p>Select To View:</p>
            <div>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="gender"
                        onChange={option =>
                            optionChooseClicKHandler(props, option)
                        }
                        checked={props.selectedFilters.gender}
                    />
                    <label>Gender</label>
                </div>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="ethnicity"
                        onChange={option =>
                            optionChooseClicKHandler(props, option)
                        }
                        checked={props.selectedFilters.ethnicity}
                    />
                    <label>Ethnicity</label>
                </div>

                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="apCourse"
                        onChange={option =>
                            optionChooseClicKHandler(props, option)
                        }
                        checked={props.selectedFilters.apCourse}
                    />
                    <label>AP Courses</label>
                    <br />
                    <div className="Option">
                        <div className="subOption">
                            <input
                                type="checkbox"
                                id="apCourseScore"
                                onChange={option =>
                                    optionChooseClicKHandler(props, option)
                                }
                                checked={props.selectedFilters.apCourseScore}
                            />
                            <label>Scores</label>
                        </div>
                        <div className="subOption">
                            <input
                                type="checkbox"
                                id="apCourseEnrollment"
                                onChange={option =>
                                    optionChooseClicKHandler(props, option)
                                }
                                checked={
                                    props.selectedFilters.apCourseEnrollment
                                }
                            />
                            <label>Enrollment</label>
                        </div>
                    </div>
                </div>

                <div className={"checkbox"}>
                    <input
                        type="checkbox"
                        id="economicallyDisadvantaged"
                        onChange={option =>
                            optionChooseClicKHandler(props, option)
                        }
                        checked={
                            props.selectedFilters.economicallyDisadvantaged
                        }
                    />
                    <label>Economically Disadvantaged</label>
                </div>

                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="disability"
                        onChange={option =>
                            optionChooseClicKHandler(props, option)
                        }
                        checked={props.selectedFilters.disability}
                    />
                    <label>Students With Disability</label>
                </div>

                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="englishLanguageLearner"
                        onChange={option =>
                            optionChooseClicKHandler(props, option)
                        }
                        checked={props.selectedFilters.englishLanguageLearner}
                    />
                    <label>English Language Learners</label>
                </div>
            </div>
        </div>
    );
}

export default PrimaryGraphChoose;

function optionChooseClicKHandler(props, option) {
    const targetId = option.target.id;
    const newTargetVal = option.target.checked;
    const oldState = props.selectedFilters;

    let newState = oldState;

    // handle nested apCourse checkboxes
    if (targetId === "apCourse") {
        if (newTargetVal === false) {
            newState["apCourseEnrollment"] = false;
            newState["apCourseScore"] = false;
            newState[targetId] = newTargetVal;
        }
        else {
            newState["apCourseEnrollment"] = false;
            newState["apCourseScore"] = true;
            newState[targetId] = newTargetVal;
        }
    }
    else if (targetId === "apCourseEnrollment" && newTargetVal === true) {
        if (oldState["apCourse"] === true) {
            newState["apCourseEnrollment"] = true;
            newState["apCourseScore"] = false;
        }
        else {
            newState["apCourseEnrollment"] = false;
            newState["apCourseScore"] = false;
        }
    }
    else if (targetId === "apCourseScore" && newTargetVal === true) {
        if (oldState["apCourse"] === true) {
            newState["apCourseEnrollment"] = false;
            newState["apCourseScore"] = true;
        }
        else {
            newState["apCourseEnrollment"] = false;
            newState["apCourseScore"] = false;
        }
    }
    else {
        newState[targetId] = newTargetVal;
    }

    props.onSelectionChange(newState);
}
