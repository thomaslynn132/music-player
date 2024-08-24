import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: [],
    currentTrackIndex: 0,
    isPlaying: false,
    singer: "",
    progress: 0, // Added to manage the progress of the track
  },
  reducers: {
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrackIndex = action.payload.index;
      state.singer = action.payload.singer;
      state.progress = 0; // Reset progress when track changes
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    nextTrack: (state) => {
      state.currentTrackIndex =
        (state.currentTrackIndex + 1) % state.playlist.length;
      state.singer = state.playlist[state.currentTrackIndex].singer;
      state.progress = 0; // Reset progress for the next track
    },
    previousTrack: (state) => {
      state.currentTrackIndex =
        (state.currentTrackIndex - 1 + state.playlist.length) %
        state.playlist.length;
      state.singer = state.playlist[state.currentTrackIndex].singer;
      state.progress = 0; // Reset progress for the previous track
    },
    updateProgress: (state) => {
      state.progress = Math.min(state.progress + 1, 100); // Increment progress
    },
    setProgress: (state, action) => {
      state.progress = action.payload; // Update progress based on user input
    },
  },
});

export const {
  setPlaylist,
  setCurrentTrack,
  togglePlayPause,
  nextTrack,
  previousTrack,
  updateProgress,
  setProgress,
} = playlistSlice.actions;

export default playlistSlice.reducer;
