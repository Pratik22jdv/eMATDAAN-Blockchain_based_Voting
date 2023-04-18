import {React, useState, useEffect} from "react";
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

  const [user, setuser] = useState(() => {
 
    // Used local storage to sustain the login state
    if(!localStorage.getItem("user")){
      
      return false;
    }
    return JSON.parse(localStorage.getItem("user"));
  });
  

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div>
      <Router>
        <div>
          <Navbar user = {user}/>
        </div>
        <Routes>

        <Route exact path="/" element={<Home/>} />

          <Route path="/login" element= {user? <Admin user={user}/> : <Login /> } />

          <Route path="/register" element={<Registration />} />

        </Routes>
      </Router>


    </div>
  );
}

export default App;
