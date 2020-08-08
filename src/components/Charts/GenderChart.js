import React from "react";
import { ResponsivePie } from "@nivo/pie";
import "./Charts.css"

/**
 * Main class component
 * @param {*} props
 */
function GenderChart(props) {
    const yearToSchoolArrayDataMap = props.yearToSchoolArrayDataMap;
    const dataYears = Object.keys(yearToSchoolArrayDataMap);
    let allYearPieCharts = [];

    dataYears.forEach(year => {
        const thisYearSchoolDataArray = getGenderForSchool(yearToSchoolArrayDataMap[year]);
        let thisYearPieCharts = getPieCharts(thisYearSchoolDataArray);

        allYearPieCharts.push(
            <div key={year} style={styles.yearChartsParent}>
                <span>{year}</span>
                {thisYearPieCharts}
            </div>
        )
    });


    return (
        <div id="gender-pie-charts"
            style={styles.genderChartsParent}
        >
            <h3 key={"gender-heading"}>Gender</h3>
            {allYearPieCharts}
        </div>
    );
}


function getGenderForSchool(schoolArrayForYear) {
    let chartData = [];

    schoolArrayForYear.forEach(schoolRow => {
        if (schoolRow) {
            const schoolName = schoolRow._name;
            const schoolYear = schoolRow._schoolYear;
            const maleCount = schoolRow._male;
            const femaleCount = schoolRow._female;
            const malePercentage = (
                (maleCount / (maleCount + femaleCount)) *
                100
            ).toFixed(2);
            const femalePercentage = (
                (femaleCount / (maleCount + femaleCount)) *
                100
            ).toFixed(2);

            let thisSchoolData = {};
            let schoolDataArray = [
                {
                    id: "Male",
                    value: maleCount,
                    percentage: malePercentage,
                    color: "#222C49",
                    label: "Male"
                },
                {
                    id: "Female",
                    value: femaleCount,
                    percentage: femalePercentage,
                    color: "#FE8126",
                    label: "Female"
                }
            ];
            thisSchoolData.schoolName = schoolName;
            thisSchoolData.dataArray = schoolDataArray;
            thisSchoolData.schoolYear = schoolYear;
            chartData.push(thisSchoolData);
        }

    });

    return chartData;
}


const margin = { top: 30, right: 200, bottom: 30, left: 30 };

const styles = {
    root: {
        fontFamily: "consolas, sans-serif",
        textAlign: "center",
        position: "relative",
        width: 250,
        height: 300
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: margin.right,
        bottom: 0,
        left: margin.left,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 30,
        color: "#FFFFFF",
        // background: "#FFFFFF33",
        textAlign: "center",
        // This is important to preserve the chart interactivity
        pointerEvents: "none"
    },
    totalLabel: {
        fontSize: 24
    },
    genderChartsParent: {
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

export default GenderChart;
