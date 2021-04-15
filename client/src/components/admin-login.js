import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

const Recaptcha = require('react-recaptcha');

require('dotenv').config({path: '../../.env'})


function AdminLogin() {

    const [adminLoginUsername, setAdminLoginUsername] = useState("");
    const [adminLoginPassword, setAdminLoginPassword] = useState("");
    
    const [redirect, setRedirect] = useState("");
    const [loginFail, setLoginFail] = useState(null);

    const [captchaSuccess, setCaptchaSuccess] = useState(false);
    

    const adminLogin = () => {
        axios({
            method: "POST",
            data: {
                username: adminLoginUsername,
                password: adminLoginPassword,
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API_BASE_URL}/api/admin-login`,
        }).then((res) => {
            console.log(res.status);
            console.log(res.data);
            // if (res.status === 200) {
            //     setRedirect(true)
            // }

            if (res.data === 'Admin Successfully Authenticated') {
                setRedirect(true)
            }
            if (res.data === 'No Admin Exists') {
                setLoginFail(true)
            }



        });
    };


    if (redirect) {
        return <Redirect to='/admin-zone' />
    }

    const captchaClick = (response) => {
        console.log(response)
        setCaptchaSuccess(true);
    }
    

    return (
        <div className="page_view">
            <div className="centre_text form_container">
                <h1>Admin Login</h1>

                { loginFail ?
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        Incorrect credentials!
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                : null }

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

                <div className="form_element recaptcha_wrapper">
                    <Recaptcha 
                        sitekey="6LeIcqUaAAAAAIXxHYmqMHdthJbLZ1ZBL-opaQZg" 
                        render="explicit" 
                        verifyCallback={captchaClick} 
                    />
                </div>

                { captchaSuccess ?
                    <button className="form_element" onClick={adminLogin}>Submit</button>
                : null }


            </div>
        </div>
    );
}

export default AdminLogin;


