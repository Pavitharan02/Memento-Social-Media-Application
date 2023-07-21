import React from "react";
import { useState } from "react";
import './Login.css';
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn,setLoggedIn] = useState(false);
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      
      try {
        const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
          email,
          password,
        });
        const jwt = response.data.token;
        localStorage.setItem("jwt", jwt);
        setLoggedIn(true);
      } catch (error) {
        console.error("Login failed:", error);
      }
      };

    if(loggedIn){
      return <Navigate to="/home"/>
    }

    const buttonStyle = {
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem',
      };
    
      return (
        <div>
            <section className="vh-100">
            <div className="container-fluid h-custom">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                  <img src="https://i.ibb.co/n8ZP2h8/LOGO.png" className="img-fluid" alt="This is logo"/>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1" style={{marginTop: "80px"}}>
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                      <input type="email" id="form3Example3" className="form-control form-control-lg"
                        placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
          
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                      <input type="current-password" id="form3Example4" className="form-control form-control-lg"
                        placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
          
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check mb-0">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          Remember me
                        </label>
                      </div>
                      <a href="#!" className="text-body">Forgot password?</a>
                    </div>
          
                    <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn btn-success btn-lg" style={buttonStyle}>Login</button>
                      <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                          className="link-danger">Register</a></p>
                    </div>
          
                  </form>
                </div>
              </div>
            </div>
            <div
              className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-dark">
              <div className="text-white mb-3 mb-md-0">
                Copyright © 2020. All rights reserved.
              </div>
          
              <div>
                <a href="#!" className="text-white me-4">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#!" className="text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </section>
          </div>
      );
  };
  
  export default Login;