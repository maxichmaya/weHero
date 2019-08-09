import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";
import { Wallpost } from "./posts";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("this.state: ", this.props);
    }
    async componentDidMount() {
        console.log(this.props.match.params.id);
        const id = this.props.match.params.id;
        console.log("id:", id);
        const { data } = await axios.get(`/user/${id}.json`);
        if (data.user) {
            // this.props.history.push("/");
        }
        this.setState(data.user.rows[0]);
        console.log("WHO ARE YOU:", data.user.rows[0]);
    }
    render() {
        return (
            <div className="otherprofileAppearance">
                <div>
                    <img className="friendsPic" src={this.state.imageid} />
                </div>
                <FriendButton otherProfileId={this.props.match.params.id} />
                <Wallpost
                    otherProfileId={this.props.match.params.id}
                    first={this.props.first}
                    last={this.props.last}
                    imageid={this.props.imageid}
                />
                <div className="bioBox">
                    <h1 className="myNameIs">
                        {this.state.first} {this.state.last}
                    </h1>
                    <p className="bioBox2">{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
