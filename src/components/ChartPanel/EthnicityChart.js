import React from 'react';
import {
    PieChart, Pie, Tooltip,
} from 'recharts';


/**
 * return array: x->schoolName, male, female
 */
function getGroupedEthnicData(allData, options, ethnicityAcronymList) {
    let chartData = {};
    ethnicityAcronymList.forEach((ethnicityObj) => {
        let count = allData.filter((schoolObj) => {
            if (schoolObj[ethnicityObj.id]) {
                return true;
            }
            return false;
        }).reduce((total, count) => {
            return total + count;
        }, 0);

        chartData[ethnicityObj.id] = count;
    });
    console.log(chartData);
    return chartData;
}

function EthnicityChart(props) {

    const ethnicityAcronyms = [
        {
            id: 'AA',
            desc: 'African American'
        }, {
            id: 'AS',
            desc: 'Asian'
        }, {
            id: 'HI',
            desc: 'Hispanic'
        }, {
            id: 'MR',
            desc: 'Multiracial'
        }, {
            id: 'NA',
            desc: 'NA'
        }, {
            id: 'NH_PI',
            desc: 'Native Hawaiian and Pacific Islander'
        }, {
            id: 'WH',
            desc: 'White'
        }
    ];



    console.log(props);
    const chartData = getGroupedEthnicData(props.schoolData, props.options, ethnicityAcronyms);
    // console.log("chart data: ")
    // console.log(chartData);

    const femaleCount = chartData.reduce((sum, school) => sum + school.female, 0);
    const maleCount = chartData.reduce((sum, school) => sum + school.male, 0);
    console.log("male: " + maleCount + " female: " + femaleCount);
    const genderData = [{ name: 'male', value: maleCount }, { name: 'female', value: femaleCount }];


    return (
        <PieChart width={400} height={400}>
            <Pie data={genderData} dataKey="value" nameKey="name" cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
            {/* <Pie dataKey="female" data={maleCount} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
            <Tooltip />
        </PieChart>
    );
}

export default EthnicityChart;