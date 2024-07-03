// CustomRouter.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../Comp/SignIn";
import Register from "../Comp/Register";
import ProtectedRoute from "../Comp/ProtectedRoute";
import Main from "../Pages/Main";
const CustomRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
};

export default CustomRouter;
