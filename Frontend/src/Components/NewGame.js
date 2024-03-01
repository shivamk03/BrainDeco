import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NewGame.css";
export default function NewGame() {
  const [state, setState] = useState({ sucess: false, arr: [] });
  const navigate = useNavigate();
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/getdata", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setState({ sucess: data.success, arr: data.data });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = 0;
    for (let i = 1; i <= 10; i++) {
      const list = document.getElementsByName("ques" + i);
      console.log(list);
      for (let j = 0; j < list.length; j++) {
        if (list[j].checked) {
          const str = state.arr[i - 1].answer;
          if (list[j].value === state.arr[i - 1][str]) {
            res++;
            break;
          }
        }
      }
    }
    const response = await fetch("http://localhost:5000/api/quiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (res / 10 >= 0.6) {
      alert("Congratulations, You have won the game.");
      await fetch("http://localhost:5000/api/quiz/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          totalgames: data.totalgames + 1,
          gameswon: data.gameswon + 1,
        }),
      });
      navigate("/");
    } else {
      alert("Sorry, You lost.");
      await fetch("http://localhost:5000/api/quiz/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          totalgames: data.totalgames + 1,
          gameswon: data.gameswon,
        }),
      });
      navigate("/");
    }
  };

  let i = 0;
  return (
    <div className="main-container">
      <div className="inner-mcq-container">
        <h1>Minimum score to win the game is 60%</h1>
        <div className="container">
          <form method="POST">
            {state.arr.map((ele) => {
              i++;
              return (
                <div className="mcq">
                  <p>Question {i + " : " + ele.question}</p>
                  <input
                    type="radio"
                    id={"option-1" + i}
                    name={"ques" + i}
                    value={ele.A}
                  />
                  <label htmlFor={"option-1" + i}>{ele.A}</label>
                  <input
                    type="radio"
                    id={"option-2" + i}
                    name={"ques" + i}
                    value={ele.B}
                  />
                  <label htmlFor={"option-2" + i}>{ele.B}</label>
                  <input
                    type="radio"
                    id={"option-3" + i}
                    name={"ques" + i}
                    value={ele.C}
                  />
                  <label htmlFor={"option-3" + i}>{ele.C}</label>
                  <input
                    type="radio"
                    id={"option-4" + i}
                    name={"ques" + i}
                    value={ele.D}
                  />
                  <label htmlFor={"option-4" + i}>{ele.D}</label>
                </div>
              );
            })}
            <div className="submit-btn">
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
