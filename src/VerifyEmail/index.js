import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";

import VerifyEmailView from "./VerifyEmailView";

class VerifyEmailContainer extends Component {
  handleVerifyEmail = async event => {
    event.preventDefault();
    
    try {
      const user = await app
        .auth()
        .currentUser
        .sendEmailVerification();
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <VerifyEmailView onSubmit={this.handleVerifyEmail} />;
  }
}

export default withRouter(VerifyEmailContainer);