import React, { useState } from 'react';
import axios from 'axios';




function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
        

    const login = () => {
        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/login",
        }).then((res) => console.log(res));
    };





    return (
        <div className="App form_container">
            <h1>Login</h1>
            <div className="form_element">
                <input
                    placeholder="username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
            </div>
            <div className="form_element">
                <input
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
            </div>
            <button onClick={login}>Submit</button>

        </div>
    );
}

export default Login;
