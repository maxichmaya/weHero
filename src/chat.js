import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    const chatMessage = useSelector(state => state && state.chatMessage);

    // console.log("here are my last10 messages", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        socket.emit("show new messages");
    }, []);

    const keyCheck = e => {
        // console.log("e.target.value: ", e.target.value);
        // console.log("e.key: ", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            // console.log("Enter was pressed!");
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div className="chat">
            <h1>Chat Room </h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(message => (
                        <div key={message.id}>
                            <div className="chat-message" ref={elemRef}>
                                <img
                                    className="chat-identification"
                                    src={message.imageid || "/3.png"}
                                    alt={`${message.first} ${message.last}`}
                                />
                                <p className="chat-identification">
                                    {message.first} {message.last}{" "}
                                </p>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    ))}
            </div>
            <textarea
                className="addMessage"
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
