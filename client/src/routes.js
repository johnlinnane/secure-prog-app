import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home';
import CustomerRegister from './components/customer-register';
import CustomerLogin from './components/customer-login';
import CustomerZone from './components/customer-zone';
import AdminLogin from './components/admin-login';
import AdminZone from './components/admin-zone';
import Logout from './logout';





const Routes = () => {
    return (
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/home" exact component={Home}/>
                <Route path="/register" exact component={CustomerRegister}/>
                <Route path="/customer-login" exact component={CustomerLogin}/>
                <Route path="/customer-zone" exact component={CustomerZone}/>
                <Route path="/admin-zone" exact component={AdminZone}/>
                <Route path="/admin-login" exact component={AdminLogin}/>
                <Route path="/logout" exact component={Logout}/>

            </Switch>
    );
};

export default Routes;