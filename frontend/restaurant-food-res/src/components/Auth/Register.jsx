import React, { useState } from "react";
import { register } from "../../service/AuthService";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER", // Default role
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      setMessage(response.message);
    } catch (error) {
      setMessage(error);
    }
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
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <select name="role" onChange={handleChange}>
        <option value="ROLE_USER">User</option>
        <option value="ROLE_ADMIN">Admin</option>
      </select>
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
};

export default Register;
