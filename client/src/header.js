import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Header extends Component {


    render() {
        return (
            <header className="header">

                <div className="header_links">
                    <div className="header_link">
                        <Link className="link_tag" to="/">
                            Home    
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link className="link_tag" to="/user">
                            User Profile   
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link className="link_tag" to="/login">
                            User Login    
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link className="link_tag" to="/register">
                            User Register    
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link className="link_tag" to="/admin-login">
                            Admin Login
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link className="link_tag" to="/admin-register">
                            Admin Register
                        </Link>
                    </div>
                </div>
                

                

                


                


               
            </header>
        );
    }
}

export default Header;