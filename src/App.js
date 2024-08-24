// src/App.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import { setPlaylist, setCurrentTrack } from "./redux/playlistSlice";
import "./App.css";
import track1 from "./assets/track1.mp3";
import track2 from "./assets/track2.mp3";
import track3 from "./assets/track3.mp3";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initialPlaylist = [
      { id: 1, title: "Track 1", file: track1, singer: "Singer 1" },
      { id: 2, title: "Track 2", file: track2, singer: "Singer 2" },
      { id: 3, title: "Track 3", file: track3, singer: "Singer 3" },
    ];

    dispatch(setPlaylist(initialPlaylist));
    dispatch(setCurrentTrack({ index: 0, singer: initialPlaylist[0].singer }));
  }, [dispatch]);

  return (
    <div className="app">
      <Sidebar />
      <MusicPlayer />
    </div>
  );
}
