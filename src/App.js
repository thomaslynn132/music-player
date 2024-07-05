import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRouter from "./routerConfig/router";
import { AuthProvider } from "./Comp/AuthProvider";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <CustomRouter />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
