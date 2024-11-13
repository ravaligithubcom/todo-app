import axios from "axios";

// Base URL for the backend API
const API_URL = "http://localhost:3000/api/user";

// Function to handle user login
export const login = (username, password) => {
  return axios
    .post(`${API_URL}/login`, { username, password })
    .then((response) => {
      // Save the JWT token and user data to localStorage or state
      localStorage.setItem("token", response.data.token);
      return response.data; // Return token and user data
    })
    .catch((error) => {
      console.error("Login error:", error);
      throw error; // Propagate error
    });
};

// Function to handle user registration
export const register = (username, email, password) => {
  return axios
    .post(`${API_URL}/register`, { username, email, password })
    .then((response) => {
      // After registration, you can automatically log the user in
      return response.data; // Return user data and token
    })
    .catch((error) => {
      console.error("Registration error:", error);
      throw error; // Propagate error
    });
};

// Function to handle user logout
export const logout = () => {
  // Clear the token from localStorage to log out
  localStorage.removeItem("token");
};

// Function to get the current user profile (protected route)
export const getUserProfile = () => {
  const token = localStorage.getItem("token");

  // Check if token exists before making the request
  if (token) {
    return axios
      .get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data; // Return user profile data
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        throw error; // Propagate error
      });
  } else {
    return Promise.reject(new Error("No token found"));
  }
};

// Function to check if the user is authenticated (has a valid token)
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

// Function to get the stored token (useful for attaching to requests)
export const getToken = () => {
  return localStorage.getItem("token");
};
