import React from "react";
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
        let thisYearPieCharts;
        if (props.options.score === true) {
            thisYearPieCharts = getPieChartsScores(thisYearSchoolDataArrayScore);
        }
        else {
            thisYearPieCharts = getPieChartsEnrollment(thisYearSchoolDataArrayEnrollement);
        }
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
    console.log(schoolArrayForYear);
    schoolArrayForYear.forEach(schoolObj => {
        if (schoolObj) {
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

            schoolDataArray = [
                {
                    id: "Score=1",
                    desc: "Score=1",
                    value: schoolDataArray[0].value,
                    percentage: thisSchoolData["Score=1"],
                    color: "#545454",
                    label: "Score=1"
                },
                {
                    id: "Score=2",
                    desc: "Score=2",
                    value: schoolDataArray[1].value,
                    percentage: thisSchoolData["Score=2"],
                    color: "#0B89D3",
                    label: "Score=2"
                },
                {
                    id: "Score=3",
                    desc: "Score=3",
                    value: schoolDataArray[2].value,
                    percentage: thisSchoolData["Score=3"],
                    color: "#FBC184",
                    label: "Score=3"
                },
                {
                    id: "Score=4",
                    desc: "Score=4",
                    value: schoolDataArray[3].value,
                    percentage: thisSchoolData["Score=4"],
                    color: "#FE8126",
                    label: "Score=4"
                },
                {
                    id: "Score=5",
                    desc: "Score=5",
                    value: schoolDataArray[4].value,
                    percentage: thisSchoolData["Score=5"],
                    color: "#222C49",
                    label: "Score=5"
                }
            ];
            thisSchoolData.schoolName = schoolName;
            thisSchoolData.dataArray = schoolDataArray;
            chartData.push(thisSchoolData);
        }
    });

    return chartData;
}


function getEnrollementForSchool(schoolArrayForYear) {
    let chartData = [];
    schoolArrayForYear.forEach(schoolObject => {
        if (schoolObject) {
            const schoolName = schoolObject._name;
            const totalCountEnrolled = schoolObject._enrolled;
            let totalCountTested = 0;
            let schoolData = schoolObject._apArray;

            schoolData.forEach(apObject => {
                totalCountTested += apObject.value;
            });
            const TestedPercentage = (
                (totalCountTested / (totalCountEnrolled)) *
                100
            ).toFixed(2);

            let thisSchoolData = {};
            let schoolDataArray = [
                {
                    id: "Only Enrolled",
                    value: totalCountEnrolled - totalCountTested,
                    percentage: 100 - TestedPercentage,
                    color: "#222C49",
                    label: "Enrolled but did not take AP test",
                    desc: "Enrolled but did not take AP test"
                },
                {
                    id: "Tested",
                    value: totalCountTested,
                    percentage: TestedPercentage,
                    color: "#FE8126",
                    label: "Took AP test",
                    desc: "Took AP test"
                }
            ];
            thisSchoolData.schoolName = schoolName;
            thisSchoolData.dataArray = schoolDataArray;
            chartData.push(thisSchoolData);
        }
    });

    return chartData;
}


function getPieChartsScores(schoolDataArray) {
    let pieCharts = [];

    schoolDataArray.forEach((row) => {
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


function getPieChartsEnrollment(schoolDataArray) {
    let pieCharts = [];

    schoolDataArray.forEach((row) => {
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
