import "./App.css";
import React, { useState, useEffect } from "react";
import { db } from "./Config/firebase";
import {
  collection,
  addDoc,
  setDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTasks = () => {
      try {
        const tasksCollection = collection(db, "tasks");

        const unsubscribe = onSnapshot(tasksCollection, (querySnapshot) => {
          const tasksData = [];
          querySnapshot.forEach((doc) => {
            tasksData.push({ id: doc.id, ...doc.data() });
          });
          setTasks(tasksData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = async () => {
    if (title.trim() !== "" && description.trim() !== "") {
      try {
        const tasksCollection = collection(db, "tasks");
        await addDoc(tasksCollection, { title, description });

        setTitle("");
        setDescription("");
        setCompleted(false);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
  const handleEditTask = async (taskId) => {
    try {
      const newTitle = prompt(
        "Write down how you would like to edit the title.",
        ""
      );
      const newDescription = prompt(
        "Write down how you would like to edit the description.",
        ""
      );
      if (newTitle !== null && newDescription !== null) {
        const taskDocRef = doc(db, "tasks", taskId);
        await setDoc(
          taskDocRef,
          { title: newTitle, description: newDescription },
          { merge: true }
        );

        console.log("Task updated successfully!");
      } else {
        console.log("Task edition cancelled.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const taskDoc = doc(db, "tasks", taskId);
      await deleteDoc(taskDoc);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCompletedTask = async (taskId) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      setTasks(updatedTasks);

      // Update the completion status in the Firestore database
      const taskDocRef = doc(db, "tasks", taskId);
      await setDoc(
        taskDocRef,
        {
          completed: !updatedTasks.find((task) => task.id === taskId)
            ?.completed,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
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
        <button className="catego">To Do</button>
        <button className="catego">Completed</button>
      </div>
      <div className="container">
        <div className="thingsToDo">
          {tasks.map((task) => (
            <div
              className={task.completed ? "completedTask" : "task"}
              key={task.id}>
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
                checked={completed}
                onChange={() => handleCompletedTask(task.id)}
              />
              <label>Completed</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
