// CustomRouter.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../Comp/SignIn";
import Register from "../Comp/Register";
import ProtectedRoute from "../Comp/ProtectedRoute";
import Main from "../Pages/Main";
import TasksToDo from "../Pages/TasksToDo";
import CompletedTasks from "../Pages/CompletedTask";
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
      <Route
        path="/taskstodo"
        element={
          <ProtectedRoute>
            <TasksToDo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/completed"
        element={
          <ProtectedRoute>
            <CompletedTasks />
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
};

export default CustomRouter;
