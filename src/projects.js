import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Community from "./community";
import Individual from "./individual";

export default function Projects() {
    const [community, setCommunity] = useState(false);
    const [individual, setIndividual] = useState(false);
    console.log("WHAT IS COOMUNITY?", community);
    useEffect(() => {}, []);
    return (
        <div className="row">
            <div className="col">
                <div className="leftside">
                    <button
                        className="leftbtn"
                        onClick={() => setCommunity(true)}
                    >
                        COMMUNITY
                    </button>
                </div>
                <div className="rightside">
                    <button
                        className="rightbtn"
                        onClick={() => setIndividual(true)}
                    >
                        INDIVIDUAL
                    </button>
                </div>
            </div>

            {community && (
                <div className="communityPop">
                    <div>
                        <Community clickHandle={() => setCommunity(false)} />
                    </div>
                </div>
            )}

            {individual && (
                <div className="individualPop">
                    <div>
                        <Individual clickHandle={() => setIndividual(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
