import React from "react";
import { ResponsivePie } from "nivo";

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
                    maleCount /
                    (maleCount + femaleCount)
                ).toFixed(2);
                const femalePercentage = (
                    femaleCount /
                    (maleCount + femaleCount)
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
                color: "red"
            },
            {
                id: "female",
                value: row.female,
                percentage: row.femalePercentage,
                color: "blue"
            }
        ];
    });
    // console.log("by school: ");
    // console.log(genderDataBySchool);
    let pieCharts = [];
    for (let schoolName in genderDataBySchool) {
        const schoolData = genderDataBySchool[schoolName];
        console.log("schoolData");
        console.log(schoolData);
        // let chartMargin = {

        // }
        pieCharts.push(
            <div key={schoolName} style={pieChartParentDivStyle}>
                <div style={{ height: "90%", flexGrow: "1" }}>
                    <ResponsivePie
                        key={schoolName}
                        // isInteractive={true}
                        data={schoolData}
                        enableSliceLabels={false}
                        // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        tooltip={data => {
                            console.log("aka2 : " + data);
                            // console.log("aka : " + id + value + color);
                            return (
                                <strong>
                                    {data.id}: {data.value}
                                </strong>
                            );
                        }}
                        // theme={{
                        //     tooltip: {
                        //         container: {
                        //             background: "#333"
                        //         }
                        //     }
                        // }}
                        enableRadialLabels={false}
                    />
                </div>
                <div style={{ flexGrow: "1" }}>{schoolName}</div>
            </div>
        );
    }

    return pieCharts;
}

export default GenderChart;
