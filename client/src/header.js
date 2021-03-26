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
                            User    
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link className="link_tag" to="/register">
                            Register    
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link className="link_tag" to="/login">
                            Login    
                        </Link>
                    </div>
                </div>
                

                

                


                


               
            </header>
        );
    }
}

export default Header;