import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Uploader from "./uploader";

export function Chat(props) {
    const chatMessages = useSelector(state => state && state.chatMessages);
    const chatMessage = useSelector(state => state && state.chatMessage);
    const chatImage = useSelector(state => state && state.chatImage);

    console.log("here are my last10 messages", chatMessages);

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
            <h1>Check news, updates and discuss important matters</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(message => (
                        <div key={message.id}>
                            <div className="chat-message" ref={elemRef}>
                                <p className="chat-identification">
                                    {message.first} {message.last}
                                </p>
                                <p>{message.message}</p>
                            </div>

                            <img src={message.chatimageid} />
                        </div>
                    ))}
            </div>
            <textarea
                className="addMessage"
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            ></textarea>
            <button className="firstBtn" onClick={() => props.onClick("chat")}>
                Upload
            </button>
        </div>
    );
}
