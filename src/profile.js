import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import { Wallpost } from "./posts";

export default function Profile(props) {
    console.log("WHAT ARE PROPS?", props);
    return (
        <div className="profile">
            <ProfilePic
                first={props.first}
                last={props.last}
                imageid={props.imageid}
                onClick={props.onClick}
            />
            <p className="myNameIs">
                {props.first} {props.last}
            </p>

            <BioEditor bio={props.bio} changeBio={props.changeBio} />
        </div>
    );
}
