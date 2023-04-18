import { React, useState, useEffect } from "react";
import axios from 'axios';

function Admin({ user }) {
    const [userList, setUserList] = useState([]);

    const fetchUserList = async (user) => {
        try {
            const res = await axios.get(
                'http://localhost:3000/users/all'
            );
            setUserList(res);
            console.log(userList);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchUserList(user);
    }, [user]);

    return (
        <div style={{ marginTop: "50px" }}>
            <h1>Admin Page</h1>
        </div>
    );
}

export default Admin;