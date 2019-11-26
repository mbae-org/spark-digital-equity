import React from "react";
import SchoolDistrictFilter from "../Filters/SchoolDistrictFilter";
import PrimaryGraphsChoose from "../Filters/PrimaryGraphsChoose";

function FilterPanel(props) {
    // console.log('panel recieved school data' + props.data);

    return (
        <div>
            <h3 style={{ margin: "10px 0 10px 0" }}>
                Select filters below to view a graph
            </h3>
            <div
                className="filter-container"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <div>
                    <SchoolDistrictFilter
                        data={props.data}
                        onOptionsChange={selectedOptions =>
                            props.onSchoolFilterChange(selectedOptions)
                        }
                    ></SchoolDistrictFilter>
                </div>
                <div>
                    <PrimaryGraphsChoose
                        selectedFilters={props.selectedFilters}
                        onSelectionChange={newSelection =>
                            props.onGraphSelectionChange(newSelection)
                        }
                    />
                </div>
                {/* <div>Filter 2</div>
        <div>Filter 3</div>
        <div>Filter 4</div> */}
                <div>
                    <button onClick={props.onSearchClick}>Search</button>
                </div>
            </div>
        </div>
    );
}

export default FilterPanel;
