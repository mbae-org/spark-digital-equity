import React from "react";
import { ResponsivePie } from "nivo";

function EthnicityChart(props) {
    const ethnicityAcronyms = [
        {
            id: "AA",
            desc: "African American"
        },
        {
            id: "AS",
            desc: "Asian"
        },
        {
            id: "HI",
            desc: "Hispanic"
        },
        {
            id: "MR",
            desc: "Multiracial"
        },
        {
            id: "NA",
            desc: "NA"
        },
        {
            id: "NH_PI",
            desc: "Native Hawaiian and Pacific Islander"
        },
        {
            id: "WH",
            desc: "White"
        }
    ];

    // console.log(props);
    const chartData = getGroupedEthnicData(
        props.schoolData,
        props.options,
        ethnicityAcronyms
    );
    // console.log("chart data: ");
    // console.log(chartData);

    const pieCharts = createPieCharts(chartData);
    console.log("pieCharts");
    console.log(pieCharts);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                width: "100%"
            }}
        >
            {pieCharts}
        </div>
    );
}

/**
 * return array->[schoolName, array[schoolData]]
 * ignoring zero values
 */
function getGroupedEthnicData(allData, options, ethnicityAcronymList) {
    // console.log("options");
    // console.log(options);
    let chartData = [];
    options.forEach(schoolName => {
        const schoolObj = allData[schoolName];
        let thisSchoolData = {};
        let schoolDataArray = [];
        ethnicityAcronymList.forEach(ethnicityObj => {
            if (schoolObj[ethnicityObj.id] > 0) {
                schoolDataArray.push({
                    id: ethnicityObj.id,
                    value: schoolObj[ethnicityObj.id]
                });
            }
        });
        thisSchoolData.schoolName = schoolName;
        thisSchoolData.dataArray = schoolDataArray;
        chartData.push(thisSchoolData);
    });

    return chartData;
}

function createPieCharts(chartData) {
    let pieCharts = [];
    chartData.forEach(row => {
        pieCharts.push(
            <div
                key={row.schoolName}
                style={{
                    height: "300px",
                    width: "25%",
                    minWidth: "300px",
                    flexGrow: "1",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <div style={{ height: "90%", flexGrow: "1" }}>
                    <ResponsivePie
                        id={row.schoolName}
                        // isInteractive={false}
                        data={row.dataArray}
                        // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        sliceLabel={function(e) {
                            return e.id + " (" + e.value + ")";
                        }}
                        enableRadialLabels={true}
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
                                            itemTextColor: "#1243"
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
                <div style={{ flexGrow: "1" }}>{row.schoolName}</div>
            </div>
        );
    });

    if (pieCharts && pieCharts.length > 0) {
        // console.log("this is pie");
        // console.log(pieCharts);
        const heading = [];
        heading.push(<h3>Ethnicity</h3>);
        pieCharts = heading.concat(pieCharts);
    }

    return pieCharts;
}

export default EthnicityChart;
