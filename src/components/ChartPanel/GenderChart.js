import React from "react";
import { ResponsivePie } from "@nivo/pie";
// import School from "../../School";

/**
 * Main class component
 * @param {*} props
 */
function GenderChart(props) {
    const schoolDataArray = getGenderForSchool(props.schoolData, props.options);

    let pieCharts = getPieCharts(schoolDataArray);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                height: "50%",
                width: "100%"
            }}
        >
            {pieCharts}
        </div>
    );
}

/**
 * return array: x->schoolName, male, female
 */
function getGenderForSchool(allData, options) {
    let chartData = [];
    options.forEach(schoolName => {
        const schoolRow = allData[schoolName];

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
                id: "male",
                value: maleCount,
                percentage: malePercentage,
                color: "orange",
                label: "Male"
            },
            {
                id: "female",
                value: femaleCount,
                percentage: femalePercentage,
                color: "blue",
                label: "Female"
            }
        ];
        thisSchoolData.schoolName = schoolName;
        thisSchoolData.dataArray = schoolDataArray;
        thisSchoolData.schoolYear = schoolYear;
        chartData.push(thisSchoolData);
    });

    return chartData;
}

const pieChartParentDivStyle = {
    height: "300px",
    width: "25%",
    minWidth: "250px",
    flexGrow: "1",
    display: "flex",
    flexDirection: "column"
};

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
    }
};

function getPieCharts(schoolDataArray) {
    const dataLength = schoolDataArray.length;
    let pieCharts = [];

    schoolDataArray.forEach((row, index) => {
        const schoolName = row.schoolName;
        const schoolData = row.dataArray;
        const schoolYear = row.schoolYear;
        console.log("school year: " + schoolYear);

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
                        margin={{ top: 40, right: 60, bottom: 40, left: 40 }}
                        innerRadius={0.5}
                        tooltip={data => {
                            return getTooltipHTML(data);
                        }}
                        legends={
                            index + 1 === dataLength
                                ? [
                                      {
                                          anchor: "top-right",
                                          direction: "column",
                                          itemWidth: 20,
                                          itemHeight: 20,
                                          translateY: 20,
                                          translateX: 20
                                          // symbolSize: 18,
                                          // symbolShape: "circle"
                                      }
                                  ]
                                : undefined
                        }
                    />
                    {/* <div style={styles.overlay}>
                        <span>{schoolYear}</span>
                    </div> */}
                </div>
                <div style={{ flexGrow: "1" }}>{schoolName}</div>
            </div>
        );
    });

    if (pieCharts && pieCharts.length > 0) {
        const heading = [];
        heading.push(<h3 key={"gender-heading"}>Gender</h3>);
        pieCharts = heading.concat(pieCharts);
    }

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
