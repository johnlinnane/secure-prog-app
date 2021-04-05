import React, { useState } from 'react';
import axios from 'axios';





function Register() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPassword2, setRegisterPassword2] = useState("");

    const [alert, setAlert] = useState("");

    const register = () => {
        axios({
            method: "POST",
            data: {
                username: registerUsername,
                password: registerPassword,
                password2: registerPassword2,
            },
            withCredentials: true,
            url: "/api/register",
        }).then((res) => {
            setAlert(res.data)
            console.log(alert)
        });
    };





    console.log('ALERT:', alert)


    return (
        <div className="page_view">
            <div className="centre_text form_container">
                <h1>User Register</h1>

                {alert ?
                    <div>
                        {alert.map( (al, i) => (
                            <div className="alert alert-warning alert-dismissible fade show" role="alert" key={i}>
                                {al.msg}
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        ))}
                    </div>
                : null}



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
                <button onClick={register}>Submit</button>
            </div>
        </div>
    );
}

export default Register;
