import React from "react";

function UploadData(props) {
    return (
        <div>
            <h3>Cilck here to upload your new data file!</h3>
            <div><input type="file" onChange={event =>
                optionChangeHandler(props, event)
            } /></div>
        </div>
    );
}
export default UploadData;

function optionChangeHandler(props, event) {
    console.log(event.target.files[0])
}