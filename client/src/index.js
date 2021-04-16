import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./states/store";
import App from "./views/base/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
