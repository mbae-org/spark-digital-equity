import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 400, pv: 2400, amt: 2400 }];
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
                    female: schoolRow['FEMALE'],
                    male: schoolRow['MALE']
                });
            }
        }

    }
    console.log(chartData);
    return chartData;
}

function ChartPanel(props) {
    console.log(props);
    const chartData = getGenderForSchool(props.schoolData, props.options);
    // const chartData = [];

    return (
        <BarChart width={800} height={400} data={chartData}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar type="monotone" dataKey="female" fill="#82ca9d" barSize={30} />
            <Bar type="monotone" dataKey="male" fill="#8884d8" barSize={30} />
        </BarChart>
    );
}

export default ChartPanel;