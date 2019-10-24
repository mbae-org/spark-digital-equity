import React from 'react';
import Select from 'react-select';

const options = [
    { value: 's1', label: 'School 1' },
    { value: 's2', label: 'School 2' },
    { value: 's3', label: 'School 3' },
    { value: 'd1', label: 'District 1' },
    { value: 'd2', label: 'District 2' }
]


function SchoolDistrictFilter() {
    return (
        <div>
            <Select
                options={options}
                isMulti
            />
        </div>
    );
}

export default SchoolDistrictFilter;
