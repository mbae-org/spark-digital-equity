import React from "react";

const styles = {
    checkbox: {
        marginTop: "5px"
    }
};

function PrimaryGraphChoose(props) {
    // console.log(props);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left"
            }}
        >
            <div style={{ padding: "10px" }}>Select To View:</div>
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
                        id="apScore"
                        onChange={option =>
                            optionChooseClicKHandler(props, option)
                        }
                        checked={props.selectedFilters.apScore}
                    />
                    <label>AP Courses</label>
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
