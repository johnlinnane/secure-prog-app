import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthContainer from './auth_container';
import HomePage from './home_page.js';
import UserPage from './user_page.js';












const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={AuthContainer(HomePage, null)}/>
            <Route path="/UserPage" exact component={AuthContainer(UserPage, null)}/>
            
        </Switch>

    );
};

export default Routes;