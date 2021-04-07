import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config()



function Logout() {

    const [redirect, setRedirect] = useState("");

    const register = () => {
        console.log('Hi')
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/logout`)
            .then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    setRedirect(true)
                }
            });
    };

    useEffect(() => {
        register();
    }, []);

    if (redirect) {
        return <Redirect to='/' />
    } else {
        return null
    }


}

export default Logout;
