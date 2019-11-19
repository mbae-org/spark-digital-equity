import React from "react";
import { ResponsivePie } from "nivo";

/**
 * return array: x->schoolName, male, female
 */
function getGenderForSchool(allData, options) {
    let chartData = [];
    for (let schoolName of options) {
        for (let schoolRow of allData) {
            if (schoolRow["SCH_NAME"] === schoolName.label) {
                chartData = chartData.concat({
                    name: schoolRow["SCH_NAME"],
                    female: parseInt(schoolRow["FEMALE"]),
                    male: parseInt(schoolRow["MALE"])
                });
            }
        }
    }
    // console.log(chartData);
    return chartData;
}

function GenderChart(props) {
    // console.log("props");
    // console.log(props);
    const chartData = getGenderForSchool(props.schoolData, props.options);
    // console.log("chart data: ");
    // console.log(chartData);

    let genderDataBySchool = {};
    chartData.forEach(function(row) {
        genderDataBySchool[row.name] = [
            { id: "male", value: row.male },
            { id: "female", value: row.female }
        ];
    });
    // console.log("by school: ");
    // console.log(genderDataBySchool);
    let pieCharts = [];
    for (let schoolName in genderDataBySchool) {
        const schoolData = genderDataBySchool[schoolName];
        // console.log("schoolData");
        // console.log(schoolData);
        // let chartMargin = {

        // }
        pieCharts.push(
            <div
                key={schoolName}
                style={{
                    height: "300px",
                    width: "25%",
                    flexGrow: "1",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <div style={{ height: "90%", flexGrow: "1" }}>
                    <ResponsivePie
                        // id={schoolName}
                        isInteractive={false}
                        data={schoolData}
                        // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        sliceLabel={function(e) {
                            return e.id + " (" + e.value + ")";
                        }}
                        enableRadialLabels={false}
                        legends={[
                            {
                                anchor: "bottom",
                                direction: "row",
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: "#999",
                                symbolSize: 18,
                                symbolShape: "circle",
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemTextColor: "#000"
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
                <div style={{ flexGrow: "1" }}>{schoolName}</div>
            </div>
        );
    }

    if (pieCharts && pieCharts.length > 0) {
        // console.log("this is pie");
        // console.log(pieCharts);
        const heading = [];
        heading.push(<h3>Gender</h3>);
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

export default GenderChart;
