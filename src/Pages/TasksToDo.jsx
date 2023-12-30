// // TasksToDo.jsx
// import React from "react";
// const TasksToDo = ({
//   tasks,
//   handleEditTask,
//   handleDeleteTask,
//   handleCompletedTask,
// }) => {
//   return (
//     <div className="thingsToDo">
//       {tasks.map((task) => (
//         <div className="task" key={task.id}>
//           <p className="title">{task.title}</p>
//           <p className="Description">{task.description}</p>
//           <button className="innerBtn" onClick={() => handleEditTask(task.id)}>
//             edit
//           </button>
//           <button
//             className="innerBtn"
//             onClick={() => handleDeleteTask(task.id)}>
//             Delete
//           </button>
//           <input
//             style={{
//               height: "20px",
//               width: "20px",
//             }}
//             type="checkbox"
//             checked={task.completed}
//             onChange={() => handleCompletedTask(task.id)}
//           />
//           <label>Completed</label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TasksToDo;
