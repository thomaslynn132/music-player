// Router.js
import React from "react";
import { BrowserRouter as Route, Link, Routes } from "react-router-dom";
import TasksToDo from "../Pages/TasksToDo";
import CompletedTask from "../Pages/CompletedTask";

const CustomRouter = () => {
  return (
    <div>
      <nav>
        <Link to="/">ToDo</Link>
        <Link to="/completed">Completed</Link>
      </nav>

      <Routes>
        <Route path="/" exact>
          <TasksToDo />
        </Route>
        <Route path="/completed">
          <CompletedTask />
        </Route>
      </Routes>
    </div>
  );
};

export default CustomRouter;
