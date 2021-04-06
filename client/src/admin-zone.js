import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminZone() {

    const [adminData, setAdminData] = useState(null);
    const [loginFail, setLoginFail] = useState(null);

    const getAdmin = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/api/get-admin",
        }).then((res) => {
            setAdminData(res.data);
            console.log('RES.DATA: ',res.data);
            if (!res.data) {
                setLoginFail(true)
            }
            
        });
    };
    useEffect(() => {
        getAdmin();
    }, []);



    return (
        <div className="page_view">
            <div className="centre_text form_container">
                <h1>This is the admin zone</h1>
            </div>
        </div>
    );
}

export default AdminZone;
