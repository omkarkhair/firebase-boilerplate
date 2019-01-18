import React from "react";

const VerifyEmailView = ({ onSubmit }) => {
  return (
    <div>
      <h1>We have sent you an email for verification. Please verify your email to proceed.</h1>
      <form onSubmit={onSubmit}>
        <button type="submit">Resend verification email.</button>
      </form>
    </div>
  );
};

export default VerifyEmailView;