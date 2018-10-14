import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import TimerForm from "./components/timerForm";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

//declare redux store
const store = createStore(rootReducer);

ReactDOM.render(
  <div className="container-fluid">
    <nav className="navbar navbar-dark bg-dark justify-content-center">
      <a className="navbar-brand text-center font-weight-bold" href="/">
        Countdown Timer
      </a>
    </nav>
    <Provider store={store}>
      <TimerForm />
    </Provider>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
