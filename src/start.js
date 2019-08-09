import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducers.js";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./socket";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
let elem;

if (location.pathname == "/welcome") {
    // user is logged out
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />;
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));

// composeWithDevTools (redux-devtools-extension)

// create the store with the redux promise middleware applied and redux devtools enabled
// wrap your <App /> in <Provider> and pass that to ReactDOM.render.
//
// Oh yeah, remember to pass the store you created as a prop to Provider
