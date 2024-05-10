import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "./Context";
import axios from "axios";
import Dashboard from "./Dashboard";
import Image from "../Images/default-monochrome-black.svg";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to server to log in

      await axios.post("/login", { username, password });
      setError("");
      navigate(`/dash?username=${username}`);
    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        setError(error.response.data); // Display error message from server
      } else {
        setError("An error occurred. Please try again."); // Display generic error message
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header head text-center fs-3">Login</div>
            <div className="card-body table_body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <button type="submit" className="btn btn-primary btn-block ">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <img
        src={Image}
        alt="Logo"
        className="position-absolute top-0 m-3"
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default LoginForm;
