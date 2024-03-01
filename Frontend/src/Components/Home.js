import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link,useNavigate } from "react-router-dom";
export default function Quiz() {
  const [state, setState] = useState({ totalgames: 0, gameswon: 0 });
  const navigate = useNavigate();
  const fetchData = async (req, res) => {
    const response = await fetch("http://localhost:5000/api/quiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setState({totalgames:data.totalgames,gameswon:data.gameswon});
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      const timeout = setTimeout(() => navigate("/login"), 0);
      return () => clearTimeout(timeout);
    }
    fetchData();
  },[]);
  return (
    <div className="main-container">
      <div className="inner-container">
        <div className="total-games">
          <p>Total games : {state.totalgames}</p>
        </div>
        <div className="won-games">
          <p>Games Won : {state.gameswon}</p>
        </div>
        <div className="new-game">
          <p>Want to play a new game?<Link to='/newgame'>Click here</Link></p>
        </div>
      </div>
    </div>
  );
}
