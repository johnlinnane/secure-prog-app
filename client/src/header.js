import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Header extends Component {



    register = () => {
        axios.get("/api/logout")
            // .then((res) => {
            //     console.log(res)
            // });
    };



    render() {
        return (
            <header className="header">

                <div className="header_links">
                    <div className="header_link">
                        <Link className="link_tag" to="/">
                            Shop    
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link className="link_tag" to="/user-zone">
                            User Zone   
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
                        <Link className="link_tag" to="/admin-zone">
                            Admin Zone
                        </Link>
                    </div>

                    <div className="header_link">
                        <Link className="link_tag" to="/admin-login">
                            Admin Login
                        </Link>
                    </div>


                    <div className="header_link logout_btn" onClick={this.register}>
                        {/* <Link className="link_tag" to="/admin-register"> */}
                            Logout
                        {/* </Link> */}
                    </div>
                </div>
                

                

                


                


               
            </header>
        );
    }
}

export default Header;