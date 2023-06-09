import React from "react";
import { Link, useNavigate } from 'react-router-dom';


function Navbar({Auth}) {

    // const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const logout =()=> {
        localStorage.clear();
        window.location.reload(false);
        navigate("/login");    
      }

    return (
        <div>
            <nav class="navbar navbar-light navbar-expand-lg " style={{backgroundColor: "#dbe7f0"}}>
                <a class="navbar-brand" href="/">eMATDAAN-DAPP</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    
                        <li class="nav-item active">
                            <Link class="nav-link" to = "/register">REGISTER <span class="sr-only">(current)</span></Link>
                        </li>

                        {!Auth ? (<li class="nav-item active">
                            <Link class="nav-link" to="/login">LOGIN</Link>
                        </li>)
                        :
                        (<li class="nav-item active">
                            <Link class="nav-link" to="/login">ADMIN</Link>
                        </li>)}

                        {Auth && (<li class="nav-item active">
                            <Link class="nav-link" to="/login"  onClick={logout}>Logout</Link>
                        </li>)}

                        <li class="nav-item">
                            <a class="nav-link" href="/">STUTUS</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="/">Disabled</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;