import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export function Findpeople() {
    const [users, setWhoJoined] = useState();
    const [val, setVal] = useState();

    useEffect(() => {
        if (!val) {
            (async function checkFriends() {
                const { data } = await axios.get("/users");
                console.log("data", data);
                setWhoJoined(data);
            })();
        } else {
            (async () => {
                const { data } = await axios.post("/findnewfriend/", {
                    key: val
                });
                console.log("data:", data);
                setWhoJoined(data);
            })();
        }
    }, [val]);

    return (
        <div>
            <div className="findPeopleStyled">
                <h2>Find people</h2>
                <h4>Checkout who just joined the Hero's club</h4>
            </div>
            <div className="finderConatiner">
                {users &&
                    users.map(whoJoined => (
                        <div key={whoJoined.id}>
                            <Link to={`/user/${whoJoined.id}`}>
                                <img
                                    className="newUsers"
                                    src={whoJoined.imageid || "/3.png"}
                                    alt={`${whoJoined.first} ${whoJoined.last}`}
                                />
                                <h3 className="newUsers">
                                    {whoJoined.first} {whoJoined.last}{" "}
                                </h3>
                            </Link>
                        </div>
                    ))}
            </div>
            <div className="searchengine">
                <h4>Are you searching someone special?</h4>
                <input
                    name="name"
                    placeholder="Enter name"
                    onChange={e => setVal(e.target.value)}
                />
            </div>
        </div>
    );
}
