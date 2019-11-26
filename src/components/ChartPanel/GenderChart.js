import React from "react";
import { ResponsivePie } from "@nivo/pie";

function GenderChart(props) {
    // console.log("props");
    // console.log(props);
    const schoolDataArray = getGenderForSchool(props.schoolData, props.options);
    // console.log("chart data: ");
    // console.log(chartData);

    let pieCharts = getPieCharts(schoolDataArray);

    if (pieCharts && pieCharts.length > 0) {
        // console.log("this is pie");
        // console.log(pieCharts);
        const heading = [];
        heading.push(<h3 key={"gender-heading"}>Gender</h3>);
        pieCharts = heading.concat(pieCharts);
    }
    // console.log(pieCharts);

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
    for (let schoolName of options) {
        for (let schoolRow of allData) {
            if (schoolRow["SCH_NAME"] === schoolName.label) {
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
                chartData = chartData.concat({
                    name: schoolRow["SCH_NAME"],
                    female: femaleCount,
                    male: maleCount,
                    malePercentage: malePercentage,
                    femalePercentage: femalePercentage
                });
            }
        }
    }
    // console.log(chartData);
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
    let genderDataBySchool = {};
    schoolDataArray.forEach(function(row) {
        genderDataBySchool[row.name] = [
            {
                id: "male",
                value: row.male,
                percentage: row.malePercentage,
                color: "orange",
                label: "Male"
            },
            {
                id: "female",
                value: row.female,
                percentage: row.femalePercentage,
                color: "blue",
                label: "Female"
            }
        ];
    });

    // console.log("by school: ");
    // console.log(genderDataBySchool);
    let pieCharts = [];
    for (let schoolName in genderDataBySchool) {
        const schoolData = genderDataBySchool[schoolName];
        // let chartMargin = {

        // }
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
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        tooltip={data => {
                            return getTooltipHTML(data);
                        }}
                        legends={[
                            {
                                anchor: "bottom",
                                direction: "row",
                                itemWidth: 100,
                                itemHeight: 10,
                                translateY: 20
                                // symbolSize: 18,
                                // symbolShape: "circle"
                            }
                        ]}
                    />
                </div>
                <div style={{ flexGrow: "1" }}>{schoolName}</div>
            </div>
        );
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
