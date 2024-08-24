// src/components/Sidebar.js
import React from "react";
import { FaHome, FaMusic, FaList, FaChartLine } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <FaHome /> Browse
        </li>
        <li>
          <FaMusic /> Songs
        </li>
        <li>
          <FaList /> Playlists
        </li>
        <li>
          <FaChartLine /> Top Charts
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
