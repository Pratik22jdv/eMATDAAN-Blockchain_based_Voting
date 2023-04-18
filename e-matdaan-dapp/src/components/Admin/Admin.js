import { React, useState, useEffect } from "react";
import axios from 'axios';

function Admin({ user }) {
    const [userList, setUserList] = useState([]);
    const [x, setX] = useState(false);

    const apiFetchList = ()=>{
        return fetch(
            `http://localhost:3000/users/all?adminEmail=${user.email}`,
            {
              method: 'GET',
            }
          )
            .then((response) => {
              return response.json();
            })
            .catch((err) => console.log(err));
        };

    const fetchUserList =  () => {
        apiFetchList().then((data)=>{
            setUserList(data);
            setX(true);
        })
    };

    useEffect(() => {
        fetchUserList(user);
        console.log(userList)
    }, [x]);

    return (
        <div style={{ marginTop: "50px" }}>
            <h1>Admin Page</h1>
        </div>
    );
}

export default Admin;