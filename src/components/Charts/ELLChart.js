/**
 * English Language Learners
 */

import React from "react";
import { ResponsivePie } from "@nivo/pie";

/**
 * Main class component
 * @param {*} props
 */
function ELLChart(props) {

    const yearToSchoolArrayDataMap = props.yearToSchoolArrayDataMap;
    const dataYears = Object.keys(yearToSchoolArrayDataMap);
    let allYearPieCharts = [];

    dataYears.forEach(year => {
        const thisYearSchoolDataArray = getLanguageLearnerData(yearToSchoolArrayDataMap[year]);
        let thisYearPieCharts = getPieCharts(thisYearSchoolDataArray);

        allYearPieCharts.push(
            <div key={year} style={styles.yearChartsParent}>
                <span>{year}</span>
                {thisYearPieCharts}
            </div>
        )
    });

    return (
        <div id="ell-pie-charts"
            style={styles.categoryChartsParent}
        >
            <h3 key="ellHeading">English Language Learners</h3>
            {allYearPieCharts}
        </div>
    );


}

/**
 * return array: x->schoolName, male, female
 */
function getLanguageLearnerData(schoolArrayForYear) {
    let chartData = [];
    schoolArrayForYear.forEach(schoolObject => {
        const schoolName = schoolObject._name;
        const languageLearnerCount = schoolObject._englishLanguageLearner;
        const totalCount = schoolObject._enrolled;
        const otherCount = totalCount - languageLearnerCount;

        const learnerPercentage = (
            (languageLearnerCount / totalCount) *
            100
        ).toFixed(2);
        const otherPercentage = ((otherCount / totalCount) * 100).toFixed(2);

        let thisSchoolData = {};
        let schoolDataArray = [
            {
                // id: "Students With Disability",
                id: "ELL",
                value: languageLearnerCount,
                percentage: learnerPercentage,
                color: "#222C49",
                label: "English Language Learner"
            },
            {
                id: "Others",
                value: otherCount,
                percentage: otherPercentage,
                color: "#FE8126",
                label: "Others"
            }
        ];
        thisSchoolData.schoolName = schoolName;
        thisSchoolData.dataArray = schoolDataArray;
        chartData.push(thisSchoolData);
    });

    return chartData;
}

const styles = {
    root: {
        fontFamily: "consolas, sans-serif",
        textAlign: "center",
        position: "relative",
        width: 250,
        height: 300
    },

    totalLabel: {
        fontSize: 24
    },
    categoryChartsParent: {
        display: "flex",
        flexDirection: "column",
        // height: "50%",
        width: "100%",
        borderBottomStyle: "solid",
        borderBottomWidth: "thin",
        borderBottomColor: "#707070",
        padding: "10px",
        backgroundColor: "#F1F1F1"
    },
    yearChartsParent: {
        display: "flex",
        flexDirection: "row"
    }
};

function getPieCharts(schoolDataArray) {
    const dataLength = schoolDataArray.length;
    let pieCharts = [];

    schoolDataArray.forEach((row, index) => {
        const schoolName = row.schoolName;
        const schoolData = row.dataArray;
        if (isNaN(schoolData[0].value)) {
            pieCharts.push(
                <div className="NoDataWrapper">
                    <div className="NoDataMessage">
                        <p>No Data Available</p>
                    </div>
                    <div style={{ flexGrow: "1" }}>{schoolName}</div>
                </div>
            )
        }
        else {
            pieCharts.push(
                <div key={schoolName} style={styles.root}>
                    <div style={{ height: "90%", flexGrow: "1" }}>
                        <ResponsivePie
                            key={schoolName}
                            colors={d => d.color}
                            isInteractive={true}
                            data={schoolData}
                            sortByValue={true}
                            enableSlicesLabels={true}
                            enableRadialLabels={false}
                            slicesLabelsTextColor="white"
                            margin={{ top: 40, right: 60, bottom: 40, left: 40 }}
                            innerRadius={0.5}
                            tooltip={data => {
                                return getTooltipHTML(data);
                            }}

                        />
                    </div>
                    <div style={{ flexGrow: "1" }}>{schoolName}</div>
                </div>
            );
        }
    });

    return pieCharts;
}

function getTooltipHTML(data) {
    return (
        <div
            style={{ display: "flex", flexDirection: "column", color: "black" }}
        >
            <div>
                {data.label}: {data.value}
            </div>
            <div>Percentage: {data.percentage}%</div>
        </div>
    );
}

export default ELLChart;
