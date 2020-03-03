import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

/**
 * Main class component
 * @param {*} props
 */
function APCoursesChart(props) {

    const yearToSchoolArrayDataMap = props.yearToSchoolArrayDataMap;
    const dataYears = Object.keys(yearToSchoolArrayDataMap);
    let allYearPieCharts = [];

    dataYears.forEach(year => {
        const thisYearSchoolDataArrayScore = getGroupedAPData(yearToSchoolArrayDataMap[year]);
        const thisYearSchoolDataArrayEnrollement = getEnrollementForSchool(yearToSchoolArrayDataMap[year]);
        let thisYearPieCharts = getBarCharts(thisYearSchoolDataArrayScore, thisYearSchoolDataArrayEnrollement, props.options);

        allYearPieCharts.push(
            <div key={year} style={styles.yearChartsParent}>
                <span>{year}</span>
                {thisYearPieCharts}
            </div>
        )
    });

    return (
        <div id="ethnicity-pie-charts"
            style={styles.categoryChartsParent}
        >
            <h3 key="ethnicityHeading">AP Courses</h3>
            {allYearPieCharts}
        </div>
    );
}

//
// Helper Functions
//

/**
 * return array->[schoolName, array[schoolData]]
 * ignoring zero values
 */
function getGroupedAPData(schoolArrayForYear) {
    let chartData = [];
    schoolArrayForYear.forEach(schoolObj => {
        const schoolName = schoolObj._name;
        let thisSchoolData = {};
        let schoolDataArray = [];
        let totalCount = 0;
        schoolDataArray = schoolObj._apArray;

        thisSchoolData.id = schoolName;
        schoolDataArray.forEach(apObject => {
            totalCount += apObject.value;
        });
        schoolDataArray.forEach(apObject => {
            thisSchoolData[apObject.id] = ((apObject.value / totalCount) * 100).toFixed(2);
        });
        thisSchoolData["Enrollment"] = schoolObj._enrolled;
        thisSchoolData["year"] = schoolObj._schoolYear;

        chartData.push(thisSchoolData);

    });

    return chartData;
}
function getBarCharts(thisYearSchoolDataArrayScore, thisYearSchoolDataArrayEnrollement, options) {
    let Charts = [];
    if (options.enrollment === true) {
        const schoolData = thisYearSchoolDataArrayEnrollement;
        let keys = [];
        keys.push('Enrollment');
        Charts.push(getPieCharts(schoolData));

    }
    if (options.score === true) {
        const schoolData = thisYearSchoolDataArrayScore;
        let keys = [];
        keys = keys.concat(['AP1', 'AP2', 'AP3', 'AP4', 'AP5']);
        Charts.push(
            <div
                key={"ap-course-bar-chart"}
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
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Score',
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
                        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        enableLabel={true}
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
    }

    return Charts;
}

function getEnrollementForSchool(schoolArrayForYear) {
    let chartData = [];
    schoolArrayForYear.forEach(schoolObject => {
        const schoolName = schoolObject._name;
        const totalCountEnrolled = schoolObject._enrolled;
        let totalCountTested = 0;
        let schoolData = schoolObject._apArray;

        schoolData.forEach(apObject => {
            totalCountTested += apObject.value;
        });
        const EnrolledPercentage = (
            (totalCountEnrolled / (totalCountEnrolled + totalCountTested)) *
            100
        ).toFixed(2);
        const TestedPercentage = (
            (totalCountTested / (totalCountEnrolled + totalCountTested)) *
            100
        ).toFixed(2);

        let thisSchoolData = {};
        let schoolDataArray = [
            {
                id: "Only Enrolled",
                value: EnrolledPercentage,
                percentage: EnrolledPercentage,
                color: "#222C49",
                label: "Enrolled but did not take AP test"
            },
            {
                id: "Tested",
                value: TestedPercentage,
                percentage: TestedPercentage,
                color: "#FE8126",
                label: "Took AP test"
            }
        ];
        thisSchoolData.schoolName = schoolName;
        thisSchoolData.dataArray = schoolDataArray;
        chartData.push(thisSchoolData);
    });

    return chartData;
}


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
                            enableSlicesLabels={false}
                            enableRadialLabels={false}
                            margin={{ top: 40, right: 40, bottom: 60, left: 40 }}
                            innerRadius={0.5}
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
        }
    });
    return pieCharts;
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

export default APCoursesChart;

function getTooltipHTML(data) {
    return (
        <div
            id={data.id}
            style={{ display: "flex", flexDirection: "column", color: "black" }}
        >
            <div>
                {data.desc}: {data.value}
            </div>
            <div>Percentage: {data.percentage}%</div>
        </div>
    );
}
