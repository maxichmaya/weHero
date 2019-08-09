import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    newBio(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log("e.target.value: ", e.target.value);
    }

    submit(e) {
        axios
            .post("/bio", {
                bio: this.state.bio
            })
            .then(({ data }) => {
                console.log("data: ", data);
                this.props.changeBio(data);
                this.setState({
                    editing: false
                });
            });
    }
    render() {
        return (
            <div className="grandfather">
                {this.props.bio && (
                    <div>
                        <p className="bioAdd">{this.props.bio}</p>
                        <button
                            className="bioEdit"
                            onClick={() => this.setState({ editing: true })}
                        >
                            Edit bio
                        </button>
                    </div>
                )}
                {this.state.editing && (
                    <div className="bioBox">
                        <textarea
                            defaultValue={this.props.bio}
                            onChange={e => this.newBio(e)}
                            name="bio"
                        />
                        <button
                            className="savebtn"
                            onClick={() => this.submit()}
                        >
                            Save
                        </button>
                    </div>
                )}

                {!this.props.bio && (
                    <button
                        className="addbtn"
                        onClick={e => this.setState({ editing: true })}
                    >
                        Add bio
                    </button>
                )}
            </div>
        );
    }
}
