import "./App.css";
import React from "react";

import CustomRouter from "./routerConfig/router";
import { AuthProvider } from "./Comp/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <CustomRouter />
      </AuthProvider>
    </>
  );
}

export default App;
