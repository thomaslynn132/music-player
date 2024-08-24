// src/components/Controls.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import useSound from "use-sound";
import {
  togglePlayPause,
  nextTrack,
  previousTrack,
  setCurrentTrack,
} from "../redux/playlistSlice";

const Controls = () => {
  const dispatch = useDispatch();
  const { playlist, currentTrackIndex, isPlaying, singer } = useSelector(
    (state) => state.playlist
  );

  const currentTrack = playlist[currentTrackIndex];
  const [play, { pause, sound }] = useSound(currentTrack?.file, {
    onend: () => dispatch(nextTrack()),
  });

  React.useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

  const handleNextTrack = () => {
    dispatch(nextTrack());
    sound.stop(); // Stop current track
  };

  const handlePreviousTrack = () => {
    dispatch(previousTrack());
    sound.stop(); // Stop current track
  };

  return (
    <div className="controls">
      <BiSkipPrevious onClick={handlePreviousTrack} />
      {isPlaying ? (
        <AiFillPauseCircle onClick={handlePlayPause} />
      ) : (
        <AiFillPlayCircle onClick={handlePlayPause} />
      )}
      <BiSkipNext onClick={handleNextTrack} />
      <div className="track-info">
        <p>{currentTrack?.title}</p>
        <p>{singer}</p>
      </div>
    </div>
  );
};

export default Controls;
