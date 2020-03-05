import React from "react";
import { YearList } from "../../data/TotalData";
import "./Filters.css";


function YearFilter(props) {
    return (
        <div className="YearFilter">
            <p>Choose years to view:</p>
            <div>{getCheckBoxListForYears(YearList, props)}</div>
        </div>
    );
}

function getCheckBoxListForYears(yearList, props) {
    let checkboxDivList = [];

    yearList.forEach(year => {
        checkboxDivList.push(
            <div key={"year-" + year} className="checkbox">
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

    return <div className="year_checkbox">{checkboxDivList}</div>;
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