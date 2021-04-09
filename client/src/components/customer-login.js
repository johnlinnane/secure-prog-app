import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

require('dotenv').config({path: '../../.env'})


function CustomerLogin() {

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
            url: `${process.env.REACT_APP_API_BASE_URL}/api/customer-login`,
        }).then((res) => {
            // console.log(res.status);
            console.log('CUSTOMER LOGIN RES.DATA: ',res.data);
            if (res.status === 200) {
                setRedirect(true)
            }
        });
    };


    if (redirect) {
        return <Redirect to='/customer-zone' />
    }

    return (
        <div className="page_view">
            <div className="centre_text form_container">
                <h1>Customer Login</h1>
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

export default CustomerLogin;
