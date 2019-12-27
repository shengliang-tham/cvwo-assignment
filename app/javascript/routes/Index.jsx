import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import 'bootstrap/dist/css/bootstrap.css';

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/register" exact component={Register} />
    </Switch>
  </Router>
);