import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import global styles
import App from "./App"; // Import the main App component
import { Provider } from "react-redux";
import { store } from "./redux/store";
// Render the App component into the root div of the HTML
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// Optional: Log performance metrics
