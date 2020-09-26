import React from "react";
import { functions } from "@/firebase/init";

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

async function optionChangeHandler(props, event) {
    const test = await functions.httpsCallable("uploadFile")({ file: event.target.files[0] });
    console.log(test);
}