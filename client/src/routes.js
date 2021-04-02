import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './layout';

import Home from './home';
import Register from './register';
import Login from './login';
import UserZone from './user-zone';
import AdminLogin from './admin-login';
import AdminZone from './admin-zone';






const Routes = () => {
    return (
        <Layout>
            <Switch>
                Hello
                <Route path="/" exact component={Home}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/user-zone" exact component={UserZone}/>
                <Route path="/admin-zone" exact component={AdminZone}/>
                <Route path="/admin-login" exact component={AdminLogin}/>

            </Switch>
        </Layout>
    );
};

export default Routes;