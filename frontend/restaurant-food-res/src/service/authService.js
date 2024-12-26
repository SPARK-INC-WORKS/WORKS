import axios from "./api";
import { jwtDecode } from "jwt-decode"; // Fix the import statement

export const register = async (userData) => {
  try {
    const response = await axios.post("/auth/register", userData);

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error.response?.data?.message || "Registration failed";
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post("/auth/login", userData);
    localStorage.setItem("token", response.data.token); // Save JWT token
    const token = response.data.token;


    // Extract and log the role
    const decodedToken = jwtDecode(token);
    return { token:token, role: decodedToken.role };
  } catch (error) {
    throw error.response.data.message || "Login failed";
  }
};

// Other imports if necessary...

// Function to retrieve the JWT token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Function to log out the user
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Optional: Redirect user to login page
};
