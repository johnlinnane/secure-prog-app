import React, { useState } from 'react';
import axios from 'axios';

function User() {
    const [data, setData] = useState(null);

    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:4000/user",
        }).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    };

    getUser();


    return (
        <div className="page_view">
            <div className="centre_text form_container">
                {data ? 
                    <h1>Your Username: {data.username}</h1> 
                : 
                    <h1>You are not logged in</h1> 
                }
            </div>
        </div>
    );
}

export default User;
