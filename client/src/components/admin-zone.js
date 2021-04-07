import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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





    const [customerData, setCustomerData] = useState(null);
    const getCustomerData = async (imageId) => {
        console.log('load images')
        try {
            // const res = await fetch('/api/images');
            const res = await axios({
                url: '/api/get-admin-info',
                method: 'GET',
            });
            // const data = await res.json();
            const data = await res.data;
            console.log('CUSTOMER DATA: ', data)
            setCustomerData(data);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        getCustomerData();
    }, []);



    return (
        <div className="page_view">
            <div className="centre_text form_container">
                {adminData ?
                    <h1>Admin is logged in</h1>
                : null }

                { loginFail ?
                    <Redirect to='/admin-login' />
                : null }

            </div>
        </div>
    );
}

export default AdminZone;
