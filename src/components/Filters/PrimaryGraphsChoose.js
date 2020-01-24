import React from "react";
import "./Filters.css";

const styles = {
    checkbox: {
        marginTop: "10px"
    }
};

function PrimaryGraphChoose(props) {
    // console.log(props);

    return (
        <div className="PrimaryGraph">
            <p>Select To View:</p>
            <div>
                <div style={styles.checkbox}>
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
                <div style={styles.checkbox}>
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

                <div style={styles.checkbox}>
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

                <div style={styles.checkbox}>
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

                <div style={styles.checkbox}>
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

                <div style={styles.checkbox}>
                    <input
                        type="checkbox"
                        id="courseEnrollment"
                        onChange={option =>
                            optionChooseClicKHandler(props, option)
                        }
                        checked={props.selectedFilters.courseEnrollment}
                    />
                    <label>CS Course Enrollment</label>
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
    props.onSelectionChange(newState);
}
