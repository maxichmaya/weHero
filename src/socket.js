import * as io from "socket.io-client";
import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};

// ovo je frontend ....od tuda ide action,reducuer etc.
// novi db query koji ce reci da namtreab zadnjih 10 chat messeges, array of chat chatMessages
// we need a chat table
