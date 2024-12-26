import React from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const LoginPage = () => {
  return (
    <div>
      <div className="login-page">
        LoginPage
        <Login />
      </div>
      <div className="login-page">
        Sign up
        <Register />
      </div>
    </div>
  );
};

export default LoginPage;
