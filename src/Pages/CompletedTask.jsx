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
} from "firebase/firestore";
import { db } from "../firebase";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    const q = query(
      collection(db, `Users/${user.uid}/userTasks`),
      where("userId", "==", user.uid),
      where("completed", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      addedDate: doc.data().addedDate.toDate(), // Convert Firestore timestamp to JavaScript Date
      completedDate: doc.data().completedDate.toDate(), // Convert Firestore timestamp to JavaScript Date
    }));
    setTasks(tasks);
  };

  const handleEditTask = (taskId) => {
    // Implement edit logic
  };

  const handleDeleteTask = async (taskId) => {
    await deleteDoc(doc(db, "userTasks", taskId));
    fetchTasks();
  };

  return (
    <div className="completedTasks">
      {tasks.map((task) => (
        <div className="completedTask" key={task.id}>
          <p className="title">{task.title}</p>
          <p className="description">{task.description}</p>
          <p className="description">
            This task was added on {task.addedDate.toDate().toString()} and
            completed on {task.completedDate.toDate().toString()}
          </p>
          <button className="innerBtn" onClick={() => handleEditTask(task.id)}>
            Edit
          </button>
          <button
            className="innerBtn"
            onClick={() => handleDeleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default CompletedTasks;
