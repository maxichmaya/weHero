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
        <div>
            <section className="projects-container">
                <div className="projects-left">
                    <button
                        className="upbtn"
                        onClick={() => setCommunity(true)}
                    >
                        COMMUNITY
                    </button>
                </div>
                <div className="projects-right">
                    <button
                        className="downbtn"
                        onClick={() => setIndividual(true)}
                    >
                        INDIVIDUAL
                    </button>
                </div>
            </section>

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
