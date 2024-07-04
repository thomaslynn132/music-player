import React, { useEffect, useState, useCallback } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Main from "./Main";

function TasksToDo() {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const user = auth.currentUser;

  // Define fetchTasks function
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

  const handleDeleteTask = async (taskId) => {
    if (!user) return;

    try {
      const taskDocRef = doc(db, `Users/${user.uid}/userTasks`, taskId);
      await deleteDoc(taskDocRef);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
    fetchTasks();
  };

  const handleCompletedTask = async (taskId) => {
    if (!user) return;

    try {
      const taskDocRef = doc(db, `Users/${user.uid}/userTasks`, taskId);
      await updateDoc(taskDocRef, {
        completed: true,
        completedDate: new Date(),
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: true, completedDate: new Date() }
            : task
        )
      );
      console.log("Task completed:", taskId);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
    fetchTasks();
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
      const updatedTask = {
        title: editTitle,
        description: editDescription,
      };
      console.log("Editing Task ID:", editingTaskId);
      console.log("Updated Task:", updatedTask);
      handleEditTask(editingTaskId, updatedTask);
      setEditingTaskId(null);
      setEditTitle("");
      setEditDescription("");
    }
    fetchTasks();
  };

  return (
    <div className="completedTasks">
      <Main />
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
          <div className="task" key={task.id}>
            <p className="title">{task.title}</p>
            <p className="description">{task.description}</p>
            <p className="description">
              This task was added on {task.addedDate.toString()}
            </p>
            <button className="innerBtn" onClick={() => startEditingTask(task)}>
              Edit
            </button>
            <button
              className="innerBtn"
              onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
            <input
              style={{ height: "20px", width: "20px" }}
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCompletedTask(task.id)}
            />
            <label>Completed</label>
          </div>
        ))
      )}
    </div>
  );
}

export default TasksToDo;
