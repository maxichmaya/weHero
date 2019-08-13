import React from "react";
import axios from "./axios";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick(e) {
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append("file", file);
        console.log("this.props.whocalledme:", this.props.whocalledme);

        if (this.props.whocalledme == "chat") {
            axios.post("/uploader/chat", formData).then(results => {
                socket.emit("new upload", results.data.imageid);
            });
            console.log("ARE YOU THE IMAGE I WANT??", data.imageid);
        } else {
            axios
                .post("/uploader/profile", formData)
                .then(results => {
                    this.props.done(results.data.imageid);
                })
                .catch(err => {
                    console.log("updateFailed", err);
                });
        }
    }

    clickButton(e) {
        this.props.onClick();
    }

    render() {
        return (
            <div className="aroundUploader">
                <div className="uploaderPic">
                    <button className="btn" onClick={e => this.clickButton(e)}>
                        X
                    </button>

                    <input
                        className="file"
                        type="file"
                        name="file"
                        onChange={e => this.handleClick(e)}
                    />
                </div>
            </div>
        );
    }
} //end of uploader class
