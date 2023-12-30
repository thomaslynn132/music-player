// // CompletedTask.jsx
// import React from "react";

// const CompletedTask = ({ tasks, handleEditTask, handleDeleteTask }) => {
//   return (
//     <div className="completedTasks">
//       {tasks.map((task) => (
//         <div className="completedTask" key={task.id}>
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
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CompletedTask;
