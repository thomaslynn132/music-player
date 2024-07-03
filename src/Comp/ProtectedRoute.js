import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // assuming you have an AuthContext to provide auth state

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // get the current user from the auth context

  return currentUser ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
