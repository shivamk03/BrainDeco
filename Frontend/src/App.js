import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import NewGame from "./Components/NewGame";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/signup" element={<SignUp />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/newgame" element={<NewGame />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
