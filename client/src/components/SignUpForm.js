import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/logo.avif";
import { Image, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import card from "../Images/card4.svg";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const showToastMessage = () => {
    toast.success("Account Created Successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/signup", { username, password });
      console.log(response.data);
      setError("");
      showToastMessage();
      setTimeout(() => {
        navigate(`/`);
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 centered-image">
          <div className=" m-5  text-white">
            <h1 className="fw-lighter fw-bold">
              Join Us and <br></br> Unlock Endless <br></br>Possibilities!
            </h1>
            <h1 className="logo">
              Welcome! We're excited to have you on board. <br></br>Let's embark
              on this amazing journey together!
            </h1>
          </div>

          <div className="center">
            <Image
              src={card}
              alt=""
              style={{
                width: "300px",
                height: "200px",
              }}
              rounded
            />
          </div>
        </div>
        <div
          className="col-8 text-center mt-4"
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
                src={Logo}
                alt="Logo"
                style={{ width: "50px", height: "50px" }}
                roundedCircle
              />
              <h1 className="mt-1">
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #246BCE, #1E5799, #143961, #0B274E, black)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Get
                </span>{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to left, black, #0B274E, #143961, #1E5799, #246BCE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Started
                </span>
              </h1>
            </div>
            <div className="card-body bg-white">
              <form onSubmit={handleSubmit} autocomplete="off">
                <div className="form-group">
                  <label className="mb-2" htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label className="mb-2" htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center  mt-4">
                  <Button type="submit" className="btn loginSign">
                    Create Account
                  </Button>
                  <ToastContainer />
                </div>
                <div className="justify-content-center d-flex align-items-center mt-5">
                  <h1 className="text-secondary logo">
                   Already had an Account?{" "}
                    <a href="/" className=" text-decoration-none">
                     Login
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

export default SignUpForm;
