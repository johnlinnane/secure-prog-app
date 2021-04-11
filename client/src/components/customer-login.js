import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

const Recaptcha = require('react-recaptcha');


require('dotenv').config({path: '../../.env'})


function CustomerLogin() {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [redirect, setRedirect] = useState("");
    const [loginFail, setLoginFail] = useState(null);
    const [captchaSuccess, setCaptchaSuccess] = useState(false);
    


    const login = () => {
        console.log('STUFF:', loginUsername, loginPassword)
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
            if (res.data === 'User Successfully Authenticated') {
                setRedirect(true)
            }
            if (res.data === 'No User Exists') {
                setLoginFail(true)
            }
        });
    };

    if (redirect) {
        return <Redirect to='/customer-zone' />
    }

    

    const captchaClick = () => {
        setCaptchaSuccess(true);
    }
    
    return (
        <div className="page_view">
            <div className="centre_text form_container">
                
                <h1>Customer Login</h1>


                { loginFail ?
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        Incorrect credentials!
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                : null }

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
                
                <div className="form_element recaptcha_wrapper">
                    <Recaptcha 
                        sitekey="6LeIcqUaAAAAAIXxHYmqMHdthJbLZ1ZBL-opaQZg" 
                        render="explicit" 
                        verifyCallback={captchaClick} 
                    />
                </div>
                
                { captchaSuccess ?
                    <button className="form_element" onClick={login}>Submit</button>
                : null }
                


            </div>
        </div>
    );
}

export default CustomerLogin;
