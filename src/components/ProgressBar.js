// src/components/ProgressBar.js
import React from "react";
import { useDispatch } from "react-redux";
import { setProgress } from "../redux/playlistSlice";

const ProgressBar = ({ progress }) => {
  const dispatch = useDispatch();

  const handleSeek = (event) => {
    const newValue = Number(event.target.value);
    dispatch(setProgress(newValue));
  };

  return (
    <div className="progress-bar">
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
      />
    </div>
  );
};

export default ProgressBar;
