import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick(e) {
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append("file", file);

        axios
            .post("/uploader", formData)
            .then(results => {
                this.props.done(results.data.imageid);
            })
            .catch(err => {
                console.log("updateFailed", err);
            });
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
                    <h2> Do you wanna change your pic? </h2>
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
