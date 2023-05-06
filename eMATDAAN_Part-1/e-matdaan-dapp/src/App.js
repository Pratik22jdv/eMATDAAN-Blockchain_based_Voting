import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import axios from 'axios';

import './App.css';
import Navbar from './components/Navbar';
import Home from "./components/Home/Home";
import Registration from './components/Registartion/Registration';
import Login from './components/Login/Login';
import Admin from "./components/Admin/Admin";

function App() {

  // const [user, setuser] = useState(() => {

  //   // Used local storage to sustain the login state
  //   if (!localStorage.getItem("user")) {

  //     return false;
  //   }
  //   return JSON.parse(localStorage.getItem("user"));
  // });

  const [Auth, setAuth] = useState(false);

  const userAuthenticated = () => {
    const token = localStorage.getItem("token");

    if(!token){
      setAuth(false);
      return;
    }

    axios.get("http://localhost:3000/users/isAuth", {
      headers: {
        "x-access-token": token,
      }
    }).then(function (res) {

      if(res.data.auth) setAuth(true);
      else setAuth(false);
      console.log(res.data);

    }).catch(function (error) {
      setAuth(false);
      console.log(error)
    })
  }


  useEffect(() => {
    userAuthenticated();
  }, []);

  return (
    <div>
      <Router>
        <div>
          <Navbar Auth={Auth} />
        </div>
        <Routes>

          <Route exact path="/" element={<Home />} />

          <Route path="/login" element={Auth ? <Navigate to = "/admin" /> : <Login />} />

          <Route path = "/admin" element = {Auth ? <Admin /> : <Navigate to = "/login"/>} />

          <Route path="/register" element={<Registration />} />

        </Routes>
      </Router>


    </div>
  );
}

export default App;
