import React from "react";

const LogOutView = ({ onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default LogOutView;