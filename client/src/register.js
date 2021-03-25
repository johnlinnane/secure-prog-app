import React, { useState } from 'react';
import axios from 'axios';





function Register() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = () => {
        axios({
            method: "POST",
            data: {
                username: registerUsername,
                password: registerPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/register",
        }).then((res) => console.log(res));
    };





    return (
        <div className="App form_container">
            <h1>Register</h1>
            <div className="form_element">
                <input
                    placeholder="username"
                    onChange={(e) => setRegisterUsername(e.target.value)}
                />
            </div>
            <div className="form_element">
                <input
                    placeholder="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
            </div>
            <button onClick={register}>Submit</button>
        </div>
    );
}

export default Register;
