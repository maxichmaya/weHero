import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export function Projects() {
    const [community, setCommunity] = useState();
    const [individual, setIndividual] = useState();

    useEffect(() => {});
    return (
        <div className="row">
            <div className="col">
                <div className="leftside">
                    <button onClick={() => setCommunity()}>COMMUNITY</button>
                </div>
                <div className="rightside">
                    <button onClick={() => setIndividual()}>INDIVIDUAL</button>;
                </div>
            </div>
        </div>
    );
}

//planing to use hooks and transitions on this part how I consider this second the most important component of the app....so far

//donationButton will go here

//
//
