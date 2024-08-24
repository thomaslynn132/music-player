// src/components/VolumeControl.js
import React from 'react';

const VolumeControl = () => {
  return (
    <div className="volume-control">
      <input type="range" min="0" max="100" />
    </div>
  );
};

export default VolumeControl;
