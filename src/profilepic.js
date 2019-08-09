import React from "react";

export default function({ first, last, imageid, onClick }) {
    imageid = imageid || "/3.png";
    return (
        <img
            className="littlepic"
            src={imageid}
            alt={`${first} ${last}`}
            onClick={onClick}
        />
    );
}
