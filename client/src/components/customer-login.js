import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

// const ReCAPTCHA = require('react-google-recaptcha');
const ReCAPTCHA = require('react-google-recaptcha').default



require('dotenv').config({path: '../../.env'})


function CustomerLogin() {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [redirect, setRedirect] = useState("");
    const [loginFail, setLoginFail] = useState(null);
    // const [captchaSuccess, setCaptchaSuccess] = useState(false);
    const reRef = useRef();
    const [captchaFail, setCaptchaFail] = useState(false);




    const login = async () => {


        const token = await reRef.current.executeAsync();
        reRef.current.reset();
        console.log('token: ', token)

        console.log('STUFF:', loginUsername, loginPassword)
        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword,
                token
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
            if (res.data === 'Recaptcha identifies user as a bot.') {
                setCaptchaFail(true)
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


                { loginFail ?
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        Incorrect credentials!
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                : null }
                { captchaFail ?
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        'Recaptcha identifies user as a bot!'
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
                    <ReCAPTCHA 
                        sitekey="6Lf6RKsaAAAAAPh9-L1i6VVsMO2NDHgMxEqYH40R"
                        size="invisible"
                        ref={reRef} 
                    />
                    
                </div>
                
                <button className="form_element" onClick={login}>Submit</button>
                


            </div>
        </div>
    );
}

export default CustomerLogin;
