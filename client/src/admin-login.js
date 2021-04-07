import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
require('dotenv').config({path: '../.env'})

function AdminLogin() {


    const [adminLoginUsername, setAdminLoginUsername] = useState("");
    const [adminLoginPassword, setAdminLoginPassword] = useState("");
    const [redirect, setRedirect] = useState("");

    const adminLogin = () => {
        axios({
            method: "POST",
            data: {
                username: adminLoginUsername,
                password: adminLoginPassword,
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API_BASE_URL}/get-customer/admin-login`,
        }).then((res) => {
            console.log(res.status);
            console.log(res.data);
            if (res.status === 200) {
                setRedirect(true)
            }
        });
    };


    if (redirect) {
        return <Redirect to='/admin-zone' />
    }


    return (
        <div className="page_view">
            <div className="centre_text form_container">
                <h1>Admin Login</h1>
                <div className="form_element">
                    <input
                        placeholder="Username"
                        onChange={(e) => setAdminLoginUsername(e.target.value)}
                    />
                </div>
                <div className="form_element">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setAdminLoginPassword(e.target.value)}
                    />
                </div>
                <button onClick={adminLogin}>Submit</button>

            </div>
        </div>
    );
}

export default AdminLogin;


