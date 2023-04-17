import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import Home from "./components/Home/Home";
import Registration from './components/Registartion/Registration';
import Login from './components/Login/Login';
import Admin from "./components/Admin/Admin";

function App() {

  const user = localStorage.getItem("user");
  // const user = false;


  return (
    <div>
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>

        <Route exact path="/" element={<Home/>} />

          <Route path="/login" element= {user? <Admin /> : <Login /> } />

          <Route path="/register" element={<Registration />} />

        </Routes>
      </Router>


    </div>
  );
}

export default App;
