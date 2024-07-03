import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  db,
} from "../firebase";

function TasksToDo() {
  const [tasks, setTasks] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        try {
          const q = query(
            collection(db, "userTasks"),
            where("userId", "==", user.uid),
            where("completed", "==", false)
          );
          const querySnapshot = await getDocs(q);
          const tasks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            addedDate: doc.data().addedDate.toDate(), // Convert Firestore timestamp to JavaScript Date
          }));
          setTasks(tasks);
        } catch (error) {
          console.error("Error fetching tasks: ", error);
        }
      };

      fetchTasks();
    }
  }, [user]);

  const handleEditTask = async (taskId, updatedTask) => {
    if (!user) return;

    try {
      const taskDocRef = doc(db, `Users/${user.uid}/userTasks`, taskId);
      await updateDoc(taskDocRef, updatedTask);
    } catch (error) {
      console.error("Error updating task: ", error);
      alert(`Error updating task: ${error.message}`);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "userTasks", taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleCompletedTask = async (taskId) => {
    try {
      const taskDoc = doc(db, "userTasks", taskId);
      await updateDoc(taskDoc, { completed: true, completedDate: new Date() });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  return (
    <div className="thingsToDo">
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <p className="title">{task.title}</p>
          <p className="description">{task.description}</p>
          <p className="description">
            This task was added on {task.addedDate.toDate().toString()}
          </p>
          <button className="innerBtn" onClick={() => handleEditTask(task.id)}>
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
      ))}
    </div>
  );
}

export default TasksToDo;
