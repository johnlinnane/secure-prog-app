import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

const ReCAPTCHA = require('react-google-recaptcha').default;

require('dotenv').config({path: '../../.env'})


function AdminLogin() {

    const [adminLoginUsername, setAdminLoginUsername] = useState("");
    const [adminLoginPassword, setAdminLoginPassword] = useState("");
    
    const [redirect, setRedirect] = useState("");
    const [loginFail, setLoginFail] = useState(null);

    // const [captchaSuccess, setCaptchaSuccess] = useState(false);
    
    const reRef = useRef();

    const adminLogin = async () => {

        const token = await reRef.current.executeAsync();
        reRef.current.reset();

        axios({
            method: "POST",
            data: {
                username: adminLoginUsername,
                password: adminLoginPassword,
                token
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API_BASE_URL}/api/admin-login`,
        }).then((res) => {

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
                    <ReCAPTCHA 
                            // sitekey="6Lf6RKsaAAAAAPh9-L1i6VVsMO2NDHgMxEqYH40R"
                            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                            size="invisible"
                            ref={reRef} 
                    />
                </div>

                <button className="form_element" onClick={adminLogin}>Submit</button>


            </div>
        </div>
    );
}

export default AdminLogin;

export const testo = (arg1, arg2) => {
    return `${arg1} is in love with ${arg2}`
}
