import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./SignUp.css";
export default function SignUp() {
    const history = useNavigate();
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const handleChange = async(e)=>{
    const value = e.target.value;
    setState({...state,[e.target.name]:value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password,
      }),
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem("token",json.token);
        history("/");
    }
    else {
        alert("Some error Occurred");
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="heading">
          <h1>Sign Up to Brain Deco</h1>
        </div>
        <div className="form-container">
          <form method="post" onSubmit={handleSubmit} className="login-form">
            <div className="form-contents">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={state.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-contents">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={state.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-contents">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            <div className="login-btn">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
        <div className="switch">
          Already a user?<Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
