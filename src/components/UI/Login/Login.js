import React, { useState } from "react";

import "./Login.scss";

const Login = ({ submitLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    submitLogin(username, password);
  };

  return (
    <div className="login">
      <form onSubmit={formSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <p>Don't have an account?</p>
        <div className="bottom-row">
          <a href="/signup">Sign up</a>
          <div className="login-button" onClick={formSubmit}>
            <p>Login</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
