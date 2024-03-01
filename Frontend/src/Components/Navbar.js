import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const handleSignOut =async()=>{
    localStorage.removeItem('token');
    document.getElementById('sign-out').style.display = 'none';
    const timeout = setTimeout(() => navigate("/login"),0);
    return () => clearTimeout(timeout);
  }
  return (
    <div className="nav-container">
      <div className="logo">
        <img src={logo} alt="" />
        <h3>Brain Deco</h3>
      </div>
      <div className="nav-content">
        <ul>
          <li>
            <Link to="/" >
              Home
            </Link>
          </li>
          <li>
            <Link to="/" >
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/" >
              About
            </Link>
          </li>
          {localStorage.getItem('token')?<li>
            <Link to="/" id="sign-out" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>:""}
        </ul>
      </div>
    </div>
  );
}
