import React from 'react';
import Select from 'react-select';

// const options = [
//     { value: 's1', label: 'School 1' },
//     { value: 's2', label: 'School 2' },
//     { value: 's3', label: 'School 3' },
//     { value: 'd1', label: 'District 1' },
//     { value: 'd2', label: 'District 2' }
// ];

function getSchools(schoolData) {
    let schools = new Set();
    for (let schoolRow of schoolData) {
        if (parseInt(schoolRow['FEMALE']) && parseInt(schoolRow['MALE']))
            schools.add(schoolRow['SCH_NAME']);
    }

    return schools;
}

function createSchoolOptions(schoolSet) {
    let optionList = [];
    let i = 0;
    for (let schoolName of schoolSet) {
        optionList = optionList.concat({
            value: i,
            label: schoolName
        });
        i++;
    }
    return optionList;
}

// function handleOptionsChange(selectedOptions) {
//     console.log(selectedOptions);
// }


function SchoolDistrictFilter(props) {

    // console.log('recieved school data' + props.data);
    // console.log(this.props.data);
    const schools = getSchools(props.data);
    const schoolOptions = createSchoolOptions(schools);

    // console.log(schools);


    return (
        <div style={{ display: 'flex', 'flexDirection': 'column' }}>
            <div style={{ padding: '10px' }}>
                Select School / District to compare
                </div>
            <div>
                <Select
                    options={schoolOptions}
                    isMulti
                    onChange={(selectedOptions) => props.onOptionsChange(selectedOptions)}
                />
            </div>
        </div>
    );
}

export default SchoolDistrictFilter;
