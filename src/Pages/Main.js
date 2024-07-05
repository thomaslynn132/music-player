import React, { useState, useEffect, useCallback } from "react";

import {
  db,
  where,
  collection,
  addDoc,
  query,
  getDocs,
  auth,
} from "../firebase";
import { Link } from "react-router-dom";

function Main() {
  const [tasks, setTasks] = useState([]); // eslint-disable-line no-unused-vars
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const user = auth.currentUser;

  const fetchTasks = useCallback(async () => {
    if (user) {
      try {
        const q = query(
          collection(db, `Users/${user.uid}/userTasks`),
          where("completed", "==", false)
        );
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          addedDate: doc.data().addedDate.toDate(),
        }));
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    }
  }, [user]);
  useEffect(() => {
    fetchTasks();
  }, [user, fetchTasks]);

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
        await fetchTasks();
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };
  return (
    <div className="App">
      <div className="Home">
        <h1>Things I need to do</h1>
        <div className="Header">
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
              placeholder="Details of my task"
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
          <Link to="/taskstodo">
            <button className="catego">To Do</button>
          </Link>
          <Link to="/completed">
            <button className="catego">Completed</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
