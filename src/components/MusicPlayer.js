// src/components/MusicPlayer.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { updateProgress } from "../redux/playlistSlice";
import VolumeControl from "./VolumeControl";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { playlist, currentTrackIndex, isPlaying, progress } = useSelector(
    (state) => state.playlist
  );

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        dispatch(updateProgress());
      }, 1000); // Update progress every second
    }
    return () => clearInterval(interval);
  }, [isPlaying, dispatch]);

  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      <p>{playlist[currentTrackIndex]?.title}</p>
      <p>{playlist[currentTrackIndex]?.singer}</p>
      <ProgressBar progress={progress} />
      <Controls />
      <VolumeControl />
    </div>
  );
};

export default MusicPlayer;
