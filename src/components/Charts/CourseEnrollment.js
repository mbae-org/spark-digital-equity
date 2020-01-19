/**
 * CS Course Enrollment
 */

import React from "react";
// import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import {CategoryChartPanelBackgroundColor} from "../../Constants"

/**
 * Main class component
 * @param {*} props
 */
function CourseEnrollmentChart(props) {

    const yearToSchoolArrayDataMap = props.yearToSchoolArrayDataMap;
    const dataYears = Object.keys(yearToSchoolArrayDataMap);
    let allYearPieCharts = [];

    dataYears.forEach(year => {
        // const thisYearSchoolDataArray = getCourseEnrollmentData(yearToSchoolArrayDataMap[year]);
        const thisYearSchoolDataArray = getCourseEnrollmentDataNew(yearToSchoolArrayDataMap[year]);

        let maxEnrolledCount = 0;
        // thisYearSchoolDataArray.forEach(school => {
        //     const dataArray = school.dataArray;
        //     dataArray.forEach(element => {
        //         if(element.value > maxEnrolledCount) {
        //             maxEnrolledCount = element.value;
        //         }
        //     });
        // });

        let thisYearPieCharts = getBarCharts(thisYearSchoolDataArray, maxEnrolledCount);

        allYearPieCharts.push(
            <div key={year} style={styles.yearChartsParent}>
                <span>{year}</span>
                {thisYearPieCharts}
            </div>
        )
    });

    return (
        <div id="courseEnrollment-pie-charts"
             style={styles.categoryChartsParent}
        >
            <h3 key="courseEnrollmentHeading">CS Course Enrollment</h3>
            {allYearPieCharts}
        </div>
    );


}



function getCourseEnrollmentDataNew(schoolArrayForYear) {
    let chartData = [];
    schoolArrayForYear.forEach(schoolObject => {
        const schoolName = schoolObject._name;
        const primaryEnrolledCount = schoolObject._primaryEnrolled;
        const secondaryEnrolledCount = schoolObject._secondaryEnrolled;
        const totalCount = primaryEnrolledCount + secondaryEnrolledCount;

        const primaryEnrolledPercentage = (
            (primaryEnrolledCount / totalCount) *
            100
        ).toFixed(2);
        const secondaryEnrolledPercentage = ((secondaryEnrolledCount / totalCount) * 100).toFixed(2);

        // let thisSchoolData = {};
        let schoolDataObject = {
                id: schoolName,
                "Primary": primaryEnrolledCount,
                // value: primaryEnrolledCount,
                primaryPercentage: primaryEnrolledPercentage,
                // color: "orange",
                primaryLabel: "Enrolled prior to Secondary Level",
                "Secondary": secondaryEnrolledCount,
                secondaryPercentage: secondaryEnrolledPercentage,
                // color: "blue",
                secondaryLabel: "Enrolled at Secondary Level"
        };

        // thisSchoolData.schoolName = schoolName;
        // thisSchoolData.dataArray = schoolDataArray;
        chartData.push(schoolDataObject);
    });

    console.log("chartData");
    console.log(chartData);

    return chartData;
}

const styles = {
    root: {
        fontFamily: "consolas, sans-serif",
        textAlign: "center",
        position: "relative",
        width: "100%",
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

function getBarCharts(schoolDataArray, maxEnrolledCount) {
    let pieCharts = [];

    // schoolDataArray.forEach((row, index) => {
        // const schoolName = row.schoolName;
        // const schoolData = row.dataArray;
        const schoolData = schoolDataArray;
        // const schoolName = row.id;

        console.log("bar chart data here");
        console.log(schoolData);

        pieCharts.push(
            <div
                // key={schoolName}
                style={styles.root}>
                <div style={{ height: "90%", flexGrow: "1",
                    width: "100%"
                }}>
                    <ResponsiveBar
                        data={schoolData}
                        keys={[ 'Primary', 'Secondary']}
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.2}
                        groupMode="grouped"
                        colors={{ scheme: 'nivo' }}
                        minValue={0}
                        // maxValue={maxEnrolledCount}
                        tooltip={data => {
                            return getTooltipHTML(data);
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        // fill={[
                        //     {
                        //         match: {
                        //             id: 'fries'
                        //         },
                        //         id: 'dots'
                        //     },
                        //     {
                        //         match: {
                        //             id: 'sandwich'
                        //         },
                        //         id: 'lines'
                        //     }
                        // ]}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        // axisBottom={{
                        //     tickSize: 5,
                        //     tickPadding: 5,
                        //     tickRotation: 0,
                        //     legend: 'country',
                        //     legendPosition: 'middle',
                        //     legendOffset: 32
                        // }}
                        // axisLeft={{
                        //     tickSize: 5,
                        //     tickPadding: 5,
                        //     tickRotation: 0,
                        //     legend: 'Students Enrolled',
                        //     legendPosition: 'middle',
                        //     legendOffset: -40
                        // }}
                        // labelSkipWidth={12}
                        // labelSkipHeight={12}
                        // labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                </div>
                {/*<div style={{ flexGrow: "1" }}>{schoolName}</div>*/}
            </div>
        );
    // });

    return pieCharts;
}

function getTooltipHTML(data) {

    console.log("tooltip");
    console.log(data);


    const barData = data.data;
    const typeOfBar = data.id;
    let label = "";
    let percentage = "";

    if(typeOfBar === "Primary") {
        label = barData.primaryLabel;
        percentage = barData.primaryPercentage;
    }
    else {
        label = barData.secondaryLabel;
        percentage = barData.secondaryPercentage;
    }

    return (
        <div
            style={{ display: "flex", flexDirection: "column", color: "black" }}
        >
            <div>
                {label}: {barData.value}
            </div>
            <div>Percentage: {percentage}%</div>
        </div>
    );
}

export default CourseEnrollmentChart;
