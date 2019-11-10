// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import React from 'react';
import {
    PieChart, Pie, Tooltip,
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

function ChartPanel(props) {
    console.log(props);
    const chartData = getGenderForSchool(props.schoolData, props.options);
    console.log("chart data: ")
    console.log(chartData);

    const femaleCount = chartData.reduce((sum, school) => sum + school.female, 0);
    const maleCount = chartData.reduce((sum, school) => sum + school.male, 0);
    // const femalePercentage = parseFloat(femaleCount / (femaleCount + maleCount)).toFixed(2);
    // const malePercentage = parseFloat(maleCount / (femaleCount + maleCount)).toFixed(2);
    console.log("male: " + maleCount + " female: " + femaleCount);
    const genderData = [{ name: 'male', value: maleCount }, { name: 'female', value: femaleCount }];

    // const chartData = [];

    return (
        // <BarChart width={800} height={400} data={chartData}>
        //     <XAxis dataKey="name" stroke="#8884d8" />
        //     <YAxis />
        //     <Tooltip />
        //     <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        //     <Bar type="monotone" dataKey="female" fill="#82ca9d" barSize={30} />
        //     <Bar type="monotone" dataKey="male" fill="#8884d8" barSize={30} />
        // </BarChart>
        <PieChart width={400} height={400}>
            <Pie data={genderData} dataKey="value" nameKey="name" cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
            {/* <Pie dataKey="female" data={maleCount} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
            <Tooltip />
        </PieChart>
    );
}

export default ChartPanel;