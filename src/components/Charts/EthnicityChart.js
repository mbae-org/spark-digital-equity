import React from "react";
import { ResponsivePie } from "@nivo/pie";
// import { EntityType, EthnicityAcronymList } from "../../Constants";

/**
 * Main class component
 * @param {*} props
 */
function EthnicityChart(props) {


    const yearToSchoolArrayDataMap = props.yearToSchoolArrayDataMap;
    const dataYears = Object.keys(yearToSchoolArrayDataMap);
    let allYearPieCharts = [];

    dataYears.forEach(year => {
        const thisYearSchoolDataArray = getGroupedEthnicData(yearToSchoolArrayDataMap[year]);
        let thisYearPieCharts = createPieCharts(thisYearSchoolDataArray);

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
            <h3 key="ethnicityHeading">Ethnicity</h3>
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
function getGroupedEthnicData(schoolArrayForYear) {
    let chartData = [];
    schoolArrayForYear.forEach(schoolObj => {
        if (schoolObj) {
            const schoolName = schoolObj._name;
            let thisSchoolData = {};
            let schoolDataArray = [];

            schoolDataArray = schoolObj._ethnicity;

            // get percentage calculation out of total students that we consider
            let totalStudents = 0;
            schoolDataArray.forEach(element => (totalStudents += element.value));
            schoolDataArray.forEach(
                element =>
                    (element.percentage = (
                        (element.value / totalStudents) *
                        100
                    ).toFixed(2))
            );


            thisSchoolData.schoolName = schoolName;
            thisSchoolData.dataArray = schoolDataArray;
            chartData.push(thisSchoolData);
        }

    });

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

function createPieCharts(chartData) {
    let pieCharts = [];
    chartData.forEach((row) => {
        if (isNaN(row.dataArray[0].value)) {
            pieCharts.push(
                <div className="NoDataWrapper">
                    <div className="NoDataMessage">
                        <p>No Data Available</p>
                    </div>
                    <div style={{ flexGrow: "1" }}>{row.schoolName}</div>
                </div>
            )
        }
        else {
            pieCharts.push(
                <div key={row.schoolName} style={styles.root}>
                    <div style={{ height: "90%", flexGrow: "1" }}>
                        <ResponsivePie
                            key={row.schoolName}
                            colors={d => d.chartColor}
                            isInteractive={true}
                            data={row.dataArray}
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
                    <div style={{ flexGrow: "1" }}>{row.schoolName}</div>
                </div>
            );
        }
    });

    // if (pieCharts && pieCharts.length > 0) {
    //     const heading = [];
    //     heading.push(<h3 key="ethnicityHeading">Ethnicity</h3>);
    //     pieCharts = heading.concat(pieCharts);
    // }

    return pieCharts;
}

export default EthnicityChart;

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
