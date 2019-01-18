import React, { Component } from "react";
import LogOutView from "./LogOutView";
import { withRouter } from "react-router";
import app from "../base";

class LogOutContainer extends Component {
  handleSignOut = async event => {
    event.preventDefault();
    try {
      const user = await app
        .auth()
        .signOut();
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <LogOutView onSubmit={this.handleSignOut} />;
  }
}

export default withRouter(LogOutContainer);