import React from 'react';
import { Link } from 'react-router-dom';




function Header() {


    return (
        <header className="header">

            <div className="header_links">
                <div className="header_link">
                    <Link className="link_tag" to="/">
                        Shop    
                    </Link>
                </div>

                <div className="header_link">
                    <Link className="link_tag" to="/customer-zone">
                        Customer Zone   
                    </Link>
                </div>

                {/* <div className="header_link">
                    <Link className="link_tag" to="/customer-login">
                        <strike>Customer Login</strike>
                    </Link>
                </div> */}

                <div className="header_link">
                    <Link className="link_tag" to="/register">
                        Customer Register    
                    </Link>
                </div>

                <div className="header_link">
                    <Link className="link_tag" to="/admin-zone">
                        Admin Zone
                    </Link>
                </div>

                {/* <div className="header_link">
                    <Link className="link_tag" to="/admin-login">
                        Admin Login
                    </Link>
                </div> */}

                <div className="header_link">
                    <Link className="link_tag" to="/logout">
                        Logout
                    </Link>
                </div>


            </div>
            

            

            


            


            
        </header>
    );
}

export default Header;
