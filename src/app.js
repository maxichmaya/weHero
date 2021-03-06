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
import Projects from "./projects";
import Kenya from "./kenya";
import { AnimatedSwitch } from "react-router-transition";

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
                                <p className="logoname">Bridge</p>

                                <Link to="/">
                                    <p> We in Kenya</p>
                                </Link>

                                <Link to="/projects">
                                    <p>Projects</p>
                                </Link>

                                <Link to="/chat">
                                    <p>News</p>
                                </Link>

                                <Link to="/profile">
                                    <p>My Profile</p>
                                </Link>

                                <Link to="/friends">
                                    <p>Contacts</p>
                                </Link>

                                <Link to="/findpeople">
                                    <p>Find People</p>
                                </Link>
                            </div>

                            <ProfilePic
                                first={this.state.first}
                                last={this.state.last}
                                imageid={this.state.imageid}
                                onClick={() => {
                                    this.setState({
                                        uploaderIsVisible: true,
                                        whocalledme: null
                                    });
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
                                onClick={whocalledme => {
                                    console.log("who called me:", whocalledme);
                                    this.setState({
                                        uploaderIsVisible: false
                                    });
                                }}
                                whocalledme={this.state.whocalledme}
                            />
                        )}
                        <AnimatedSwitch
                            atEnter={{ opacity: 0 }}
                            atLeave={{ opacity: 0 }}
                            atActive={{ opacity: 1 }}
                            className="switch-wrapper"
                        >
                            <Route
                                exact
                                path="/profile"
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
                            <Route path="/projects" component={Projects} />
                            <Route exact path="/" component={Kenya} />
                            <Route path="/friends" component={Friends} />

                            <Route
                                path="/chat"
                                render={props => {
                                    return (
                                        <Chat
                                            onClick={whocalledme => {
                                                console.log(
                                                    "who called me?",
                                                    whocalledme
                                                );
                                                this.setState({
                                                    uploaderIsVisible: true,
                                                    whocalledme: whocalledme
                                                });
                                            }}
                                        />
                                    );
                                }}
                            />
                        </AnimatedSwitch>
                    </div>
                </BrowserRouter>
            </div>
        ); // end of return
    } // end of render
}
