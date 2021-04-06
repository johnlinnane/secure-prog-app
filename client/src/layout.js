import React from 'react';

import Header from './header'
import Routes from './routes';

const Layout = (props) => {
    return (
        <section>
            <Header />
            <Routes />
        </section>
    );
};

export default Layout;