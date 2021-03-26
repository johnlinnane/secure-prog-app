import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './layout';

import Home from './home';
import Register from './register';
import Login from './login';
import User from './user';
import AdminLogin from './admin-login';
import AdminRegister from './admin-register';












const Routes = () => {
    return (
        <Layout>
            <Switch>
                Hello
                <Route path="/" exact component={Home}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/user" exact component={User}/>
                <Route path="/admin-login" exact component={AdminLogin}/>
                <Route path="/admin-register" exact component={AdminRegister}/>
             
                
            </Switch>
        </Layout>
    );
};

export default Routes;