import axios from "./axios";

export async function receiveUsers() {
    console.log("soon my first action");
    const { data } = await axios.get("/friendsworld");
    console.log("data in action", data);
    return {
        type: "ALL_PEOPLE",
        users: data
    };
}

export async function beFriends(id) {
    await axios.post("/friendship/", {
        button: "Accept friend request",
        id: id
    });

    return {
        type: "MAKE_FRIEND",
        id
    };
}

export async function unFriend(id) {
    await axios.post("/friendship/", {
        button: "Unfriend",
        id: id
    });
    return {
        type: "UNFRIEND_PERSON",
        id
    };
}

export async function chatMessages(rows) {
    // console.log("rows in action:", rows);
    return {
        type: "SHOW_LAST_TEN",
        chatMessages: rows
    };
}

export async function chatMessage(rows) {
    return {
        type: "NEW_MESSAGE",
        text: rows
    };
}

export async function chatImage(data) {
    console.log("WHAT IS data", data);
    return {
        type: "NEW_IMAGE",
        chatImage: data
    };
}
