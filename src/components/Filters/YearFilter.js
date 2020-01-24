import React from "react";
import { YearList } from "../../Constants";
import "./Filters.css";

const styles = {
    checkbox: {
        marginTop: "10px"
    }
};

function YearFilter(props) {
    return (
        <div className="YearFilter">
            <p>Choose years to view:</p>
            <div className="checkbox">{getCheckBoxListForYears(YearList, props)}</div>
        </div>
    );
}

function getCheckBoxListForYears(yearList, props) {
    let checkboxDivList = [];

    yearList.forEach(year => {
        checkboxDivList.push(
            <div key={"year-" + year} style={styles.checkbox}>
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