import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers, beFriends, unFriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    const users = useSelector(
        state =>
            state.users && state.users.filter(users => users.accepted == true)
    );

    const wannabes = useSelector(
        state =>
            state.users &&
            state.users.filter(wannabes => wannabes.accepted == false)
    );

    useEffect(() => {
        dispatch(receiveUsers());
    }, []);
    if (!users) {
        return null;
    }

    if (!wannabes) {
        return null;
    }

    console.log("show me users:", users);
    console.log("show me wannabes:", wannabes);
    return (
        <div className="friends-container">
            <div className="amigos">
                <h1>MY TEAM</h1>
                {users &&
                    users.map(user => (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img
                                    className="newUsers"
                                    src={user.imageid || "/3.png"}
                                    alt={`${user.first} ${user.last}`}
                                />
                                <h3 className="newUsers">
                                    {user.first} {user.last}{" "}
                                </h3>
                            </Link>
                            <button
                                className="firstBtn"
                                onClick={e => dispatch(unFriend(user.id))}
                            >
                                No Team No More
                            </button>
                        </div>
                    ))}
            </div>
            <div className="amigos-wannabes">
                <h1>TEAM WANNABE</h1>
                {wannabes &&
                    wannabes.map(wannabes => (
                        <div key={wannabes.id}>
                            <Link to={`/user/${wannabes.id}`}>
                                <img
                                    className="newUsers"
                                    src={wannabes.imageid || "/3.png"}
                                    alt={`${wannabes.first} ${wannabes.last}`}
                                />
                                <h3 className="newUsers">
                                    {wannabes.first} {wannabes.last}{" "}
                                </h3>
                            </Link>
                            <button
                                className="firstBtn"
                                onClick={e => dispatch(beFriends(wannabes.id))}
                            >
                                Accept Team Up request
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}
