import React from "react";
import Uploader from "./uploader";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";
import { Findpeople } from "./findpeople";
import Friends from "./friends";
import { Chat } from "./chat";
import { Wallpost } from "./posts";
import Transition from "react-transition-group/Transition";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
    }

    async componentDidMount() {
        const { data } = await axios.get("/user");
        // console.log("data:", data);
        // axios.get('/get-animal').then(resp => {
        this.setState(data);
    } //kraj mount

    render() {
        return (
            <div className="mainContainer">
                <BrowserRouter>
                    <div>
                        <div className="headerRow">
                            <div className="traka">
                                <p className="logoname">weHero</p>
                                <Link to="/chat">
                                    <p>News Feeds </p>
                                </Link>

                                <Link to="/projects">
                                    <p>Projects</p>
                                </Link>

                                <Link to="/findpeople">
                                    <p>Find people </p>
                                </Link>

                                <Link to="/">
                                    <p>My profile</p>
                                </Link>

                                <Link to="/login">
                                    <p>Logout</p>
                                </Link>
                            </div>

                            <ProfilePic
                                first={this.state.first}
                                last={this.state.last}
                                imageid={this.state.imageid}
                                onClick={() => {
                                    this.setState({ uploaderIsVisible: true });
                                }}
                            />
                        </div>
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                done={imageid =>
                                    this.setState({
                                        imageid,
                                        uploaderIsVisible: false
                                    })
                                }
                                onClick={() => {
                                    this.setState({ uploaderIsVisible: false });
                                }}
                            />
                        )}

                        <Route
                            exact
                            path="/"
                            render={props => {
                                return (
                                    <Profile
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageid={this.state.imageid}
                                        bio={this.state.bio}
                                        changeBio={bio =>
                                            this.setState({ bio: bio })
                                        }
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    {...props}
                                    key={props.match.url}
                                />
                            )}
                        />
                        <Route path="/findpeople" component={Findpeople} />
                        <Route path="/friends" component={Friends} />
                        <Route
                            path="/chat"
                            render={props => {
                                return (
                                    <Chat
                                        onClick={() => {
                                            this.setState({
                                                uploaderIsVisible: true
                                            });
                                        }}
                                    />
                                );
                            }}
                        />
                    </div>
                </BrowserRouter>
            </div>
        ); // end of return
    } // end of render
}
