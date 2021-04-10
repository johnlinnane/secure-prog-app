import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

require('dotenv').config({path: '../../.env'});

function AdminZone() {

    const [adminData, setAdminData] = useState(null);
    const [loginFail, setLoginFail] = useState(null);

    const [custData, setCustData] = useState(null);

    const getAdmin = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `${process.env.REACT_APP_API_BASE_URL}/api/get-admin`,
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




    const getCustomerData = async (imageId) => {
        try {
            // const res = await fetch('/api/images');
            const res = await axios({
                url: `${process.env.REACT_APP_API_BASE_URL}/api/get-admin-info`,
                method: 'GET',
                withCredentials: true
            });
            // const data = await res.json();
            const data = await res.data;
            setCustData(data);
            console.log('CUSTOMER DATA: ', custData)
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        getCustomerData();
    }, []);

    console.log('ALERT: ', alert)

    return (
        <div className="page_view">
            <div className="centre_text form_container">
                {adminData ?
                    <div>
                        <p>Logged in as <b>{adminData.username}</b></p>
                        <h1>Customer Information</h1>
                    </div>
                : null }

                { loginFail ?
                    <Redirect to='/admin-login' />
                : null }

                { custData ?

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">ID</th>
                            </tr>
                        </thead>

                        <tbody>
                            { custData.map( (cust, i) => (
                                <tr key={i}>
                                    <td>{cust.username}</td>
                                    <td>{cust._id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                : null }

            </div>
        </div>
    );
}

export default AdminZone;
