import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage/>} />
        {/* <Route path="/Home" element={<HomePage/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
