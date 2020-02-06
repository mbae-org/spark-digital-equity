import React from "react";
import "./Filters.css";

function PrimaryGraphChoose(props) {
    // console.log(props);

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

                <div className="checkbox">
                    <input
                        type="checkbox"
                        id="courseEnrollment"
                        onChange={option =>
                            optionChooseClicKHandler(props, option)
                        }
                        checked={props.selectedFilters.courseEnrollment}
                    />
                    <label>CS Course Enrollment</label>
                    <br />
                    <div className="Option">
                        <div className="subOption">
                            <input
                                type="checkbox"
                                id="courseEnrollmentSecondary"
                                onChange={option =>
                                    optionChooseClicKHandler(props, option)
                                }
                                checked={
                                    props.selectedFilters
                                        .courseEnrollmentSecondary
                                }
                            />
                            <label>Enrolled in High School</label>
                        </div>
                        <div className="subOption">
                            <input
                                type="checkbox"
                                id="courseEnrollmentPrimary"
                                onChange={option =>
                                    optionChooseClicKHandler(props, option)
                                }
                                checked={
                                    props.selectedFilters
                                        .courseEnrollmentPrimary
                                }
                            />
                            <label>Enrolled in Middle School</label>
                        </div>
                        {/* <div className="subOption">
                            <input
                                type="checkbox"
                                id="courseEnrollmentTotal"
                                onChange={option =>
                                    optionChooseClicKHandler(props, option)
                                }
                                checked={
                                    props.selectedFilters.courseEnrollmentTotal
                                }
                            />
                            <label>Total</label>
                        </div> */}
                    </div>
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
    newState[targetId] = newTargetVal;

    // handle nested apCourse checkboxes
    if (
        (targetId === "apCourseEnrollment" || targetId === "apCourseScore") &&
        newTargetVal === false
    ) {
        if (
            newState["apCourseEnrollment"] === false &&
            newState["apCourseScore"] === false
        )
            newState["apCourse"] = false;
    } else if (targetId === "apCourse") {
        if (newTargetVal === false) {
            newState["apCourseEnrollment"] = false;
            newState["apCourseScore"] = false;
        } else {
            newState["apCourseEnrollment"] = true;
            newState["apCourseScore"] = true;
        }
    }

    // handle nested course enrollment checkboxes
    if (
        (targetId === "courseEnrollmentSecondary" || targetId === "courseEnrollmentPrimary") &&
        newTargetVal === false
    ) {
        if (
            newState["courseEnrollmentSecondary"] === false &&
            newState["courseEnrollmentPrimary"] === false
        )
            newState["courseEnrollment"] = false;
    } else if (targetId === "courseEnrollment") {
        if (newTargetVal === false) {
            newState["courseEnrollmentSecondary"] = false;
            newState["courseEnrollmentPrimary"] = false;
        } else {
            newState["courseEnrollmentSecondary"] = true;
            newState["courseEnrollmentPrimary"] = true;
        }
    }

    props.onSelectionChange(newState);
}
