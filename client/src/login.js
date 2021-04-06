import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";





function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [redirect, setRedirect] = useState("");
        

    const login = () => {
        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "/api/login",
        }).then((res) => {
            console.log(res.status);
            console.log(res.data);
            if (res.status === 200) {
                setRedirect(true)
            }
        });
    };


    if (redirect) {
        return <Redirect to='/user-zone' />
        // return <div>redirect</div>
    }


    return (
        <div className="page_view">
            <div className="centre_text form_container">
                <h1>Login</h1>
                <div className="form_element">
                    <input
                        placeholder="Username"
                        onChange={(e) => setLoginUsername(e.target.value)}
                    />
                </div>
                <div className="form_element">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </div>
                <button onClick={login}>Submit</button>

            </div>
        </div>
    );
}

export default Login;
