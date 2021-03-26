import React from 'react';

import Header from './header'


const Layout = (props) => {
    return (
        <section>
            <Header />
            {props.children}
        </section>
    );
};

export default Layout;