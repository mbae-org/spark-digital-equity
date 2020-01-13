import React from "react";
import { YearList } from "../../Constants";

const styles = {
    checkbox: {
        marginTop: "5px"
    }
};

function YearFilter(props) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left"
            }}
        >
            <div style={{ padding: "10px" }}>Select Years to view</div>
            <div>{getCheckBoxListForYears(YearList, props)}</div>
        </div>
    );
}

function getCheckBoxListForYears(yearList, props) {
    let checkboxDivList = [];

    yearList.forEach(year => {
        checkboxDivList.push(
            <div style={styles.checkbox} key={"year-" + year}>
                <input
                    type="checkbox"
                    id={year}
                    onChange={option =>
                        optionChooseClicKHandler(props, option)
                    }
                    checked={props.selectedYears[year]}
                />
                <label>{year}</label>
            </div>
        );
    });

    return checkboxDivList;
}

export default YearFilter;


function optionChooseClicKHandler(props, option) {
    const targetId = option.target.id;
    const newTargetVal = option.target.checked;
    const oldState = props.selectedYears;

    let newState = oldState;
    newState[targetId] = newTargetVal;
    props.onYearChange(newState);
}