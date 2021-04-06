import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';




function Logout() {

    const [redirect, setRedirect] = useState("");

    const register = () => {
        console.log('Hi')
        axios.get("/api/logout")
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
