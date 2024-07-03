import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link, Route, Routes } from "react-router-dom";
import TasksToDo from "./TasksToDo";
import CompletedTasks from "./CompletedTask";
import ProtectedRoute from "../Comp/ProtectedRoute";

function Main() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      const q = query(collection(db, `Users/${user.uid}/userTasks`));
      const querySnapshot = await getDocs(q);
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = async () => {
    if (title.trim() !== "" && description.trim() !== "") {
      const newTask = {
        userId: user.uid,
        title,
        description,
        completed: false,
        addedDate: new Date(),
        completedDate: null,
      };

      // Correct collection reference
      const tasksCollectionRef = collection(db, `Users/${user.uid}/userTasks`);

      // Add the document to the collection
      try {
        await addDoc(tasksCollectionRef, newTask);
        setTitle("");
        setDescription("");
        fetchTasks();
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    if (!user) return;

    try {
      const taskDocRef = doc(db, `Users/${user.uid}/userTasks`, taskId);
      await updateDoc(taskDocRef, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task: ", error);
      alert(`Error updating task: ${error.message}`);
    }
  };

  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      handleEditTask(editingTaskId, {
        title: editTitle,
        description: editDescription,
      });
      setEditingTaskId(null);
      setEditTitle("");
      setEditDescription("");
    }
  };

  return (
    <div className="App">
      <h1>Things I need to do</h1>
      <div className="header d-flex flex-row">
        <div className="titleDes">
          <label className="title">Title</label>
          <input
            type="text"
            placeholder="Title of my task"
            className="input"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="titleDes">
          <label className="title">Description</label>
          <input
            type="text"
            placeholder="Details of the things I have to do"
            className="input"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <button type="button" className="addTask" onClick={handleAddTask}>
            Add task
          </button>
        </div>
      </div>
      <div className="pages">
        <Link to="/">
          <button className="catego">To Do</button>
        </Link>
        <Link to="/completed">
          <button className="catego">Completed</button>
        </Link>
      </div>
      {editingTaskId ? (
        <div className="edit-task">
          <input
            type="text"
            value={editTitle}
            onChange={handleEditTitleChange}
          />
          <input
            type="text"
            value={editDescription}
            onChange={handleEditDescriptionChange}
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => startEditingTask(task)}>Edit</button>
          </div>
        ))
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TasksToDo tasks={tasks} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <ProtectedRoute>
              <CompletedTasks tasks={tasks} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default Main;
