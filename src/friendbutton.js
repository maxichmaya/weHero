import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FriendButton(otherProfileId) {
    const [button, setButton] = useState();
    console.log("otherProfileId:", otherProfileId);

    useEffect(() => {
        console.log("trying to get data", otherProfileId);
        (async () => {
            try {
                console.log("about to succeed");
                const { data } = await axios.get(
                    `/friendship/${otherProfileId.otherProfileId}`
                );
                console.log("data in useEffect:", data);
                setButton(data.buttonText);
            } catch (err) {
                console.log("err in friendship use", err);
            }
        })();
    }, []);

    async function friendButton() {
        console.log("WHAT IS THE BUTTON", button);
        try {
            const { data } = await axios.post("/friendship/", {
                id: otherProfileId.otherProfileId,
                button: button
            });
            console.log("data u post:", data);
            setButton(data.buttonText);
            console.log("data.buttonText:", data.buttonText);
        } catch (err) {
            console.log("error in friendbutton post", err);
        }
    }

    return (
        <div>
            <button className="friendbtn" onClick={friendButton}>
                {button}
            </button>
        </div>
    );
}
