import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // GETTING INPUT FIELDS VALUE
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    // SUBMIT THE LOGIN
    submit(e) {
        console.log("submit function get reply");
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(function(err) {
                console.log("error in post welcome: ", error);
            });
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.error && (
                        <div className="error">Ups...something went wrong!</div>
                    )}
                </div>
                <input
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <button className="firstBtn" onClick={e => this.submit(e)}>
                    {" "}
                    register{" "}
                </button>
            </div>
        );
    }
}
