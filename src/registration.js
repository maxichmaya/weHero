import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
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
    // SUBMIT THE REGISTRATION
    submit(e) {
        axios
            .post("/welcome", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log("data: ", data);
                if (data.success) {
                    location.replace("/");
                    // give newUser a cookie
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
            <div className="inputDeco">
                <div>
                    {this.state.error && (
                        <div className="error">Ups...something went wrong!</div>
                    )}
                </div>
                <input
                    className="custom"
                    name="first"
                    placeholder="first name"
                    onChange={e => this.handleChange(e)}
                />{" "}
                <br />
                <input
                    className="custom"
                    name="last"
                    placeholder="last name"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <input
                    className="custom"
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <input
                    className="custom"
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <button className="firstBtn" onClick={e => this.submit(e)}>
                    {" "}
                    register{" "}
                </button>{" "}
                <br />
                <Link to="/login" className="loginDeco">
                    Login!
                </Link>
            </div>
        );
    }
}
