import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import 'bootstrap/dist/css/bootstrap.css';



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

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (

  // <Route {...rest} render={props =>
  //   <CheckAuth {...props} checkAuth={checkAuth}>
  //     {({ isAuthenticated }) => (isAuthenticated === true
  //       ? <Component {...props} />
  //       : <Redirect to="/" />)}
  //   </CheckAuth>
  // }></Route>
  <Route {...rest} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect to="/" />
  )} />

  // console.log(auth.isAuthenticated)
  // return (
  //   <Route {...rest} render={(props) => (
  //     auth.isAuthenticated === true
  //       ? <Component {...props} />
  //       : <Redirect to="/" />
  //   )} />
  // )
)

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/register" exact component={Register} />
      {/* <PrivateRoute path="/home" exact component={Home} isAuthenticated={() => { auth.authenticate(() => auth.isAuthenticated) }} /> */}
    </Switch>
  </Router>
);