import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config({path: '../.env'})



function Logout() {

    const [redirect, setRedirect] = useState("");

    const logout = () => {
        console.log('Hi')


        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_BASE_URL}/api/logout`,
            withCredentials: true
        }).then((res) => {
            console.log(res.status)
            if (res.status === 200) {
                setRedirect(true)
            }
        });
    };


    useEffect(() => {
        logout();
    }, []);

    if (redirect) {
        return <Redirect to='/' />
    } else {
        return null
    }


}

export default Logout;
