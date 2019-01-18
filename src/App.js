import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import app, { firestore } from "./base";

import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import VerifyEmail from "./VerifyEmail";

class App extends Component {
  state = { loading: true, authenticated: false, user: null };

  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false,
          emailVerified: true
        });

        // Check if email is verified
        if (!user.emailVerified) {
          this.setState({ emailVerified: false });
        }

        // Check if user is created
        var userRef = firestore.collection("profiles").doc(user.uid);
        userRef.get().then(function (doc) {
          console.log("DOC:", doc.exists);
          if (!doc.exists) {
            let d = {
              uid: user.uid,
              test: 123
            }
            console.log(d);
            firestore.collection("profiles").doc(user.uid).set(d);
          }
          else {
            console.log(doc.data())
          }
        }).catch(function (err) {
          console.log("Error:", err)
        });

        // Check if beats endpoint is generated
        var beatsRef = firestore.collection("beats").doc();
        beatsRef.get().then(function (doc) {
          console.log("DOC:", doc.exists);
          if (!doc.exists) {
            let d = {
              uid: user.uid,
              test: 123
            }
            console.log(d);
            firestore.collection("beats").doc(user.uid).set(d);
          }
          else {
            console.log(doc.data())
          }
        }).catch(function (err) {
          console.log("Error:", err)
        });

      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }

  render(){
    const { authenticated, loading, emailVerified } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    let home = (<PrivateRoute
      exact
      path="/"
      component={Home}
      authenticated={authenticated}
    />);
    if (!emailVerified) {

      app.auth()
          .currentUser
          .sendEmailVerification()
          .then(function () {

          }, function (error) {
            alert(error);
          });

      home = (<PrivateRoute
        exact
        path="/"
        component={VerifyEmail}
        authenticated={authenticated}
      />)
    }

    return (
      <Router>
        <div>
          {home}
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    )
  }
}

export default App;