import React from "react";

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
                <div>
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
                <div>
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
                {/* <div>
                    <input type="checkbox" id="econ-disad" />
                    <label>Economically Disadvantaged</label>
                </div>
                <div>
                    <input type="checkbox" id="disabilities" />
                    <label>Disabilities</label>
                </div>
                <div>
                    <input type="checkbox" id="eng-lang-learner" />
                    <label>English Language Learner</label>
                </div> */}
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
