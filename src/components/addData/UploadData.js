import React from "react";
import { functions } from "../../firebase/init";
import * as firebase from "firebase/app";

function UploadData(props) {
    return (
        <div>
            <h3>Cilck here to upload your new data file!</h3>
            <div><input type="file" onChange={event =>
                optionChangeHandler(props, event)
            } /></div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
export default UploadData;

async function logout() {
    await firebase.auth().signOut();
}

async function optionChangeHandler(props, event) {
    //await functions.httpsCallable("uploadFile")({ file: event.target.files[0] });
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        functions
            .httpsCallable("uploadFile")({
                file: reader.result.split(",")[1],
                type: file.type
            });
    };
}