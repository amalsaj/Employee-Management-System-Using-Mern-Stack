import React, { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign_in from "./components/Sign_in";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";
import Test from "./components/Test";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<SignUpForm />} /> */}
          <Route path="/" element={<Sign_in />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/test" element={<Test />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
