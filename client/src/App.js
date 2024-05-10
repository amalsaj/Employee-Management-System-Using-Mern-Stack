import React, { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign_in from "./components/Sign_in";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ThemeContext from "./components/Context";
import Create from "./components/Create";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/sign" element={<Sign_in />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/create" element={<Create/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
