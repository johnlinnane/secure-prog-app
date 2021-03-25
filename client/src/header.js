import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Header extends Component {


    render() {
        return (
            <header className="header">

                <div className="header_links">
                    <div className="header_link">
                        <Link to="/">
                            Home    
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link to="/user">
                            User    
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link to="/register">
                            Register    
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link to="/login">
                            Login    
                        </Link>
                    </div>
                </div>
                

                

                


                


               
            </header>
        );
    }
}

export default Header;