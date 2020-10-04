import React, { Component } from "react";
import firebase from "firebase/app";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        const { email, password } = this.state;
        // await functions.httpsCallable("signUp")({
        //     email: email,
        //     password: password
        // });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                return console.log("submitted user!")
            })
            .catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                alert(errorMessage);

            });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>

            </div>


        );
    }
}