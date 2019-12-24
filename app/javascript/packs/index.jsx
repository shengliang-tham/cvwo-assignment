import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from "../components/Home";
import store from '../components/store/index'
import { Provider } from 'react-redux'

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});