import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import 'bootstrap/dist/css/bootstrap.css';
import { notification } from 'antd';



// const authenticate = new Promise((resolve, reject) => {
//   fetch('/api/authenticated', {
//     method: 'get'
//   }).then(response => response.json())
//     .then(authenticated => {
//       console.log(authenticated)
//       resolve(authenticated)
//     })
// })

function checkAuth() {
  console.log("testetstest")
  fetch('/api/authenticated', {
    method: 'get'
  }).then(response => response.json())
    .then(authenticated => {
      console.log(authenticated)
      // notification.error({
      //   message: "Error",
      //   description: "Please login first",
      //   placement: "bottomRight",
      // });
      return authenticated
    })
}

// auth = {
//   isAuthenticated: false,
//   authenticate() {
//     fetch('/api/authenticated', {
//       method: 'get'
//     }).then(response => response.json())
//       .then(authenticated => {
//         console.log(authenticated)
//         this.isAuthenticated = authenticated
//       })
//   }
// }

// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isAuthenticated
//       ? <Component {...props} />
//       : <Redirect to="/" />
//   )} />

// )

const RequireAuth = (Component) => {

  return class App extends React.Component {
    state = {
      isAuthenticated: false,
      isLoading: true,
      wasInitialized: false
    }

    componentDidMount() {
      fetch('/api/authenticated', {
        method: 'get'
      }).then(response => response.json())
        .then(authenticated => {
          console.log(authenticated)
          if (!authenticated) {
            notification.error({
              message: "Error",
              description: "Please login first",
              placement: "bottomRight",
            });
          }
          this.setState({ isAuthenticated: authenticated, isLoading: false, wasInitialized: true });

        })
    }
    render() {
      const { isAuthenticated, wasInitialized } = this.state;
      if (isAuthenticated) {
        return <Component {...this.props} />
      } else if (!wasInitialized) {
        return ""
      } else {
        return <Redirect to="/" />
      }

    }
  }

}

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      {/* <Route path="/home" exact component={Home} /> */}
      <Route path="/register" exact component={Register} />
      <Route path="/home" exact component={RequireAuth(Home)} />
    </Switch>
  </Router>
);