import React from "react";
import { ResponsivePie } from "@nivo/pie";
// import School from "../../School";

/**
 * Main class component
 * @param {*} props
 */
function EconDisChart(props) {
    const schoolDataArray = getEconDisForSchool(
        props.schoolData,
        props.options
    );

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
function getEconDisForSchool(allData, options) {
    let chartData = [];
    options.forEach(schoolName => {
        const schoolObject = allData[schoolName];

        const disadvantagedCount = schoolObject._economicallyDisadvantaged;
        const totalCount = schoolObject._enrolled;
        const nonDisadvantagedCount = totalCount - disadvantagedCount;

        const disadvantagedPercentage = (
            (disadvantagedCount / totalCount) *
            100
        ).toFixed(2);
        const nonDisadvantagedPercentage = (
            (nonDisadvantagedCount / totalCount) *
            100
        ).toFixed(2);

        let thisSchoolData = {};
        let schoolDataArray = [
            {
                id: "economicallyDisadvantaged",
                value: disadvantagedCount,
                percentage: disadvantagedPercentage,
                color: "orange",
                label: "Economically Disadvantaged"
            },
            {
                id: "Others",
                value: nonDisadvantagedCount,
                percentage: nonDisadvantagedPercentage,
                color: "blue",
                label: "Others"
            }
        ];
        thisSchoolData.schoolName = schoolName;
        thisSchoolData.dataArray = schoolDataArray;
        chartData.push(thisSchoolData);
    });

    // console.log("econ dis chart");
    // console.log(chartData);
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

function getPieCharts(schoolDataArray) {
    const dataLength = schoolDataArray.length;
    let pieCharts = [];

    schoolDataArray.forEach((row, index) => {
        const schoolName = row.schoolName;
        const schoolData = row.dataArray;
        pieCharts.push(
            <div key={schoolName} style={pieChartParentDivStyle}>
                <div style={{ height: "90%", flexGrow: "1" }}>
                    <ResponsivePie
                        key={schoolName}
                        colors={d => d.color}
                        isInteractive={true}
                        data={schoolData}
                        sortByValue={true}
                        enableSlicesLabels={false}
                        enableRadialLabels={false}
                        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
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
                                          translateY: 20
                                          // symbolSize: 18,
                                          // symbolShape: "circle"
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

    if (pieCharts && pieCharts.length > 0) {
        const heading = [];
        heading.push(
            <h3 key={"econdis-heading"}>Economically Disadvantaged</h3>
        );
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

export default EconDisChart;
