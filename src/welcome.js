// function component
import Registration from "./registration";
import React from "react";
import axios from "./axios";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <HashRouter>
                <div className="registration">
                    <h3>Welcome to</h3>
                    <img className="logo" src="giphy.gif" />
                    <h1 className="logoNameStart">SIMPLICITY</h1>
                    <h4>...first social network for children</h4>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
