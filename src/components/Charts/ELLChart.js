/**
 * English Language Learners
 */

import React from "react";
import { ResponsivePie } from "@nivo/pie";
import {CategoryChartPanelBackgroundColor} from "../../Constants"

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
        <div id="disability-pie-charts"
             style={styles.categoryChartsParent}
        >
            <h3 key="ethnicityHeading">English Language Learners</h3>
            {allYearPieCharts}
        </div>
    );




    // const schoolDataArray = getLanguageLearnerData(
    //     props.schoolData,
    //     props.options
    // );
    //
    // let pieCharts = getPieCharts(schoolDataArray);
    //
    // return (
    //     <div
    //         style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             height: "50%",
    //             width: "100%"
    //         }}
    //     >
    //         {pieCharts}
    //     </div>
    // );
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
                color: "orange",
                label: "English Language Learner"
            },
            {
                id: "Others",
                value: otherCount,
                percentage: otherPercentage,
                color: "blue",
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
        borderStyle: "ridge",
        padding: "10px",
        backgroundColor: CategoryChartPanelBackgroundColor
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
        pieCharts.push(
            <div key={schoolName} style={styles.root}>
                <div style={{ height: "90%", flexGrow: "1" }}>
                    <ResponsivePie
                        key={schoolName}
                        colors={d => d.color}
                        isInteractive={true}
                        data={schoolData}
                        sortByValue={true}
                        enableSlicesLabels={false}
                        enableRadialLabels={false}
                        innerRadius={0.5}
                        margin={{ top: 40, right: 60, bottom: 40, left: 40 }}
                        tooltip={data => {
                            return getTooltipHTML(data);
                        }}
                        legends={
                            index + 1 === dataLength
                                ? [
                                      {
                                          anchor: "bottom",
                                          direction: "row",
                                          itemWidth: 120,
                                          itemHeight: 20,
                                          translateY: 30,
                                          translateX: 10
                                      }
                                  ]
                                : undefined
                        }
                    />
                </div>
                <div style={{ flexGrow: "1" }}>{schoolName}</div>
            </div>
        );
    });

    // if (pieCharts && pieCharts.length > 0) {
    //     const heading = [];
    //     heading.push(
    //         <div key={"ell-heading"}>
    //             {/* <h3>English Language Learners</h3> */}
    //             <h3>Learners</h3>
    //         </div>
    //     );
    //     pieCharts = heading.concat(pieCharts);
    // }

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
