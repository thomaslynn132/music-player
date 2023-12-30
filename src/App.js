// App.js
import "./App.css";
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = () => {
    // Add your task creation logic here (without Firebase)
    // For example, you can update the 'tasks' state directly
    if (title.trim() !== "" && description.trim() !== "") {
      const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle("");
      setDescription("");
      setCompleted(!completed);
    }
  };

  const handleEditTask = (taskId) => {
    // Add your task editing logic here
    // For example, you can open a modal or prompt for editing
    console.log("Edit task with ID:", taskId);
  };

  const handleDeleteTask = (taskId) => {
    // Add your task deletion logic here
    // For example, you can filter out the task with the specified ID
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleCompletedTask = (taskId) => {
    // Add your task completion logic here
    // For example, you can toggle the 'completed' status of the task
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Things I need to do</h1>
      <div className="header">
        <label className="title">
          Title
          <input
            type="text"
            placeholder="Title of my task"
            className="input"
            value={title}
            onChange={handleTitleChange}
          />
        </label>

        <label className="title">
          Description
          <input
            type="text"
            placeholder="Details of the things I have to do"
            className="input"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <p className="title">
          <br />
          <button type="button" className="addTask" onClick={handleAddTask}>
            Add task
          </button>
        </p>
      </div>
      <div className="pages">
        <Link to="/" exact>
          <button className="catego">To Do</button>
        </Link>
        <Link to="/completed" exact>
          <button className="catego">Completed</button>
        </Link>
      </div>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="thingsToDo">
                {tasks
                  .filter((task) => !task.completed)
                  .map((task) => (
                    <div className="task" key={task.id}>
                      <p className="title">{task.title}</p>
                      <p className="Description">{task.description}</p>
                      <button
                        className="innerBtn"
                        onClick={() => handleEditTask(task.id)}>
                        edit
                      </button>
                      <button
                        className="innerBtn"
                        onClick={() => handleDeleteTask(task.id)}>
                        Delete
                      </button>
                      <input
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleCompletedTask(task.id)}
                      />
                      <label>Completed</label>
                    </div>
                  ))}
              </div>
            }
            exact
          />
          <Route
            path="/completed"
            element={
              <div className="completedTasks">
                {tasks
                  .filter((task) => task.completed)
                  .map((task) => (
                    <div className="completedTask" key={task.id}>
                      <p className="title">{task.title}</p>
                      <p className="Description">{task.description}</p>
                      <button
                        className="innerBtn"
                        onClick={() => handleEditTask(task.id)}>
                        edit
                      </button>
                      <button
                        className="innerBtn"
                        onClick={() => handleDeleteTask(task.id)}>
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            }
            exact
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
