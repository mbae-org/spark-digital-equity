import React from 'react';
import { ResponsivePie, Pie } from "nivo";


/**
 * return array: x->schoolName, male, female
 */
function getGenderForSchool(allData, options) {
    let chartData = [];
    for (let schoolName of options) {
        for (let schoolRow of allData) {
            if (schoolRow['SCH_NAME'] === schoolName.label) {
                chartData = chartData.concat({
                    name: schoolRow['SCH_NAME'],
                    female: parseInt(schoolRow['FEMALE']),
                    male: parseInt(schoolRow['MALE'])
                });
            }
        }

    }
    // console.log(chartData);
    return chartData;
}

function GenderChart2(props) {
    // console.log(props);
    const chartData = getGenderForSchool(props.schoolData, props.options);
    // console.log("chart data: ");
    // console.log(chartData);

    let genderDataBySchool = {};
    chartData.forEach(function (row) {
        genderDataBySchool[row.name] = [{ id: 'male', value: row.male }, { id: 'female', value: row.female }];
    });
    console.log("by school: ");
    console.log(genderDataBySchool);
    let pieCharts = [];
    for (let schoolName in genderDataBySchool) {
        const schoolData = genderDataBySchool[schoolName];
        console.log('schoolData');
        console.log(schoolData);
        pieCharts.push(
            <div style={{ height: '100px', width: '100px' }}>
                <ResponsivePie
                    data={schoolData}
                />
            </div>
        );
    }
    console.log(pieCharts);


    return (
        <div style={{ display: 'flex', flexDirection: "row" }} >
            {pieCharts}
        </div >
    );
}

export default GenderChart2;