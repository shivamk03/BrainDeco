import React,{useState} from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const history = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const handleChange = async (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: state.email, password: state.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.token);
      history("/");
    } else {
      alert("Please enter the correct credentials");
    }
    // document.getElementById('sign-out').style.display='block';
  };
  return (
    <div className="main-container">
      <div className="login-container">
        <div className="heading">
          <h1>Login to Brain Deco</h1>
        </div>
        <div className="form-container">
          <form method="post" onSubmit={handleSubmit} className="login-form">
            <div className="form-contents">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input type="text" name="email" id="email" value={state.email} onChange={handleChange}/>
            </div>
            <div className="form-contents">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input type="text" name="password" id="password" value={state.password} onChange={handleChange}/>
            </div>
            <div className="login-btn">
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>
        <div className="switch">
          <p>
            Don't have an account?<Link to="/signup">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
