import React from "react";
import { ResponsivePie } from "@nivo/pie";

/**
 * Main class component
 * @param {*} props
 */
function GenderChart(props) {
    const schoolDataArray = getGenderForSchool(props.schoolData, props.options);
    console.log("chart data: ");
    console.log(schoolDataArray);

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

        const maleCount = parseInt(schoolRow["MALE"]);
        const femaleCount = parseInt(schoolRow["FEMALE"]);
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
        chartData.push(thisSchoolData);
    });

    console.log("gender chart");
    console.log(chartData);
    return chartData;
}

const pieChartParentDivStyle = {
    height: "300px",
    width: "25%",
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
        heading.push(<h3 key={"gender-heading"}>Gender</h3>);
        pieCharts = heading.concat(pieCharts);
    }

    return pieCharts;
}

function getTooltipHTML(data) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                {data.label}: {data.value}
            </div>
            <div>Percentage: {data.percentage}%</div>
        </div>
    );
}

export default GenderChart;
