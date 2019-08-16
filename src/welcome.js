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
                    <div className="intro">
                        <h1 className="logoNameStart">Bridge</h1>
                        <h5>
                            ...here to connect <br /> and make the world a
                            better place
                        </h5>
                    </div>

                    <div className="homepage-hero-module">
                        <div className="video-container">
                            <div className="filter"></div>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                src="/video/Hanging-There.mp4"
                                className="fillWidth"
                            ></video>
                        </div>
                    </div>

                    <div className="registration">
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
