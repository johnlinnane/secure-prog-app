import React, { useState } from 'react';
import axios from 'axios';


function AdminLogin() {


    const [adminLoginUsername, setAdminLoginUsername] = useState("");
    const [adminLoginPassword, setAdminLoginPassword] = useState("");

    const adminLogin = () => {
        axios({
            method: "POST",
            data: {
                username: adminLoginUsername,
                password: adminLoginPassword,
            },
            withCredentials: true,
            url: "http://localhost:5001/admin-login",
        }).then((res) => console.log(res));
    };





    return (
        <div className="page_view">
            <div className="centre_text form_container">
                <h1>Login</h1>
                <div className="form_element">
                    <input
                        placeholder="Username"
                        onChange={(e) => setAdminLoginUsername(e.target.value)}
                    />
                </div>
                <div className="form_element">
                    <input
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


