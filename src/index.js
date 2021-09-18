import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Container from "./react-redux/Container";
import "./styles.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.querySelector("#game")
);
reportWebVitals(console.log);
