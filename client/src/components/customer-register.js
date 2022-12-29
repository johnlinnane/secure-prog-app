import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReCAPTCHA = require('react-google-recaptcha').default;

require('dotenv').config({path: '../../.env'})



function CustomerRegister() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPassword2, setRegisterPassword2] = useState("");

    const [alert, setAlert] = useState("");
    const [redirect, setRedirect] = useState(null);

    const reRef = useRef();

    const register = async () => {
        setRedirect(false)

        const token = await reRef.current.executeAsync();
        reRef.current.reset();

        axios({
            method: "POST",
            data: {
                username: registerUsername,
                password: registerPassword,
                password2: registerPassword2,
                token
            },
            withCredentials: true,
            url: `${process.env.REACT_APP_API_BASE_URL}/api/customer-register`,
        }).then((res) => {
            if (Array.isArray(res.data)) {
                setAlert(res.data)
            }

            if (res.data === 'Customer Created') {
                setRedirect(true)
            }
            
        });
    };


    return (
        <div className="page_view">
            <div className="centre_text form_container">


                { redirect ?
                    <div>
                        <h1>Customer Created!</h1>
                        <Link to="/customer-login">
                            <button type="button" >Login</button>  
                        </Link>
                    </div>
                    
                :

                    <div>
                        <h1>Customer Register</h1>

                        
                        { alert ?
                            <div>
                                {alert.map( (al, i) => (
                                    <div className="alert alert-warning alert-dismissible fade show" role="alert" key={i}>
                                        {al.msg}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                ))}
                            </div>
                        : null }
                    



                        <div className="form_element">
                            <input
                                placeholder="Username"
                                onChange={(e) => setRegisterUsername(e.target.value)}
                            />
                        </div>
                        <div className="form_element">
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </div>

                        <div className="form_element">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => setRegisterPassword2(e.target.value)}
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

                        <button className="form_element" onClick={register}>Submit</button>

                    </div>
                }
            </div>
        </div>
    );
}

export default CustomerRegister;
