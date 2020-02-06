/**
 * CS Course Enrollment
 */

import React from "react";
import { ResponsiveBar } from "@nivo/bar";

/**
 * Main class component
 * @param {*} props
 */
function CourseEnrollmentChart(props) {

    const yearToSchoolArrayDataMap = props.yearToSchoolArrayDataMap;
    const dataYears = Object.keys(yearToSchoolArrayDataMap);
    let allYearPieCharts = [];

    dataYears.forEach(year => {
        const thisYearSchoolDataArray = getCourseEnrollmentData(yearToSchoolArrayDataMap[year]);

        let thisYearPieCharts = getBarCharts(thisYearSchoolDataArray, props.options);

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



function getCourseEnrollmentData(schoolArrayForYear) {
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
            "Primary": primaryEnrolledPercentage,
            primaryPercentage: primaryEnrolledPercentage,
            primaryLabel: "Enrolled prior to Secondary Level",
            "Secondary": secondaryEnrolledPercentage,
            secondaryPercentage: secondaryEnrolledPercentage,
            secondaryLabel: "Enrolled at Secondary Level"
        };

        chartData.push(schoolDataObject);
    });

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

function getBarCharts(schoolDataArray, options) {
    let barChart = [];
    const schoolData = schoolDataArray;

    let keys = [];
    if (options.primary === true) {
        keys.push('Primary');
    }
    if (options.secondary === true) {
        keys.push('Secondary');
    }
    if (options.total === true) {
        keys.push('Total');
    }


    barChart.push(
        <div
            key={"enrollment-bar-chart"}
            style={styles.root}>
            <div style={{
                height: "90%", flexGrow: "1",
                width: "100%"
            }}>
                <ResponsiveBar
                    data={schoolData}
                    keys={keys}
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.2}
                    // groupMode="stacked"
                    groupMode="grouped"
                    colors={{ "scheme": "red_yellow_blue" }}
                    minValue={0}
                    // maxValue={maxEnrolledCount}
                    tooltip={data => {
                        return getTooltipHTML(data);
                    }}
                    isInteractive={false}
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
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Percentage of Students',
                        legendPosition: 'middle',
                        legendOffset: -50
                    }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
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
                            itemOpacity: 1,
                            symbolSize: 20,
                        }
                    ]}
                    labelTextColor="white"
                />
            </div>
        </div>
    );
    // });

    return barChart;
}

function getTooltipHTML(data) {

    const barData = data.data;
    const typeOfBar = data.id;
    let label = "";
    let percentage = "";

    if (typeOfBar === "Primary") {
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
