import React, { Component } from "react";
import { functions } from "../../firebase/init";
import * as firebase from "firebase/app";

export default class UploadData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            uploaded: false,
            valid: true
        };
        this.logout = this.logout.bind(this);
        this.optionChangeHandler = this.optionChangeHandler.bind(this);
        this.submit = this.submit.bind(this);
    }

    async logout() {
        await firebase.auth().signOut();
    }

    async submit() {
        const { file } = this.state;
        console.log(file.type);
        if (file.type === "application/json") {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                await functions
                    .httpsCallable("uploadFile")({
                        file: reader.result.split(",")[1],
                        type: file.type
                    });
            };
            this.setState({ valid: true });
            this.setState({ uploaded: true });
        }
        else {
            this.setState({ valid: false });
        }

    }
    async optionChangeHandler(event) {
        this.setState({ file: event.target.files[0] })
    }
    render() {
        let { file, uploaded, valid } = this.state;
        return (
            <div>
                <h4>Cilck here to upload your new data file!</h4>
                { uploaded && <div> Your data is being processed, check back in 10 min</div>}
                { !valid && <p> Only proper json files are allowed, please make sure your data file is correct</p>}
                { !uploaded &&
                    <div><input type="file" onChange={event =>
                        this.optionChangeHandler(event)
                    } />
                        <div>
                            {
                                file &&
                                <button onClick={this.submit}>Submit File</button>
                            }
                            <button onClick={this.logout}>Logout</button>
                        </div>

                    </div>
                }
            </div>
        );
    }
}
