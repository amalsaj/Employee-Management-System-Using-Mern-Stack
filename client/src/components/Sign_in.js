import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "./Context";
import axios from "axios";
import { Image, Button } from "react-bootstrap";
import card from "../Images/card3.svg";
import Dashboard from "./Dashboard";
import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      showToastMessage();
      setTimeout(() => {
        navigate(`/dash?username=${username}`);
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data || "An error occurred";
        setError(errorMessage);
        toast.warning(errorMessage, {
          position: "bottom-right",
          autoClose: 2000,
          pauseOnHover: true,
          hideProgressBar: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const showToastMessage = () => {
    toast.success("Login Successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4 centered-image">
          <Image
            src={card}
            alt=""
            style={{
              width: "200px",
              height: "600px",
            }}
            rounded
          />
        </div>
        <div
          className="col-8 text-center m-0"
          style={{
            position: "fixed",
            top: 20,
            right: 50,
            width: "50%",
            height: "100%",
          }}
        >
          <div className="card mt-4 body_card ">
            <div className="card-header bg-white">
              <Image
                src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2016/09/att-logo-600x600.jpg?auto=format&q=60&fit=max&w=930"
                alt="Logo"
                style={{ width: "50px", height: "50px" }}
                roundedCircle
              />

              <h1 className="mt-2">
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #246BCE, #1E5799, #143961, #0B274E, black)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Hello
                </span>{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to left, black, #0B274E, #143961, #1E5799, #246BCE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Again!
                </span>
              </h1>
              <h1 className="text-secondary fw-lighter fs-6 mt-3">
                Please Log In to Access Your Account <br></br>and Continue Using
                Our Services
              </h1>
            </div>
            <div className="card-body">
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

                <div className="justify-content-center d-flex align-items-center mt-2">
                  <Button type="submit" className="btn loginSign">
                    Login
                  </Button>
                  <ToastContainer />
                </div>
                <div className="justify-content-center d-flex align-items-center mt-5">
                  <h1 className="text-secondary logo">
                    Doesn't have an account yet?{" "}
                    <a href="/signup" className=" text-decoration-none">
                      Sign Up
                    </a>{" "}
                  </h1>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
