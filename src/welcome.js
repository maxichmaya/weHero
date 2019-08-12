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
                <div>
                    <h1 className="logoNameStart">weHero</h1>
                    <h4>here I will put a text about us</h4>
                    <div className="registration">
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
