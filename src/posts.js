import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

console.log("this is my new component");

export function Wallpost(otherProfileId) {
    console.log("what are props?:", otherProfileId);

    const [newpost, setNewpost] = useState();

    console.log("newpost", newpost);

    useEffect(() => {
        async function showWallpost() {
            const { data } = await axios.get(
                `/wallpostroute/${otherProfileId.otherProfileId}`
            );
            console.log("this is my data for wallpost", data);
            setNewpost(data);
        }
        showWallpost();
    }, []);

    let wallpost;

    const keyCheck = async function(e) {
        wallpost = e.target.value;
        // console.log("e.target.value: ", e.target.value);
        console.log("e.key: ", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            const data = await axios.post("/wallpostroute", {
                wallpost: wallpost,
                id: otherProfileId.otherProfileId
            });

            console.log("DATA FROM SERVER:", data);
            if (data.data.success) {
                setNewpost([
                    ...newpost,
                    {
                        first: otherProfileId.first,
                        last: otherProfileId.last,
                        imageid: otherProfileId.imageid,
                        wallpost: wallpost,
                        id: data.data.id
                    }
                ]);
            }
        }
    };
    console.log("is this working");
    return (
        <div className="wallpost-container">
            <h1>WRITE ME SOMETHING</h1>
            <div className="chat-area">
                {newpost &&
                    newpost.map(message => (
                        <div className="wallparent" key={message.id}>
                            <div className="wallpost-sender-info">
                                <img
                                    className="chat-identification"
                                    src={message.imageid || "/3.png"}
                                    alt={`${message.first} ${message.last}`}
                                />
                                <p className="chat-identification2">
                                    {message.first} {message.last}{" "}
                                </p>
                                <p className="wallpostOnScreen">
                                    {message.wallpost}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="enterWallpost-container">
                <input
                    className="enterWallpost"
                    name="name"
                    placeholder="Enter new post"
                    onKeyDown={keyCheck}
                />
            </div>
        </div>
    );
}
