import React from "react";
import ReactDOM from "react-dom";
import "todomvc-app-css/index.css";
import { Provider } from "react-redux";

import { make as makeStore } from "./store";
import { App } from "./components/App";

const store = makeStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
