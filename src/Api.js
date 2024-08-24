// src/api.js
import axios from "axios";

const API_KEY = process.env.REACT_APP_AUDIO_DB_API_KEY;
const BASE_URL = process.env.REACT_APP_AUDIO_DB_BASE_URL;

export const fetchArtist = async (artistName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/search.php?s=${artistName}`
    );
    return response.data.artists[0];
  } catch (error) {
    console.error("Error fetching artist data:", error);
    return null;
  }
};
