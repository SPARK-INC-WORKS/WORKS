import React, { useState } from "react";
import { login } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { role } = await login(formData);
      setRoles(role);
      if (role === "ADMIN") {
        navigate("/admin"); // Navigate to admin page
      } else if (role === "USER") {
        navigate("/user"); // Navigate to user page
      }
    } catch (error) {
      setMessage(error);
    }
    console.log(roles);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      {/* <p>{message}</p> */}
    </form>
  );
};

export default Login;
