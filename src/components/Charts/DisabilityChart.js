import React from "react";
import { ResponsivePie } from "@nivo/pie";
// import School from "../../School";

/**
 * Main class component
 * @param {*} props
 */
function DisabilityChart(props) {

    const yearToSchoolArrayDataMap = props.yearToSchoolArrayDataMap;
    const dataYears = Object.keys(yearToSchoolArrayDataMap);
    let allYearPieCharts = [];

    dataYears.forEach(year => {
        const thisYearSchoolDataArray = getDisabilityData(yearToSchoolArrayDataMap[year]);
        let thisYearPieCharts = getPieCharts(thisYearSchoolDataArray);

        allYearPieCharts.push(
            <div key={year} style={styles.yearChartsParent}>
                <span>{year}</span>
                {thisYearPieCharts}
            </div>
        )
    });

    return (
        <div id="disability-pie-charts"
            style={styles.categoryChartsParent}
        >
            <h3 key="disabilityHeading">Students With Disability</h3>
            {allYearPieCharts}
        </div>
    );

}

/**
 * return array: x->schoolName, male, female
 */
function getDisabilityData(schoolArrayForYear) {
    let chartData = [];
    schoolArrayForYear.forEach(schoolObject => {
        const schoolName = schoolObject._name;
        const disabilityCount = schoolObject._studentsWithDisability;
        const totalCount = schoolObject._enrolled;
        const nonDisabilityCount = totalCount - disabilityCount;

        const disabilityPercentage = (
            (disabilityCount / totalCount) *
            100
        ).toFixed(2);
        const nonDisabilityPercentage = (
            (nonDisabilityCount / totalCount) *
            100
        ).toFixed(2);

        let thisSchoolData = {};
        let schoolDataArray = [
            {
                // id: "Students With Disability",
                id: "SWD",
                value: disabilityCount,
                percentage: disabilityPercentage,
                color: "#222C49",
                label: "Students With Disability"
            },
            {
                id: "Others",
                value: nonDisabilityCount,
                percentage: nonDisabilityPercentage,
                color: "#FE8126",
                label: "Others"
            }
        ];
        thisSchoolData.schoolName = schoolName;
        thisSchoolData.dataArray = schoolDataArray;
        chartData.push(thisSchoolData);
    });

    // console.log("disability chart");
    // console.log(chartData);
    return chartData;
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

function getPieCharts(schoolDataArray) {
    const dataLength = schoolDataArray.length;
    let pieCharts = [];

    schoolDataArray.forEach((row, index) => {
        const schoolName = row.schoolName;
        const schoolData = row.dataArray;
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
                        innerRadius={0.5}
                        margin={{ top: 40, right: 60, bottom: 40, left: 40 }}
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
                </div>
                <div style={{ flexGrow: "1" }}>{schoolName}</div>
            </div>
        );
    });

    // if (pieCharts && pieCharts.length > 0) {
    //     const heading = [];
    //     heading.push(
    //         <div key={"disability-heading"}>
    //             {/* <h3>Students With Disability</h3> */}
    //             <h3>Disability</h3>
    //         </div>
    //     );
    //     pieCharts = heading.concat(pieCharts);
    // }

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

export default DisabilityChart;
