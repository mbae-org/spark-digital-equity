import React from 'react';
import {
    PieChart, Pie, Tooltip, ResponsiveContainer
} from 'recharts';

// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 400, pv: 2400, amt: 2400 }];
// const data2 = '../../../2016.json';
// console.log(data2);

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

function GenderChart(props) {
    console.log(props);
    const chartData = getGenderForSchool(props.schoolData, props.options);
    console.log("chart data: ")
    console.log(chartData);

    let genderDataBySchool = {};
    chartData.forEach(function (row) {
        genderDataBySchool[row.name] = [{ name: 'male', value: row.male }, { name: 'female', value: row.female }];
    });
    console.log(genderDataBySchool);
    let pieCharts = [];
    for (let schoolName in genderDataBySchool) {
        let schoolData = genderDataBySchool[schoolName];
        pieCharts.push(
            <div>
                <ResponsiveContainer width='100%' height={200}>
                    <PieChart
                    >
                        <Pie data={schoolData} dataKey="value" nameKey="name" cx='50%' cy='50%' outerRadius={100} fill="#8884d8" label key={schoolName} />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
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

export default GenderChart;